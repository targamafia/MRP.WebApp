import { AxiosError } from 'axios';
import { ReactElement } from 'react';
import { ErrorMessage } from './errorMessage';
import { LoadingSpinner } from './loadingSpinner';

type JSXBuilder = () => ReactElement[] | ReactElement;

export const HandleAsyncData = (props: {
  children: JSXBuilder;
  error: AxiosError<any> | undefined | unknown;
  loading: boolean | undefined;
}) => {
  return props.loading ? (
    <LoadingSpinner />
  ) : (
    <>
      {!!props.error && (
        // @ts-ignore
        <ErrorMessage message={props.error?.response?.data?.error || ''} />
      )}
      {props.children()}
    </>
  );
};
