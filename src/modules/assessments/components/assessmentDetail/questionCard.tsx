import { Row } from '@/shared/layout/row';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';
import { useDeleteAssessmentQuestion } from '../../hooks/useAssessments';
import { IQuestion } from '../../models';

function QuestionCard(props: {
  question: IQuestion;
  answer?: string;
  assessmentId: string;
}): JSX.Element {
  const { mutate } = useDeleteAssessmentQuestion(
    props.assessmentId,
    props.question._id
  );

  const deleteQuestion = () => {
    if (
      !confirm(`Estás a punto de borrar la pregunta
      
      "${props.question.title}"
      
      Esto no se puede deshacer.
      
    ¿Quieres continuar?`)
    )
      return;
    mutate(props.question);
  };

  return (
    <div className="rounded-md p-4 bg-surface-3">
      <Row spacing={2} className="mb-4">
        <h3 className="mb-0 text-2xl font-bold grow">{props.question.title}</h3>
        {!props.answer && (
          <>
            <NavLink
              to={props.question._id}
              className="p-2 hover:scale-110 hover:text-orange transition-all"
            >
              <EditOutlined />
            </NavLink>
            <IconButton
              onClick={deleteQuestion}
              className="hover:scale-110 hover:!text-error-50 transition-all"
            >
              <DeleteOutline color="inherit" />
            </IconButton>
          </>
        )}
      </Row>
      <Row spacing={8}>
        {!!props.question.imageUrl && (
          <img
            src={props.question.imageUrl}
            className="w-48 rounded-md object-cover"
            loading="lazy"
          />
        )}
        <div className="grid gap-2 py-4 items-stretch w-full">
          {props.question.options.map((option, i) => (
            <div
              className={[
                'px-4 py-2 flex flex-row gap-2 justify-stretch rounded-md items-center',
                option._id == props.answer ? 'bg-red-400 text-black' : '',
                option.isCorrectAnswer ? '!bg-emerald-300 text-black' : '',
              ].join(' ')}
              key={i}
            >
              <h4 className="w-6 text-md font-bold">{i + 1}</h4>
              {option.value}
            </div>
          ))}
        </div>
      </Row>
    </div>
  );
}

export default QuestionCard;
