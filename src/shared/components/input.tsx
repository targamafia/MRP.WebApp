export const Input = (props: {
  type: string;
  name: string;
  register: Function;
  required?: boolean;
  autocomplete?: string;
  label?: string;
}) => {
  const titleCase = !props.label
    ? props.name[0].toLocaleUpperCase() + props.name.slice(1)
    : props.label;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name}>{titleCase}:</label>
      {props.type == 'textarea' ? (
        <textarea
          {...props.register(props.name)}
          placeholder={titleCase}
          id={props.name}
          rows={3}
          className="resize-none"
          autoComplete={props.autocomplete}
        />
      ) : (
        <input
          {...props.register(props.name)}
          type={props.type}
          placeholder={titleCase}
          id={props.name}
          required={props.required}
          minLength={3}
          autoComplete={props.autocomplete}
        />
      )}
    </div>
  );
};
