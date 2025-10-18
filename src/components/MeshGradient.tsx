'use client'
import { useEffect } from "react";
import { Gradient } from "@/app/Gradient"; // adjust path as needed

export default function MeshBackground() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      data-transition-in
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
}