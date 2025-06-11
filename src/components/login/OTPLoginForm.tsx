import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';

const OTPLoginForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    console.log('Sending OTP to:', phone);
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    console.log('Verifying OTP:', otp);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-700" />
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-12 h-12 bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
            required
          />
        </div>
      </div>

      {!isOtpSent ? (
        <Button
          onClick={handleSendOtp}
          className="w-full h-12 bg-blue-500 text-white font-semibold rounded-xl shadow-lg"
        >
          Send OTP
        </Button>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="otp" className="text-slate-700 font-medium">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700 placeholder:text-slate-400 text-center text-lg tracking-widest font-semibold rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
              maxLength={6}
            />
          </div>
          <Button
            onClick={handleVerifyOtp}
            className="w-full h-12 bg-blue-500 text-white font-semibold rounded-xl shadow-lg"
          >
            Verify OTP
          </Button>
          <button
            onClick={() => setIsOtpSent(false)}
            className="w-full text-slate-500 font-medium text-sm"
          >
            Change Phone Number
          </button>
        </div>
      )}
    </div>
  );
};

export default OTPLoginForm; 