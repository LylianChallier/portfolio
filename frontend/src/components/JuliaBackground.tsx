import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const mandelbrotFragmentShader = `
  uniform float scrollY;
  uniform vec2 resolution;

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);

    // Zoom and center on the Mandelbrot set
    // Position the main circle to be cut in half by the right edge of the screen
    float baseZoom = 2.2;
    float zoom = baseZoom / (1.0 + scrollY * 2.0);

    // Calculate offset to push the center to the right edge of the screen
    // Negative x value in UV space = right side of screen
    float aspectRatio = resolution.x / resolution.y;
    vec2 center = vec2(-0.5 - aspectRatio * 0.7, 0.0);

    // Pan slightly based on scroll
    center.x -= scrollY * 0.3;

    vec2 c = uv * zoom + center;
    vec2 z = vec2(0.0);

    float iter = 0.0;
    const float maxIter = 256.0;

    for(float i = 0.0; i < maxIter; i++) {
      // z = z^2 + c (Mandelbrot formula)
      z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;

      if(dot(z, z) > 4.0) {
        iter = i;
        break;
      }
      iter = i;
    }

    // Smooth coloring for gradient bands
    float smoothIter = iter;
    if(iter < maxIter - 1.0) {
      float log_zn = log(dot(z, z)) / 2.0;
      float nu = log(log_zn / log(2.0)) / log(2.0);
      smoothIter = iter + 1.0 - nu;
    }

    // Classic Mandelbrot coloring with bands
    vec3 color;
    if(iter >= maxIter - 1.0) {
      // Inside the set - black
      color = vec3(0.0, 0.0, 0.0);
    } else {
      // Classic color cycling like the reference image
      float t = smoothIter / 32.0; // Cycle through colors

      // Color palette: dark blue -> blue -> cyan -> yellow -> orange -> red -> magenta -> back
      vec3 col1 = vec3(0.0, 0.0, 0.2);    // Dark blue
      vec3 col2 = vec3(0.0, 0.2, 0.5);    // Blue
      vec3 col3 = vec3(0.0, 0.5, 0.8);    // Cyan-blue
      vec3 col4 = vec3(0.2, 0.8, 1.0);    // Cyan
      vec3 col5 = vec3(1.0, 1.0, 0.4);    // Yellow
      vec3 col6 = vec3(1.0, 0.6, 0.0);    // Orange
      vec3 col7 = vec3(0.8, 0.2, 0.0);    // Red-orange
      vec3 col8 = vec3(0.5, 0.0, 0.3);    // Magenta-dark

      float phase = fract(t);
      int segment = int(mod(t, 8.0));

      if(segment == 0) color = mix(col1, col2, phase);
      else if(segment == 1) color = mix(col2, col3, phase);
      else if(segment == 2) color = mix(col3, col4, phase);
      else if(segment == 3) color = mix(col4, col5, phase);
      else if(segment == 4) color = mix(col5, col6, phase);
      else if(segment == 5) color = mix(col6, col7, phase);
      else if(segment == 6) color = mix(col7, col8, phase);
      else color = mix(col8, col1, phase);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

function JuliaPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const [scrollY, setScrollY] = useState(0);

  const uniforms = useRef({
    scrollY: { value: 0 },
    resolution: { value: new THREE.Vector2(size.width, size.height) }
  });

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const normalized = window.scrollY / maxScroll;
      setScrollY(normalized);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    uniforms.current.resolution.value.set(size.width, size.height);
  }, [size]);

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.scrollY.value = scrollY;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={mandelbrotFragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}

export default function JuliaBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ background: '#0a0a1a' }}
        gl={{ antialias: true, alpha: false }}
      >
        <JuliaPlane />
      </Canvas>
    </div>
  );
}
