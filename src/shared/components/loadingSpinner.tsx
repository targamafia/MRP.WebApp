export const LoadingSpinner = () => {
  return (
    <div className="flex flex-row w-full items-center gap-4 justify-center py-8">
      <div
        className="animate-ping h-4 w-4 rounded-3xl bg-blue"
      />
      <div
        className="animate-ping h-4 w-4 rounded-3xl bg-blue"
        style={{animationDelay: '100ms'}}
        />
      <div
        className="animate-ping h-4 w-4 rounded-3xl bg-blue"
        style={{animationDelay: '200ms'}}
      />
    </div>
  );
};
