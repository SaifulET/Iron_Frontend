"use client";

import React, { useEffect, useState } from "react";

interface EdgeSoftOrbsTopProps {
  size?: number;
  duration?: number;
  intensity?: number;
  zIndex?: number;
  blend?: React.CSSProperties["mixBlendMode"];
}

export default function EdgeSoftOrbsTop({
  size = 600,
  duration = 56,
  intensity = 0.45,
  zIndex = 1,
  blend = "screen",
}: EdgeSoftOrbsTopProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const half = size / 2;

  const styleA = {
    "--orb-size": `${size}px`,
    "--orb-half": `${half}px`,
    "--orb-duration": `${duration}s`,
    "--orb-opacity": intensity,
    mixBlendMode: blend,
  } as React.CSSProperties;

  const styleB = {
    "--orb-size": `${size}px`,
    "--orb-half": `${half}px`,
    "--orb-duration": `${duration}s`,
    "--orb-opacity": intensity,
    mixBlendMode: blend,
  } as React.CSSProperties;

  return (
    <div
      className="absolute inset-x-0 top-0 h-screen pointer-events-none overflow-visible"
      style={{ zIndex }}
      aria-hidden="true"
    >
      {/* Orb A */}
      <div className="edge-orb edge-orb-soft" style={styleA} />
      {/* Orb B (opposite phase) */}
      <div className="edge-orb edge-orb-soft edge-orb-b" style={styleB} />
    </div>
  );
}
