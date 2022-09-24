export const ErrorMessage = (props: { message: string }) => {
  return (
    <div
      className="bg-surfaces-dark-3 p-4 mb-4 rounded-md
    border border-solid border-error-50 text-error-60"
    >
      {props.message}
    </div>
  );
};
