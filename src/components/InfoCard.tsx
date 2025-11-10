import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InfoCardData } from "@/lib/types";
interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  data: InfoCardData;
}
export function InfoCard({ title, icon, data }: InfoCardProps) {
  return (
    <Card className="bg-background/50 border-border/50 backdrop-blur-sm transition-all duration-200 ease-in-out hover:shadow-glow hover:border-primary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-primary">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          {data.map(({ key, value }) => (
            <div key={key} className="flex justify-between items-start">
              <p className="text-muted-foreground w-1/2 break-words">{key}</p>
              <p className="text-foreground font-mono text-right w-1/2 break-words">
                {String(value)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}