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
        <ErrorMessage
          // @ts-ignore
          message={props.error?.response?.data?.error || props.error.toString()}
          className="mb-4"
        />
      )}
      {props.children()}
    </>
  );
};
