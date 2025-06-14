import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';


interface EmailLoginFormProps {
  onForgotPassword: () => void;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email login:', { email, password });
    // Add actual login logic here
  };

  return (
    <form onSubmit={handleEmailLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-800" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11 bg-white border border-gray-300 rounded-xl"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-700 font-semibold">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-800" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-11 bg-white border border-gray-300 rounded-xl"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-500"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="text-right">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-blue-600 font-medium text-sm"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full h-11 bg-blue-600 text-white font-semibold rounded-xl"
      >
        Sign In to Taskify
      </button>

      

     
    </form>
  );
};

export default EmailLoginForm; 