import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { gsap } from 'gsap';

import BrandingSide from '../components/branding-side';
import EmailLoginForm from '@/components/login/email-login-form';
import OTPLoginForm from '@/components/login/otp-login-form';
import { FcGoogle } from 'react-icons/fc';


const Login = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    )
    .fromTo(welcomeRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(cardRef.current,
      { y: 40, opacity: 0, scale: 0.95, rotateX: 10 },
      { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: "back.out(1.7)" },
      "-=0.6"
    );
  }, []);

  const handleGoogleLogin = () => {
    console.log('Google login initiated');
    // Add Google OAuth logic here
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Add forgot password logic here
  };

  return (
    <div ref={containerRef} className="h-screen grid lg:grid-cols-2 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
     
      
      {/* Left Side - Branding */}
      <BrandingSide />
      
      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-4 relative bg-indigo-500/40 z-10 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <Card 
            ref={cardRef}
            className="w-full bg-white/60 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300"
          >
            <CardContent className="p-6 ">
              {/* Welcome Header inside the form */}
              <div ref={welcomeRef} className="text-center mb-10">
                <div className="relative ">
                  <div 
                                >
                    <h2 className="text-3xl font-bold text-slate-800 mb-1">Welcome to Taskify</h2>
                    <p className="text-sm text-slate-600 font-medium">Sign in to your productivity workspace</p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-80 shadow-lg animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-70 shadow-lg animate-ping"></div>
                </div>
              </div>

              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl">
                  <TabsTrigger 
                    value="email" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold transition-all duration-300"
                  >
                    Email
                  </TabsTrigger>
                  <TabsTrigger 
                    value="otp" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white  data-[state=active]:shadow-lg font-semibold transition-all duration-300"
                  >
                    OTP
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <EmailLoginForm onForgotPassword={handleForgotPassword} />
                </TabsContent>

                <TabsContent value="otp" className="space-y-4">
                  <OTPLoginForm />
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-300/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white/80 px-3 py-1 text-slate-500 backdrop-blur-sm rounded-full font-medium">Or continue with</span>
                  </div>
                </div>

                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full mt-4 h-11 bg-white/70 backdrop-blur-sm border-white/40 hover:bg-white/90 text-slate-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                 <FcGoogle   className="h-5 w-5" />
                  Continue with Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login; 