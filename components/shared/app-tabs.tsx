import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface AppTab<T extends string> {
  value: T;
  label: string;
  // Omit when every tab shows the same region and only the query changes — the
  // consumer then renders the content itself, below the tab strip.
  content?: React.ReactNode;
}

interface Props<T extends string> {
  tabs: AppTab<T>[];
  value: T;
  onValueChange: (value: T) => void;
  variant?: "pill" | "outline" | "chip" | "segmented";
  className?: string;
}

const listStyles = {
  pill: "bg-muted inline-flex h-auto w-max items-center gap-1 rounded-full p-1",
  outline: "inline-flex h-auto w-max items-center gap-3 bg-transparent p-0",
  chip: "inline-flex h-auto w-max items-center gap-3 bg-transparent p-0",
  segmented:
    "border-border grid h-auto w-full grid-cols-2 items-stretch overflow-hidden rounded-lg border bg-transparent p-0 group-data-horizontal/tabs:h-auto",
} as const;

const triggerStyles = {
  pill: "text-muted-foreground data-[state=active]:bg-brand data-[state=active]:text-primary-foreground hover:text-foreground shrink-0 rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-all data-[state=active]:shadow-sm",
  outline:
    "border-border text-muted-foreground data-[state=active]:border-brand data-[state=active]:text-brand hover:text-foreground shrink-0 rounded-lg border px-4 py-2.5 text-sm font-medium tracking-wide whitespace-nowrap uppercase transition-colors",
  chip: "border-border text-muted-foreground data-[state=active]:border-brand data-[state=active]:text-brand hover:text-foreground shrink-0 rounded-lg border bg-white px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
  segmented:
    "text-muted-foreground data-[state=active]:border-brand data-[state=active]:bg-brand-soft/40 data-[state=active]:text-brand hover:text-foreground h-auto rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
} as const;

export function AppTabs<T extends string>({
  tabs,
  value,
  onValueChange,
  variant = "pill",
  className,
}: Props<T>) {
  const hasContent = tabs.some((tab) => tab.content !== undefined);

  return (
    <Tabs
      value={value}
      onValueChange={(v) => onValueChange(v as T)}
      className={className}
    >
      {/* Segmented fills its row, so the scroll shim would only add stray padding. */}
      <div
        className={cn(
          variant !== "segmented" &&
            "scrollbar-hide -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0",
        )}
      >
        <TabsList className={listStyles[variant]}>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={triggerStyles[variant]}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {hasContent &&
        tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
    </Tabs>
  );
}
