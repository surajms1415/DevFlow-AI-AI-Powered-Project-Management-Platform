import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { Lock } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      addToast({ title: 'Password Reset', message: 'Your password has been changed successfully.', type: 'success' });
      navigate('/login');
    } catch (error) {
      addToast({ title: 'Error', message: 'Invalid or expired token.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Invalid password reset link. <Link to="/forgot-password" className="text-indigo-600">Request a new one</Link>.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="max-w-md w-full shadow-glass border-slate-200">
        <CardHeader className="text-center pb-2 border-none pt-8">
          <h2 className="text-2xl font-bold text-slate-800">Set New Password</h2>
          <p className="text-slate-500 mt-1">Please enter your new password</p>
        </CardHeader>
        <CardBody className="pt-4 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">New Password</label>
              <Input 
                icon={Lock} 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
              Reset Password
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ResetPassword;
