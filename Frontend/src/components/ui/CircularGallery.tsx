import React, { useRef, useEffect } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from "ogl";
import "./CircularGallery.css";

interface CircularGalleryProps {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({
  items = [],
  bend = 3,
  borderRadius = 0.05,
  scrollSpeed = 1,
  scrollEase = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true, antialias: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 35 });
    camera.position.z = 5;

    const scene = new Transform();

    const planeGeometry = new Plane(gl, {
      width: 1,
      height: 1.5,
      widthSegments: 20,
      heightSegments: 20,
    });

    const vertex = `
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uBend;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin(pos.x * 3.1415 + 1.57) * uBend;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragment = `
      precision highp float;
      uniform sampler2D tMap;
      uniform float uBorderRadius;
      varying vec2 vUv;
      void main() {
        vec2 uv = vUv;
        // Simple corner rounding
        float r = uBorderRadius;
        vec2 d = min(uv, 1.0 - uv);
        if (d.x < r && d.y < r) {
            if (length(r - d) > r) discard;
        }
        gl_FragColor = texture2D(tMap, vUv);
      }
    `;

    const meshes: Mesh[] = [];

    items.forEach((item) => {
      const texture = new Texture(gl, { generateMipmaps: false });
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = item.image;
      img.onload = () => (texture.image = img);

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          tMap: { value: texture },
          uBend: { value: bend },
          uBorderRadius: { value: borderRadius },
        },
        transparent: true,
      });

      const mesh = new Mesh(gl, { geometry: planeGeometry, program });
      mesh.setParent(scene);
      meshes.push(mesh);
    });

    let currentScroll = 0;
    let targetScroll = 0;

    const updateLayout = () => {
      const radius = 2.5;
      meshes.forEach((mesh, i) => {
        const theta = ((i / items.length) * Math.PI * 2) + currentScroll;
        mesh.position.x = Math.sin(theta) * radius;
        mesh.position.z = Math.cos(theta) * radius;
        mesh.rotation.y = theta;
      });
    };

    const handleWheel = (e: WheelEvent) => {
      targetScroll += e.deltaY * 0.001 * scrollSpeed;
    };

    let isDragging = false;
    let startX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      targetScroll -= dx * 0.005 * scrollSpeed;
      startX = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("wheel", handleWheel);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    const resize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize);
    resize();

    let requestIdx: number;
    const update = () => {
      currentScroll += (targetScroll - currentScroll) * scrollEase;
      updateLayout();
      renderer.render({ scene, camera });
      requestIdx = requestAnimationFrame(update);
    };
    requestIdx = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(requestIdx);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [items, bend, borderRadius, scrollSpeed, scrollEase]);

  return <div ref={containerRef} className="circular-gallery" />;
};

export default CircularGallery;
