"use client";

interface Stat {
  value: string;
  label: string;
}

interface StatsCounterProps {
  stats: Stat[];
  bgColor?: string;
}

export default function StatsCounter({ stats = [], bgColor = "bg-primary text-primary-foreground" }: Partial<StatsCounterProps>) {
  const gridCols =
    stats.length >= 4 ? "md:grid-cols-4" : stats.length === 3 ? "md:grid-cols-3" : stats.length === 2 ? "md:grid-cols-2" : "md:grid-cols-1";

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className={`animate-fade-in-up grid grid-cols-2 gap-8 text-center ${gridCols}`}>
          {stats.map(function (stat, i) {
            return (
              <div key={i} className="card-hover rounded-xl border border-border/20 bg-background/10 p-6">
                <p className="text-4xl font-bold md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wider opacity-80">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
