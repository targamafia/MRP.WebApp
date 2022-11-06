import { ReactNode, useEffect, useRef, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { Row } from '../layout/row';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddOutlined from '@mui/icons-material/AddOutlined';
import { ChipRow } from './chipRow';

export const MultiSelect = (props: {
  register: Function;
  name: string;
  setValue: Function;
  defaultValue?: string[]
}) => {
  const itemInput = useRef<HTMLTextAreaElement>(null);
  const [values, setValues] = useState<string[]>(props.defaultValue || []);
  const titleCase = props.name[0].toLocaleUpperCase() + props.name.slice(1);

  const addItem = () => {
    if (itemInput === null || itemInput.current === null) return;
    setValues([itemInput.current.value.trim() as string, ...values]);
    itemInput.current.value = '';
  };

  const removeItem = (data: FieldValues) => {
    setValues(values.filter((e) => e !== data.value));
  };

  useEffect(() => {
    props.setValue(props.name + '[]', values);
  }, [values]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <input type="hidden" {...props.register(props.name + '[]')} />
      <div className="flex flex-row gap-4 w-full items-end">
        <div className="flex flex-col gap-1 grow">
          <label htmlFor="multiselect">{titleCase}:</label>
          <textarea
            onKeyUp={(ev) => {
              if (ev.key == 'Enter') {
                ev.preventDefault();
                addItem();
              }
            }}
            onSubmit={(ev) => {
              ev.preventDefault();
              addItem();
            }}
            rows={1}
            className="resize-none"
            placeholder={titleCase}
            id="multiselect"
            ref={itemInput}
          />
        </div>
        <IconButton aria-label="add" onClick={addItem}>
          <AddOutlined color="primary" />
        </IconButton>
      </div>
      <Row spacing={4} wrap={true}>
        {values.map((value) => (
          <Chip
            color="primary"
            label={value}
            key={value}
            onDelete={() => removeItem({ value })}
          />
        ))}
      </Row>
    </div>
  );
};
