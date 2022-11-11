export const LoadingSpinner = () => {
  return (
    <div className="flex flex-row w-full items-center gap-4 justify-center py-8 invert">
      <div
        className="animate-squeeze h-8 w-8 rounded-3xl bg-surface-1"
      />
      <div
        className="animate-squeeze h-8 w-8 rounded-3xl bg-surface-2"
        style={{animationDelay: '100ms'}}
        />
      <div
        className="animate-squeeze h-8 w-8 rounded-3xl bg-surface-3"
        style={{animationDelay: '200ms'}}
      />
    </div>
  );
};
