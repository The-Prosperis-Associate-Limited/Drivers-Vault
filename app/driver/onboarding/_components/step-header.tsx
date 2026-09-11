import { AppText } from "@/components/shared/app-text";
import { Progress } from "@/components/ui/progress";

interface Props {
  title: string;
  description?: string;
  progress?: number;
}

export const StepHeader = function ({ title, description, progress }: Props) {
  return (
    <div className="mb-6 space-y-3">
      {typeof progress === "number" && (
        <Progress value={progress} className="h-1.5" />
      )}

      <div className="space-y-1">
        <AppText type="h3" className="text-lg font-semibold">
          {title}
        </AppText>
        {description && (
          <AppText type="caption" className="text-muted-foreground block">
            {description}
          </AppText>
        )}
      </div>
    </div>
  );
};
