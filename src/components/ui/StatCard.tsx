interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  iconBg: string;
  iconColor: string;
  trend?: string;
  trendColor?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  trend,
  trendColor = "text-green-700",
}: StatCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 text-base"
        style={{ background: iconBg, color: iconColor }}
      >
        <i className={`ti ${icon}`} aria-hidden="true" />
      </div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-medium text-gray-900">{value}</p>
      {trend && <p className={`text-xs mt-1 ${trendColor}`}>{trend}</p>}
    </div>
  );
}
