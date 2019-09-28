import { FunctionComponent, createElement } from 'react';
import { NavigateFn } from '@reach/router';

import { User } from '../model/auth';

type Optionalize<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface InjectedProps {
  user: User;
  navigate?: NavigateFn;
}

export function withAuthentication<Props extends InjectedProps = InjectedProps>(
  WrappedComponent: FunctionComponent<Props>
) {
  type BaseProps = Optionalize<Props, keyof InjectedProps> & {
    user: User | null;
    navigate?: NavigateFn;
  };

  const result: FunctionComponent<BaseProps> = ({ user, navigate, ...rest }) => {
    if (!user) {
      navigate && navigate('/signin');
      return null;
    }

    return createElement(WrappedComponent, { ...(rest as Props), user, navigate });
  };

  return result;
}
