export const Grade = (props: { grade: number; className?: string }) => {
  return (
    <p
      className={[
        'mb-0 text-2xl font-black',
        props.grade <= 0.6
          ? 'text-red-600'
          : props.grade <= 0.8
          ? 'text-amber-400'
          : 'text-emerald-600',
        props.className,
      ].join(' ')}
    >
      {(props.grade * 100).toFixed(2)}%
    </p>
  );
};
