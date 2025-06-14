import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingImages = () => {
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const img4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle floating animations for background elements
    if (img1Ref.current) {
      gsap.to(img1Ref.current, {
        y: -15,
        x: 8,
        rotation: 3,
        duration: 6,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    if (img2Ref.current) {
      gsap.to(img2Ref.current, {
        y: 12,
        x: -6,
        rotation: -2,
        duration: 7,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5
      });
    }

    if (img3Ref.current) {
      gsap.to(img3Ref.current, {
        y: -8,
        x: 10,
        rotation: 1,
        duration: 8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3
      });
    }

    if (img4Ref.current) {
      gsap.to(img4Ref.current, {
        y: 14,
        x: -4,
        rotation: -3,
        duration: 5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.8
      });
    }
  }, []);

  return (
    <>
      {/* Subtle floating geometric elements */}
      <div
        ref={img1Ref}
        className="absolute top-24 left-16 w-20 h-20 rounded-2xl opacity-10 bg-gradient-to-br from-blue-400 to-indigo-600 blur-sm"
        style={{ 
          transform: 'perspective(500px) rotateX(15deg)',
          boxShadow: '0 8px 20px rgba(59, 130, 246, 0.2)'
        }}
      />
      
      <div
        ref={img2Ref}
        className="absolute top-48 right-24 w-16 h-16 rounded-xl opacity-12 bg-gradient-to-br from-emerald-400 to-teal-600 blur-sm"
        style={{ 
          transform: 'perspective(500px) rotateY(20deg)',
          boxShadow: '0 6px 16px rgba(16, 185, 129, 0.2)'
        }}
      />
      
      <div
        ref={img3Ref}
        className="absolute bottom-40 left-24 w-18 h-18 rounded-2xl opacity-8 bg-gradient-to-br from-purple-400 to-pink-600 blur-sm"
        style={{ 
          transform: 'perspective(500px) rotateX(-10deg)',
          boxShadow: '0 8px 20px rgba(147, 51, 234, 0.2)'
        }}
      />
      
      <div
        ref={img4Ref}
        className="absolute bottom-24 right-32 w-14 h-14 rounded-xl opacity-15 bg-gradient-to-br from-orange-400 to-red-500 blur-sm"
        style={{ 
          transform: 'perspective(500px) rotateY(-15deg)',
          boxShadow: '0 6px 16px rgba(251, 146, 60, 0.2)'
        }}
      />

      {/* Minimal floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-slate-400 rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default FloatingImages; 