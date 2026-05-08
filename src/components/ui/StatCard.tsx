interface StateCardProps {
  label: string;
  value: string | number;
}

export function StateCard({ label, value }: StateCardProps) {
  return (
    <div>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

export default StateCard;
