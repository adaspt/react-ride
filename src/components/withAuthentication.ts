import { FunctionComponent, createElement } from 'react';
import { redirectTo } from '@reach/router';

import { User } from '../hooks/useSession';

type Optionalize<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface InjectedProps {
  user: User;
}

export function withAuthentication<Props extends InjectedProps = InjectedProps>(
  WrappedComponent: FunctionComponent<Props>
) {
  type BaseProps = Optionalize<Props, keyof InjectedProps> & {
    user: User | null;
  };

  const result: FunctionComponent<BaseProps> = ({ user, ...rest }) => {
    if (!user) {
      redirectTo('/signin');
      return null;
    }

    return createElement(WrappedComponent, { ...(rest as Props), user });
  };

  return result;
}
