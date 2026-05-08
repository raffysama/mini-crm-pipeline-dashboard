interface BadgeProps {
  children: string;
  variant?: "blue" | "yellow" | "green" | "red" | "slate";
}

function Badge({ children, variant = "slate" }: BadgeProps) {
  const variants = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    slate: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <>
      <span
        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${variants[variant]}`}
      >
        {children}
      </span>
    </>
  );
}

export default Badge;
