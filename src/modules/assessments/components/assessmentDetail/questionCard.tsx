import { Row } from '@/shared/layout/row';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { NavLink } from 'react-router-dom';
import { IQuestion } from '../../models';

function QuestionCard(props: { question: IQuestion }): JSX.Element {
  return (
    <div
      className={[
        props.question.correctOption ? 'bg-surface-5' : 'bg-surface-2',
        'rounded-md p-4',
      ].join(' ')}
    >
      <Row spacing={2} className="mb-4">
        <NavLink to={props.question._id} className="inline-block">
          <EditOutlined />
        </NavLink>
        <h3 className="mb-0 text-2xl font-bold inline-block leading-6">
          {props.question.title}
        </h3>
      </Row>
      {props.question.options.map((option, i) => (
        <div
          className={[
            'p-2 flex flex-row gap-4',
            option.isCorrectAnswer ? 'text-orange' : '',
          ].join(' ')}
          key={i}
        >
          <h4 className="w-6 text-xl font-bold">{i + 1}</h4>
          {option.value}
        </div>
      ))}
    </div>
  );
}

export default QuestionCard;
