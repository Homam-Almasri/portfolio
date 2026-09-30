/* The frame loop writes into memoised buffers and uniforms every frame; that is how
   three.js is driven without re-rendering React, so the React Compiler's rule does not apply here. */
/* eslint-disable react-hooks/immutability */
import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import { journey, STATIONS } from "../lib/journey";

/* ───────────────────────── the route ───────────────────────── */

const ROUTE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, 8),
    new THREE.Vector3(1.5, 0.2, -6),
    new THREE.Vector3(7, -1.2, -20),
    new THREE.Vector3(-4, 2.2, -36),
    new THREE.Vector3(5, -2, -52),
    new THREE.Vector3(-6, 1.2, -68),
    new THREE.Vector3(4, -0.6, -84),
    new THREE.Vector3(0, 0.4, -100),
    new THREE.Vector3(-1, 0.2, -110),
  ],
  false,
  "catmullrom",
  0.35,
);

const UP = new THREE.Vector3(0, 1, 0);
const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();

/** A point beside the route: `side` > 0 is to the traveller's right. */
function besideRoute(t: number, side: number, lift = 0, out = new THREE.Vector3()) {
  const p = ROUTE.getPointAt(THREE.MathUtils.clamp(t, 0, 1));
  const tan = ROUTE.getTangentAt(THREE.MathUtils.clamp(t, 0, 1));
  const right = tmpA.crossVectors(tan, UP).normalize();
  return out.copy(p).addScaledVector(right, side).addScaledVector(UP, lift);
}

/** Where each station's node sits: a little ahead of the camera and to the right. */
const STATION_AHEAD = 0.032;
/** hero and about keep their node close; the sections whose content fills the screen push it back and aside */
const STATION_SIDE = [2.5, 2.7, 3.5, 5.2, 5.2, 4.2];
const STATION_DEPTH = [0, 0, 0.022, 0.018, 0.018, 0.01];
function stationPoint(i: number, wide: boolean) {
  const t = STATIONS[i].t + STATION_AHEAD + (wide ? STATION_DEPTH[i] : 0.01);
  return besideRoute(t, wide ? STATION_SIDE[i] : 0.9, wide ? 0.4 : 1.6);
}

/* ───────────────────────── the camera ───────────────────────── */

function Rig({ wide }: { wide: boolean }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3());
  const t = useRef(0);
  const pointer = useRef(new THREE.Vector2());

  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.001, dt);
    t.current += (journey.t - t.current) * Math.min(1, k * 2.2);
    pointer.current.x += (journey.pointerX - pointer.current.x) * k;
    pointer.current.y += (journey.pointerY - pointer.current.y) * k;

    const ct = Math.min(t.current, 0.985);
    const pos = ROUTE.getPointAt(ct);
    camera.position.set(
      pos.x + pointer.current.x * 0.35,
      pos.y + 0.95 - pointer.current.y * 0.25,
      pos.z,
    );
    const ahead = ROUTE.getPointAt(Math.min(ct + 0.03, 1));
    tmpB.copy(ahead);
    if (wide) tmpB.addScaledVector(tmpA.crossVectors(ROUTE.getTangentAt(ct), UP).normalize(), 0.9);
    look.current.lerp(tmpB, Math.min(1, k * 3));
    camera.lookAt(look.current);
  });
  return null;
}

/* ───────────────────────── the route line ───────────────────────── */

const routeVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const routeFrag = /* glsl */ `
  uniform float uTime;
  uniform float uHead;
  uniform vec3 uColor;
  uniform vec3 uDone;
  varying vec2 vUv;
  void main() {
    float x = vUv.x;
    float f = fract(x * 140.0 - uTime * 0.9);
    float dash = smoothstep(0.0, 0.08, f) * (1.0 - smoothstep(0.12, 0.3, f));
    float travelled = 1.0 - smoothstep(uHead - 0.002, uHead + 0.002, x);
    float head = exp(-abs(x - uHead) * 90.0);
    vec3 col = mix(uColor * 0.45, uDone * 0.7, travelled) * (0.35 + dash * 1.4) + uColor * head * 1.2;
    float a = (0.2 + dash * 0.7) * (0.5 + travelled * 0.5) + head * 0.6;
    gl_FragColor = vec4(col, a);
  }
`;

function RouteLine({ calm }: { calm: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const geometry = useMemo(() => new THREE.TubeGeometry(ROUTE, 900, 0.012, 6, false), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHead: { value: 0 },
      uColor: { value: new THREE.Color("#4de2ff") },
      uDone: { value: new THREE.Color("#3dffa2") },
    }),
    [],
  );
  useFrame((_, dt) => {
    if (!calm) uniforms.uTime.value += dt;
    uniforms.uHead.value += (Math.min(journey.t + STATION_AHEAD * 0.4, 1) - uniforms.uHead.value) * 0.08;
  });
  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={routeVert}
        fragmentShader={routeFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ───────────────────────── the network around it ───────────────────────── */

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const PALETTE = ["#4de2ff", "#8b7bff", "#3dffa2", "#ffb547", "#ff5fa2"].map((c) => new THREE.Color(c));

function Network({ count, packets, calm }: { count: number; packets: number; calm: boolean }) {
  const { nodes, edges, colors } = useMemo(() => {
    const r = rand(7);
    const nodes: THREE.Vector3[] = [];
    const colors: THREE.Color[] = [];
    for (let i = 0; i < count; i++) {
      const t = r();
      const side = (r() < 0.5 ? -1 : 1) * (3 + r() * 13);
      const lift = (r() - 0.5) * 16;
      nodes.push(besideRoute(t, side, lift));
      colors.push(PALETTE[Math.floor(r() * PALETTE.length)]);
    }
    const edges: [number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < count; i++) {
      const near = nodes
        .map((n, j) => [j, n.distanceToSquared(nodes[i])] as const)
        .filter(([j]) => j !== i)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 2);
      for (const [j, d] of near) {
        if (d > 110) continue;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push([i, j]);
      }
    }
    return { nodes, edges, colors };
  }, [count]);

  const inst = useRef<THREE.InstancedMesh>(null!);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    nodes.forEach((n, i) => {
      const s = 0.03 + ((i * 37) % 10) * 0.007;
      m.makeScale(s, s, s).setPosition(n);
      inst.current.setMatrixAt(i, m);
      inst.current.setColorAt(i, colors[i].clone().multiplyScalar(1.6));
    });
    inst.current.instanceMatrix.needsUpdate = true;
    if (inst.current.instanceColor) inst.current.instanceColor.needsUpdate = true;
  }, [nodes, colors]);

  const lineGeo = useMemo(() => {
    const pos = new Float32Array(edges.length * 6);
    const col = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
      nodes[a].toArray(pos, k * 6);
      nodes[b].toArray(pos, k * 6 + 3);
      colors[a].toArray(col, k * 6);
      colors[b].toArray(col, k * 6 + 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [edges, nodes, colors]);

  /* packets: requests flowing along the edges */
  const pk = useMemo(() => {
    const r = rand(99);
    const edge = new Uint16Array(packets);
    const phase = new Float32Array(packets);
    const speed = new Float32Array(packets);
    const pos = new Float32Array(packets * 3);
    const col = new Float32Array(packets * 3);
    for (let i = 0; i < packets; i++) {
      edge[i] = Math.floor(r() * edges.length);
      phase[i] = r();
      speed[i] = 0.15 + r() * 0.45;
      colors[edges[edge[i]][0]].toArray(col, i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return { edge, phase, speed, pos, g, r };
  }, [packets, edges, colors]);

  const lineMat = useRef<THREE.LineBasicMaterial>(null!);
  useFrame((_, dt) => {
    const d = calm ? 0 : dt;
    for (let i = 0; i < packets; i++) {
      pk.phase[i] += d * pk.speed[i];
      if (pk.phase[i] > 1) {
        pk.phase[i] = 0;
        pk.edge[i] = Math.floor(pk.r() * edges.length);
      }
      const [a, b] = edges[pk.edge[i]];
      tmpA.lerpVectors(nodes[a], nodes[b], pk.phase[i]).toArray(pk.pos, i * 3);
    }
    (pk.g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    // the whole network lights up while the reader is at the stack
    const target = journey.station === 4 ? 0.34 : 0.14;
    lineMat.current.opacity += (target - lineMat.current.opacity) * 0.05;
  });

  return (
    <group>
      <instancedMesh ref={inst} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          ref={lineMat}
          vertexColors
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points geometry={pk.g}>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          map={glowTexture()}
          alphaTest={0.01}
        />
      </points>
    </group>
  );
}

let _glow: THREE.Texture | null = null;
function glowTexture() {
  if (_glow) return _glow;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,255,255,0.6)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  _glow = new THREE.CanvasTexture(c);
  return _glow;
}

/* ───────────────────────── the stations ───────────────────────── */

/* Each station is a small crafted object: refractive glass, brushed dark metal, and a light
   that burns inside it. The environment below gives the glass and metal something to reflect. */

type Mats = { glass: THREE.Material; metal: THREE.Material; glow: THREE.ShaderMaterial; seam: THREE.MeshBasicMaterial };

/** A light you can look into: white-hot where it faces you, its own colour at the rim. */
const coreVert = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const coreFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float facing = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);
    float rim = pow(1.0 - facing, 1.6);
    vec3 hot = mix(vec3(1.0), uColor, 0.35);
    vec3 col = mix(hot * (1.2 + uPower * 0.6), uColor * (1.4 + uPower), rim);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function useStationMaterials(color: THREE.Color, lite: boolean): Mats {
  return useMemo(() => {
    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff").lerp(color, 0.12),
      metalness: 0,
      roughness: 0.2,
      transmission: lite ? 0 : 1,
      thickness: 0.55,
      ior: 1.45,
      attenuationColor: color,
      attenuationDistance: 2.4,
      iridescence: 0.5,
      iridescenceIOR: 1.3,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.4,
      transparent: lite,
      opacity: lite ? 0.28 : 1,
      specularIntensity: 1,
    });
    const metal = new THREE.MeshPhysicalMaterial({
      color: "#56627c",
      metalness: 0.92,
      roughness: 0.32,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.8,
    });
    const glow = new THREE.ShaderMaterial({
      vertexShader: coreVert,
      fragmentShader: coreFrag,
      uniforms: { uColor: { value: color.clone() }, uPower: { value: 0 } },
      toneMapped: false,
    });
    const seam = new THREE.MeshBasicMaterial({ color: color.clone(), toneMapped: false, transparent: true, opacity: 0.9 });
    return { glass, metal, glow, seam };
  }, [color, lite]);
}

/** 0 · the server: a cut-glass shell with a white-hot core */
function ServerCore({ m }: { m: Mats }) {
  return (
    <>
      <mesh material={m.glass}>
        <icosahedronGeometry args={[0.72, 1]} />
      </mesh>
      <mesh material={m.glow}>
        <icosahedronGeometry args={[0.14, 4]} />
      </mesh>
      <lineSegments scale={1.003}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(0.72, 1)]} />
        <lineBasicMaterial color={m.seam.color} transparent opacity={0.18} toneMapped={false} />
      </lineSegments>
    </>
  );
}

/** 1 · the person: a tall crystal with a light held inside it */
function Crystal({ m }: { m: Mats }) {
  return (
    <group scale={[0.8, 1.25, 0.8]}>
      <mesh material={m.glass}>
        <octahedronGeometry args={[0.72, 0]} />
      </mesh>
      <mesh material={m.glow} scale={0.3}>
        <octahedronGeometry args={[0.72, 0]} />
      </mesh>
    </group>
  );
}

/** 2 · the log: bevelled metal slabs, each seam lit */
function LogStack({ m }: { m: Mats }) {
  const slabs = [-0.39, -0.13, 0.13, 0.39];
  return (
    <>
      {slabs.map((y, i) => (
        <group key={y} position={[0, y, 0]} rotation={[0, i * 0.12, 0]}>
          <RoundedBox args={[1.15, 0.2, 0.72]} radius={0.06} smoothness={5} material={m.metal} />
          <mesh material={m.seam} position={[0, 0.101, 0]}>
            <boxGeometry args={[1.02, 0.008, 0.6]} />
          </mesh>
          <mesh material={m.glow} position={[0.44, 0, 0.365]}>
            <sphereGeometry args={[0.022, 12, 12]} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/** 3 · the work: the database, three platters with lit rims */
function Database({ m }: { m: Mats }) {
  return (
    <>
      {[-0.36, 0, 0.36].map((y) => (
        <group key={y} position={[0, y, 0]}>
          <mesh material={m.metal}>
            <cylinderGeometry args={[0.56, 0.56, 0.28, 96, 1]} />
          </mesh>
          <mesh material={m.seam} position={[0, 0.141, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.53, 0.01, 12, 128]} />
          </mesh>
          <mesh material={m.glass} position={[0, 0.142, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.5, 96]} />
          </mesh>
        </group>
      ))}
      <mesh material={m.glow} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.05, 24]} />
      </mesh>
    </>
  );
}

/** 4 · the stack: services in orbit around a glass hub, wired to it */
function Services({ m, calm }: { m: Mats; calm: boolean }) {
  const orbit = useRef<THREE.Group>(null!);
  const wires = useRef<THREE.LineSegments>(null!);
  const cubes = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2;
        const r = 0.95 + (i % 2) * 0.22;
        return new THREE.Vector3(Math.cos(a) * r, Math.sin(a * 2) * 0.28, Math.sin(a) * r);
      }),
    [],
  );
  const wireGeo = useMemo(() => {
    const pos = new Float32Array(cubes.length * 6);
    cubes.forEach((c, i) => c.toArray(pos, i * 6 + 3));
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [cubes]);
  useFrame(({ clock }) => {
    if (!calm) orbit.current.rotation.y = clock.elapsedTime * 0.3;
  });
  return (
    <>
      <mesh material={m.glass}>
        <sphereGeometry args={[0.42, 64, 64]} />
      </mesh>
      <mesh material={m.glow}>
        <sphereGeometry args={[0.14, 32, 32]} />
      </mesh>
      <group ref={orbit}>
        <lineSegments ref={wires} geometry={wireGeo}>
          <lineBasicMaterial color={m.seam.color} transparent opacity={0.45} toneMapped={false} />
        </lineSegments>
        {cubes.map((c, i) => (
          <group key={i} position={c} rotation={[i, i * 0.7, 0]}>
            <RoundedBox args={[0.24, 0.24, 0.24]} radius={0.045} smoothness={4} material={m.metal} />
            <mesh material={m.seam} scale={1.02}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

/** 5 · the response: a glass ring closing around the light, the loop complete */
function Response({ m }: { m: Mats }) {
  return (
    <>
      <mesh material={m.glass}>
        <torusGeometry args={[0.56, 0.2, 64, 160]} />
      </mesh>
      <mesh material={m.glow}>
        <sphereGeometry args={[0.18, 48, 48]} />
      </mesh>
      <mesh material={m.seam} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.56, 0.006, 12, 160]} />
      </mesh>
    </>
  );
}

function OrbitRing({ radius, color, tilt, speed, calm }: { radius: number; color: THREE.Color; tilt: [number, number, number]; speed: number; calm: boolean }) {
  const spin = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!calm) spin.current.rotation.z = clock.elapsedTime * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[radius, 0.004, 8, 256]} />
          <meshBasicMaterial color={color} transparent opacity={0.45} toneMapped={false} />
        </mesh>
        {[0, 2.1, 4.2].map((a) => (
          <mesh key={a} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Station({ index, wide, calm, lite }: { index: number; wide: boolean; calm: boolean; lite: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const model = useRef<THREE.Group>(null!);
  const color = useMemo(() => new THREE.Color(STATIONS[index].color), [index]);
  const position = useMemo(() => stationPoint(index, wide), [index, wide]);
  const m = useStationMaterials(color, lite);
  const glowCol = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }, dt) => {
    const active = journey.station === index;
    const tt = calm ? 0 : clock.elapsedTime;
    const target = active ? 1 + 0.12 * journey.dwell : 0.8;
    const s = THREE.MathUtils.lerp(group.current.scale.x, target, 1 - Math.pow(0.02, dt));
    group.current.scale.setScalar(s);
    model.current.rotation.y = tt * 0.3 + index;
    model.current.rotation.x = Math.sin(tt * 0.25 + index) * 0.18;
    model.current.position.y = Math.sin(tt * 0.8 + index) * 0.06;
    // the inner light brightens as the reader arrives
    const k = active ? 1.1 + journey.dwell * 0.9 : 0.6;
    glowCol.copy(color).multiplyScalar(k);
    m.seam.color.lerp(glowCol, 0.08);
    const p = m.glow.uniforms.uPower;
    p.value += ((active ? journey.dwell : 0) - p.value) * 0.08;
  });

  return (
    <group ref={group} position={position}>
      <group ref={model}>
        {index === 0 && <ServerCore m={m} />}
        {index === 1 && <Crystal m={m} />}
        {index === 2 && <LogStack m={m} />}
        {index === 3 && <Database m={m} />}
        {index === 4 && <Services m={m} calm={calm} />}
        {index === 5 && <Response m={m} />}
      </group>
      <OrbitRing radius={1.35} color={color} tilt={[Math.PI / 2.3, 0.2, 0]} speed={0.22} calm={calm} />
      <OrbitRing radius={1.7} color={color} tilt={[Math.PI / 1.8, -0.5, 0.3]} speed={-0.14} calm={calm} />
      <pointLight color={color} intensity={8} distance={6} decay={2} />
    </group>
  );
}

/* ───────────────────────── the reader's request ───────────────────────── */

function Packet({ calm }: { calm: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  const t = useRef(0);
  useFrame(({ clock }) => {
    t.current += (journey.t - t.current) * 0.1;
    const bob = calm ? 0 : Math.sin(clock.elapsedTime * 2.2) * 0.05;
    besideRoute(Math.min(t.current + 0.024, 1), 0, 0.05 + bob, ref.current.position);
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <sprite scale={0.18}>
        <spriteMaterial map={glowTexture()} color="#4de2ff" transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>
    </group>
  );
}

/* ───────────────────────── dust ───────────────────────── */

function Dust({ count }: { count: number }) {
  const geo = useMemo(() => {
    const r = rand(3);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      besideRoute(r() * 1.05 - 0.02, (r() - 0.5) * 50, (r() - 0.5) * 34).toArray(pos, i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.045} color="#6f8bb8" transparent opacity={0.55} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/* ───────────────────────── the stage ───────────────────────── */

export default function World({ calm }: { calm: boolean }) {
  const wide = typeof window !== "undefined" && window.innerWidth >= 900;
  const small = typeof window !== "undefined" && (window.innerWidth < 700 || matchMedia("(pointer: coarse)").matches);

  return (
    <div className="world" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.4, 8], fov: small ? 62 : 52, near: 0.1, far: 140 }}
        dpr={[1, small ? 1.5 : 2]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#04060b"]} />
        <fogExp2 attach="fog" args={["#04060b", 0.034]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[4, 6, 5]} intensity={0.8} color="#cfe0ff" />
        {/* a studio made of light, rendered once: what the glass refracts and the metal reflects */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 5, -3]} scale={[10, 1.2, 1]} rotation-x={Math.PI / 2} />
          <Lightformer form="rect" intensity={1.6} color="#dff6ff" position={[-6, 1, 1]} scale={[1.2, 8, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={1.2} color="#d9d3ff" position={[6, 0, 0]} scale={[1.2, 8, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer form="ring" intensity={1.4} color="#ffffff" position={[0, 1, 6]} scale={2.5} />
          <Lightformer form="rect" intensity={0.5} color="#4de2ff" position={[0, -5, 0]} scale={[8, 8, 1]} rotation-x={-Math.PI / 2} />
        </Environment>
        <Rig wide={wide} />
        <RouteLine calm={calm} />
        <Network count={small ? 140 : 240} packets={small ? 90 : 200} calm={calm} />
        {STATIONS.map((_, i) => (
          <Station key={i} index={i} wide={wide} calm={calm} lite={small} />
        ))}
        <Packet calm={calm} />
        <Dust count={small ? 700 : 1600} />
        <EffectComposer multisampling={small ? 0 : 4}>
          {small ? <SMAA /> : <></>}
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.55} luminanceSmoothing={0.3} radius={0.7} />
          <Noise opacity={0.035} premultiply />
          <Vignette offset={0.25} darkness={0.75} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
