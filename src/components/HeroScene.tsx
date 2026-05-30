'use client'
import * as THREE from 'three'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Lightformer, useGLTF } from '@react-three/drei'

type HeroSceneProps = {
  open: boolean
  onToggle: () => void
}

const MODEL_URL = '/mac-draco.glb'

// Apertura del coperchio: chiuso ~1.575 rad (schermo abbassato), aperto ~-0.425.
const HINGE_CLOSED = 1.575
const HINGE_OPEN = -0.425

// Finto codice JavaScript mostrato sullo schermo. Ogni riga è un elenco di
// "token": [testo, colore]. I colori richiamano un tema scuro tipo VS Code.
const C = {
  bg: '#0d1117',
  bar: '#161b22',
  line: '#6e7681',
  text: '#c9d1d9',
  kw: '#ff7b72', // parole chiave (const, function, return...)
  fn: '#d2a8ff', // nomi di funzione
  str: '#a5d6ff', // stringhe
  num: '#79c0ff', // numeri
  prop: '#7ee787', // proprietà / chiavi
  com: '#8b949e', // commenti
}

type Tok = [string, string]
const CODE: Tok[][] = [
  [['const', C.kw], [' skills', C.text], [' = ', C.text], ['[', C.text], ["'React'", C.str], [', ', C.text], ["'Next.js'", C.str], [', ', C.text], ["'Three.js'", C.str], [']', C.text]],
  [],
  [['function', C.kw], [' ', C.text], ['createPortfolio', C.fn], ['(', C.text], ['name', C.text], [') {', C.text]],
  [['  const', C.kw], [' dev', C.text], [' = ', C.text], ['new', C.kw], [' ', C.text], ['Developer', C.fn], ['(', C.text], ['name', C.text], [')', C.text]],
  [['  return', C.kw], [' dev', C.text], ['.', C.text], ['build', C.fn], ['({', C.text]],
  [['    creative', C.prop], [': ', C.text], ['true', C.num], [',', C.text]],
  [['    passion', C.prop], [': ', C.text], ['100', C.num], [',', C.text]],
  [['  })', C.text]],
  [['}', C.text]],
  [],
  [['const', C.kw], [' nicola', C.text], [' = ', C.text], ['createPortfolio', C.fn], ['(', C.text], ["'Nicola'", C.str], [')', C.text]],
  [['nicola', C.text], ['.', C.text], ['deploy', C.fn], ['()', C.text], [' // ship it ', C.com]],
]

function makeCodeTexture(): THREE.CanvasTexture {
  const w = 1280
  const h = 640
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  // Sfondo editor
  ctx.fillStyle = C.bg
  ctx.fillRect(0, 0, w, h)

  // Barra del titolo con i "semafori" e il nome file
  ctx.fillStyle = C.bar
  ctx.fillRect(0, 0, w, 56)
  const dots: Array<[string, number]> = [['#ff5f56', 28], ['#ffbd2e', 56], ['#27c93f', 84]]
  for (const [col, x] of dots) {
    ctx.beginPath()
    ctx.fillStyle = col
    ctx.arc(x, 28, 8, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.fillStyle = C.com
  ctx.font = '22px Menlo, Consolas, monospace'
  ctx.textBaseline = 'middle'
  ctx.fillText('portfolio.js', 140, 29)

  // Righe di codice
  const fontSize = 26
  ctx.font = `${fontSize}px Menlo, Consolas, monospace`
  ctx.textBaseline = 'alphabetic'
  const charW = ctx.measureText('M').width
  const startX = 96
  const lineH = 42
  let y = 56 + lineH

  CODE.forEach((tokens, i) => {
    // numero di riga
    ctx.fillStyle = C.line
    ctx.fillText(String(i + 1).padStart(2, ' '), 28, y)
    // token colorati
    let x = startX
    for (const [txt, color] of tokens) {
      ctx.fillStyle = color
      ctx.fillText(txt, x, y)
      x += txt.length * charW
    }
    y += lineH
  })

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  // Le UV dello schermo sono ribaltate sull'asse verticale: senza correzione il
  // testo apparirebbe capovolto, quindi disattiviamo flipY.
  tex.flipY = false
  return tex
}

function Laptop({ open }: { open: boolean }) {
  const group = useRef<THREE.Group>(null)
  const lid = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Texture del codice generata una sola volta.
  const codeTexture = useMemo(() => makeCodeTexture(), [])

  // Il modello è stato generato con gltfjsx; qui ne ricostruiamo i nodi.
  const { nodes, materials } = useGLTF(MODEL_URL, true) as unknown as {
    nodes: Record<string, THREE.Mesh>
    materials: Record<string, THREE.Material>
  }

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const g = group.current
    const l = lid.current
    if (!g || !l) return

    // Coperchio: si apre/chiude con interpolazione morbida.
    const hinge = open ? HINGE_OPEN : HINGE_CLOSED
    l.rotation.x = THREE.MathUtils.lerp(l.rotation.x, hinge, 0.1)

    // Da aperto galleggia dolcemente "sul posto" restando sempre inquadrato;
    // da chiuso resta poggiato e fermo.
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, open ? Math.cos(t / 10) / 12 + 0.12 : 0, 0.1)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, open ? Math.sin(t / 10) / 6 : 0, 0.1)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, open ? Math.sin(t / 10) / 14 : 0, 0.1)
    g.position.y = THREE.MathUtils.lerp(
      g.position.y,
      open ? -3.4 + Math.sin(t) * 0.35 : -4.3,
      0.1,
    )
  })

  return (
    <group
      ref={group}
      dispose={null}
      scale={1.05}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* COPERCHIO (schermo) con cerniera */}
      <group ref={lid} position={[0.002, -0.038, 0.414]} rotation={[0.014, 0, 0]}>
        <group position={[0, 2.965, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Cube008.geometry} material={materials.aluminium} />
          <mesh geometry={nodes.Cube008_1.geometry} material={materials['matte.001']} />
          {/* Schermo: mostra il finto codice JS come un display acceso */}
          <mesh geometry={nodes.Cube008_2.geometry}>
            <meshBasicMaterial map={codeTexture} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* TASTIERA */}
      <mesh geometry={nodes.keyboard.geometry} material={materials.keys} position={[1.793, 0, 3.451]} />

      {/* SCOCCA INFERIORE + TRACKPAD */}
      <group position={[0, -0.1, 3.394]}>
        <mesh geometry={nodes.Cube002.geometry} material={materials.aluminium} />
        <mesh geometry={nodes.Cube002_1.geometry} material={materials.trackpad} />
      </group>

      {/* TOUCH BAR */}
      <mesh geometry={nodes.touchbar.geometry} material={materials.touchbar} position={[0, -0.027, 1.201]} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)

export default function HeroScene({ open, onToggle }: HeroSceneProps) {
  // Forza una nuova misura del canvas dopo il montaggio (evita il canvas a 300x150).
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event('resize')), 60)
    return () => clearTimeout(id)
  }, [])

  return (
    <div 
    style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'auto',
      cursor: 'pointer' 
    }} 
    onClick={(e) => {
      e.stopPropagation()
      onToggle()
    }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -30], fov: 35 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <group
            rotation={[0, Math.PI, 0]}     
          >
            <Laptop open={open} />
          </group>
          {/* Ambiente "studio" autonomo: riflessi sull'alluminio senza HDR esterni */}
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={2} position={[0, 4, -6]} scale={[12, 8, 1]} color="#ffffff" />
            <Lightformer form="rect" intensity={3} position={[0, 5, 2]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 6, 1]} color="#ffffff" />
            <Lightformer form="rect" intensity={2.5} position={[-6, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[8, 6, 1]} color="#eaf2ff" />
          </Environment>
        </Suspense>
        <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} opacity={0.4} />
      </Canvas>

      {/* Suggerimento "click" come overlay HTML sopra il canvas */}
      {!open && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '52px',
              fontWeight: 400,
              letterSpacing: '-0.045em',
              color: '#004d4d',
              opacity: 0.55,
              userSelect: 'none',
            }}
          >
            Click Laptop
          </span>
        </div>
      )}
    </div>
  )
}
