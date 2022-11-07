import Checkbox from '@mui/material/Checkbox';
import { Row } from '../layout/row';

export const MultiselectFilter = (props: {
  allOptions: any[];
  selectedOptions: any[];
  onChange: Function;
}) => {
  return (
    <div className="flex flex-col">
      {props.allOptions.map((option) => (
        <Row spacing={2} items="center" key={option}>
          <Checkbox
            checked={props.selectedOptions.includes(option)}
            onChange={() => {
              props.onChange(option);
            }}
            color="primary"
          />
          <p>{option}</p>
        </Row>
      ))}
    </div>
  );
};
