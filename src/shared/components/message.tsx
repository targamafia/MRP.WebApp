export const Message = (props: {
  type: string;
  title?: string;
  message: string;
}) => {
  return (
    <div
      className={[
        'p-4 border border-solid rounded-md w-full shadow-lg',
        props.type == 'error' && 'border-error-60 bg-error-50 text-white',
        props.type == 'info' && 'border-blue bg-surface-2',
      ].join(' ')}
    >
      <h2>
        {props.title !== undefined
          ? props.title
          : props.type == 'info'
          ? 'Éxito'
          : 'Error'}
      </h2>
      <p>{props.message}</p>
    </div>
  );
};
