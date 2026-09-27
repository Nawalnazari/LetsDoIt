import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { LOGIN, SIGNUP } from '../../graphql/operations';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types';

export type AuthMode = 'login' | 'signup';

export function useLoginViewModel() {
  const { login } = useAuth();

  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [loginMutation, { loading: loginLoading }] = useMutation<{ login: User }>(LOGIN);
  const [signupMutation, { loading: signupLoading }] = useMutation<{ signup: User }>(SIGNUP);

  const loading = loginLoading || signupLoading;

  const handleModeChange = (next: AuthMode) => {
    setMode(next);
    setError('');
  };

  const handleSubmit = async () => {
    setError('');
    try {
      if (mode === 'login') {
        const { data } = await loginMutation({ variables: { email: email.trim(), password } });
        if (data?.login) await login(data.login);
      } else {
        if (!name.trim()) { setError('Name is required'); return; }
        const { data } = await signupMutation({
          variables: { name: name.trim(), email: email.trim(), password },
        });
        if (data?.signup) await login(data.signup);
      }
    } catch (e: any) {
      const msg = e?.graphQLErrors?.[0]?.message ?? e?.message ?? 'Something went wrong';
      setError(msg);
    }
  };

  return {
    mode,
    name,
    email,
    password,
    showPassword,
    error,
    loading,
    handleModeChange,
    setName,
    setEmail,
    setPassword,
    toggleShowPassword: () => setShowPassword((p) => !p),
    handleSubmit,
  };
}
