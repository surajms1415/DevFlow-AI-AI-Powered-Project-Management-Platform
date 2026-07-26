import { cn } from '../../utils/cn';

export const Table = ({ className, children, ...props }) => (
  <div className="w-full overflow-auto rounded-xl border border-slate-200 shadow-sm bg-white">
    <table className={cn("w-full text-sm text-left", className)} {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ className, children, ...props }) => (
  <thead className={cn("text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200", className)} {...props}>
    {children}
  </thead>
);

export const TableBody = ({ className, children, ...props }) => (
  <tbody className={className} {...props}>
    {children}
  </tbody>
);

export const TableRow = ({ className, children, ...props }) => (
  <tr className={cn("bg-white border-b border-slate-100 hover:bg-slate-50/50 transition-colors", className)} {...props}>
    {children}
  </tr>
);

export const TableHead = ({ className, children, ...props }) => (
  <th scope="col" className={cn("px-6 py-4 font-medium", className)} {...props}>
    {children}
  </th>
);

export const TableCell = ({ className, children, ...props }) => (
  <td className={cn("px-6 py-4 whitespace-nowrap", className)} {...props}>
    {children}
  </td>
);
