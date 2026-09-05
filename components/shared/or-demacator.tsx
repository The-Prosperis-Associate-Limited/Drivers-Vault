import { AppText } from "./app-text";

export const OrDemacator = function ({
  showText = true,
}: {
  showText?: boolean;
}) {
  return (
    <div className="my-4 flex items-center justify-center">
      <div className="h-px flex-1 bg-gray-300" />
      {showText && (
        <AppText type="subtitle" className="mx-2 text-sm text-gray-500">
          Or
        </AppText>
      )}
      <div className="h-px flex-1 bg-gray-300" />
    </div>
  );
};
