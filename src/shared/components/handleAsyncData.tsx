import { ReactElement } from 'react';
import { ErrorMessage } from './errorMessage';
import { LoadingSpinner } from './loadingSpinner';

type JSXBuilder = () => ReactElement[] | ReactElement;

export const HandleAsyncData = (props: {
  children: JSXBuilder;
  error: Error | undefined | unknown;
  loading: boolean | undefined;
}) => {
  return props.loading ? (
    <LoadingSpinner />
  ) : !!props.error ? (
    <ErrorMessage message={props.error.toString()} />
  ) : !!props.children ? (
    <>{props.children()}</>
  ) : (
    <></>
  );
};
