import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setIsSent(true);
      addToast({ title: 'Email Sent', message: 'Check your inbox for reset instructions.', type: 'success' });
    } catch (error) {
      addToast({ title: 'Error', message: 'Failed to send reset email.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="max-w-md w-full shadow-glass border-slate-200">
        <CardHeader className="text-center pb-2 border-none pt-8">
          <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>
          <p className="text-slate-500 mt-1">
            {isSent ? "We've sent you an email" : "Enter your email to receive a reset link"}
          </p>
        </CardHeader>
        <CardBody className="pt-4 pb-8">
          {isSent ? (
            <div className="text-center space-y-6">
              <div className="p-4 bg-indigo-50 text-indigo-700 rounded-lg text-sm">
                A password reset link has been sent to <strong>{email}</strong>.
              </div>
              <Link to="/login" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700">
                <ArrowLeft size={16} className="mr-2" /> Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <Input 
                  icon={Mail} 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
                Send Reset Link
              </Button>
              <div className="mt-4 text-center">
                <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
                  <ArrowLeft size={16} className="mr-2" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ForgotPassword;
