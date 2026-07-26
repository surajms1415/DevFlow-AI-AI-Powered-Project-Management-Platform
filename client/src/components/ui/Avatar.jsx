import { cn } from '../../utils/cn';

export const Avatar = ({ src, alt, initials, className, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center overflow-hidden bg-slate-200 rounded-full", sizes[size], className)}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-slate-600">{initials}</span>
      )}
    </div>
  );
};
