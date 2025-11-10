import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InfoCardData } from "@/lib/types";
interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  data: InfoCardData;
}
export function InfoCard({ title, icon, data }: InfoCardProps) {
  return (
    <Card className="bg-black/40 border border-primary/20 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-primary/50 hover:shadow-[0_0_15px_rgba(243,128,32,0.3)] group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-primary/10">
        <CardTitle className="text-sm font-mono text-primary uppercase tracking-wider">
          <span className="text-primary/50">[</span> {title} <span className="text-primary/50">]</span>
        </CardTitle>
        <div className="text-primary/50 group-hover:text-primary transition-colors">{icon}</div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2 text-xs font-mono">
          {data.map(({ key, value }) => (
            <div key={key} className="flex justify-between items-start gap-2">
              <p className="text-muted-foreground/70 w-1/2 break-words">
                <span className="text-primary/30">&gt;</span> {key}
              </p>
              <p className="text-foreground/90 text-right w-1/2 break-words">
                {String(value)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}