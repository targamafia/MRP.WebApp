const getInputElementByType = (props: {
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

  switch (props.type) {
    case 'textarea':
      return (
        <textarea
          {...props.register(props.name, { required: props.required })}
          placeholder={titleCase}
          id={props.name}
          rows={3}
          className="resize-none"
          autoComplete={props.autocomplete}
        />
      );
    default:
      return (
        <input
          {...props.register(props.name, { required: props.required })}
          type={props.type}
          placeholder={titleCase}
          id={props.name}
          required={props.required}
          minLength={3}
          autoComplete={props.autocomplete}
        />
      );
  }
};

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
  const inputElement = getInputElementByType(props);
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name}>{titleCase}:</label>
      {inputElement}
    </div>
  );
};
