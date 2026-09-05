import { AppText } from "./app-text";

interface Props {
  title: string;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export const PageHeader = function ({ title, subtitle, action }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <AppText type="h2" className="text-xl font-bold md:text-2xl">
          {title}
        </AppText>
        {subtitle && (
          <AppText type="subtitle" className="text-muted-foreground text-sm">
            {subtitle}
          </AppText>
        )}
      </div>
      {action}
    </div>
  );
};
