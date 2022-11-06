export const LoadingSpinner = () => {
  return (
    <div className="flex flex-row w-full items-center gap-4 justify-center">
      <div
        className="h-8 w-8 rounded-3xl bg-surface-5 transition-opacity
      duration-300 animate-pulse"
      />
      <div
        className="h-8 w-8 rounded-3xl bg-surface-5 transition-opacity
      delay-100 duration-300 animate-pulse"
      />
      <div
        className="h-8 w-8 rounded-3xl bg-surface-5 transition-opacity
      delay-200 duration-300 animate-pulse"
      />
    </div>
  );
};