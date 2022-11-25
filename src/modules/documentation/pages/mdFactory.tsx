import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';

export const MarkdownFactory = (props: {
  filename: string;
  imgPath: string;
}) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + props.filename)
      .then((res) => res.text())
      .then((res) => res.replaceAll('(./', `(./${props.imgPath}/`))
      .then((text) => setContent(text));
    return;
  });

  useEffect(() => {
    document
      .querySelectorAll('main h2')
      .forEach((el) => el.classList.add('mt-8'));
  }, [content]);

  return (
    <>
      <NavLink
        to="../"
        className="mb-4 inline-block sticky top-0 bg-surface-2
      bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-r-lg"
      >
        <ArrowBackIos /> Regresar
      </NavLink>
      <ReactMarkdown children={content} />
    </>
  );
};

export default MarkdownFactory;
