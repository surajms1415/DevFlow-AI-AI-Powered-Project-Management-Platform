import { cn } from '../../utils/cn';

export const Card = ({ className, children, ...props }) => {
  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 shadow-soft", className)} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn("px-6 py-4 border-b border-slate-100", className)} {...props}>{children}</div>
);

export const CardBody = ({ className, children, ...props }) => (
  <div className={cn("p-6", className)} {...props}>{children}</div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={cn("px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl", className)} {...props}>{children}</div>
);
