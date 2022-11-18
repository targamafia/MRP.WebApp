export const ErrorMessage = (props: { message: string; className?: string }) => {
  return (
    <div
      className={[
        'p-4 border border-solid rounded-md',
        'w-full shadow-lg',
        'border-error-60 bg-error-50 text-white',
        props.className,
      ].join(' ')}
    >
      {props.message}
    </div>
  );
};
