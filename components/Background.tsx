import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full pointer-events-none overflow-hidden">
      {/* Base Planet Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 transform scale-105"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1614728853975-66699b8b7137?q=80&w=3000&auto=format&fit=crop")',
          filter: 'sepia(80%) hue-rotate(-30deg) saturate(150%) contrast(110%) brightness(70%)'
        }}
      />
      
      {/* Gradient Overlays for UI contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-60" />

      {/* Dust Particles (Simulated with CSS) */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
         style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
         }}
      ></div>
    </div>
  );
};