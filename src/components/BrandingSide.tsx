import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles, Zap, Target } from 'lucide-react';

// Import all images
import floatingGhibli1 from './../assets/images/floating-ghibli-1.png';
import floatingGhibli2 from './../assets/images/floating-ghibli-2.png';
import floatingGhibli3 from './../assets/images/img.png';
import floatingGhibli4 from './../assets/images/floating-ghibli-3.png';

const BrandingSide = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const floatingImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title and subtitle animation
      tl.fromTo(titleRef.current,
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2 }
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(mainImageRef.current,
        { scale: 0.8, opacity: 0, rotateY: 15 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.5 },
        "-=0.5"
      );

      // Animate features if they exist
      if (featuresRef.current?.children) {
        tl.fromTo(Array.from(featuresRef.current.children),
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
          "-=0.8"
        );
      }

      // Floating images animation
      floatingImagesRef.current.forEach((img, index) => {
        if (img) {
          gsap.to(img, {
            y: index % 2 === 0 ? -15 : 15,
            x: index % 2 === 0 ? 10 : -10,
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 4 + index,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.5
          });
        }
      });

      // Particle animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle, index) => {
          gsap.to(particle, {
            y: -20,
            opacity: 0,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            delay: index * 0.2,
            ease: "power1.out"
          });
        });
      }

      // Continuous gentle movement for main image
      gsap.to(mainImageRef.current, {
        y: -10,
        rotateY: 5,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Smart Organization",
      description: "AI-powered task categorization and priority management",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant task updates and real-time synchronization",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Visualize your progress and achieve your goals",
      color: "from-emerald-400 to-teal-500"
    }
  ];

  return (
    <div ref={containerRef} className="hidden lg:flex flex-col justify-center items-center p-4 relative z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden min-h-screen">
      {/* Animated background particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl space-y-6 relative">
        {/* Brand Title Section */}
        <div className="text-center space-y-3 relative">
          <h1 
            ref={titleRef}
            className="text-4xl py-2  sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400  to-pink-400 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
              filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))'
            }}
          >
            Taskify
          </h1>
          <p 
            ref={subtitleRef}
            className="text-sm sm:text-lg md:text-lg text-slate-300 leading-relaxed font-medium max-w-lg mx-auto"
          >
            Transform your productivity journey with intelligent task management powered by AI
          </p>
        </div>

        {/* Main Image with 3D Effect */}
        <div className="relative group perspective-1000 mb-12 mt-12 ">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-110"></div>
          <div className="relative">
            <img
              ref={mainImageRef}
              src={floatingGhibli1}
              alt="Taskify workspace illustration"
              className="relative w-full max-w-xs mx-auto h-auto object-cover rounded-3xl shadow-2xl border-4 border-white/10 backdrop-blur-sm transform-gpu"
              style={{
                filter: 'contrast(1.1) saturate(1.1)',
                transform: 'perspective(1000px) rotateX(5deg) rotateY(-2deg)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 10px 20px rgba(99, 102, 241, 0.3)'
              }}
            />
          </div>
        </div>

        {/* Floating Images */}
        <div className="absolute inset-0 pointer-events-none">
          {[floatingGhibli2, floatingGhibli3, floatingGhibli4].map((img, index) => (
            <img
              key={index}
              ref={(el) => {
                if (el) floatingImagesRef.current[index] = el;
              }}
              src={img}
              alt={`Floating illustration ${index + 2}`}
              className="absolute w-16 sm:w-20 md:w-24 h-auto rounded-xl shadow-2xl opacity-80"
              style={{
                top: `${24 + index * 18}%`,
                left: `${index % 2 === 0 ? '16%' : '70%'}`,
                transform: `perspective(500px) rotateY(${index % 2 === 0 ? '10deg' : '-10deg'}) rotateX(${index % 2 === 0 ? '5deg' : '-5deg'})`
              }}
            />
          ))}
        </div>

        {/* Features Section */}
        <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                transform: `perspective(1000px) rotateX(${index % 2 === 0 ? '2deg' : '-2deg'})`
              }}
            >
              <div 
                className="backdrop-blur-lg  bg-white/5 border  border-white/10 rounded-xl p-3 shadow-xl transition-all duration-500 hover:bg-white/10 hover:scale-105"
                style={{
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div 
                    className={`w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                    style={{
                      boxShadow: '0 6px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-slate-300 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandingSide; 