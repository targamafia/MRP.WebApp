import Chip from '@mui/material/Chip';

export const ChipRow = (props: { elements: string[]; noMargin?: boolean }) => {
  return (
    <div
      className={
        'flex gap-4 flex-wrap ' + (props.noMargin === true ? '' : 'mb-4')
      }
    >
      {props.elements.map((cat) => (
        <Chip label={cat} variant="filled" color="primary" key={cat} />
      ))}
    </div>
  );
};
