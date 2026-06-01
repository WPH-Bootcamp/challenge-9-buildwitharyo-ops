interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-5 text-center">
      {icon}
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
