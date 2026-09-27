import { useCallback, useMemo, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_TODOS, CREATE_TODO } from '../../graphql/operations';
import { useAuth } from '../../context/AuthContext';
import { Todo } from '../../types';

export function useHomeViewModel() {
  const { user, logout } = useAuth();

  const [refreshing, setRefreshing] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formError, setFormError] = useState('');

  const { data, loading, refetch } = useQuery<{ todos: Todo[] }>(GET_TODOS, {
    variables: { userId: user!.id },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const [createTodo, { loading: creating }] = useMutation(CREATE_TODO, {
    onCompleted: () => { refetch(); closeAdd(); },
    onError: (e) => setFormError(e.message),
  });

  const todos: Todo[] = data?.todos ?? [];
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? completed / total : 0;
  const recentTodos = todos.slice(-5).reverse();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const initials =
    user?.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? '?';

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const openAdd = () => {
    setFormTitle('');
    setFormDesc('');
    setFormError('');
    setAddVisible(true);
  };

  const closeAdd = () => setAddVisible(false);

  const handleAdd = async () => {
    setFormError('');
    if (!formTitle.trim()) { setFormError('Title is required'); return; }
    await createTodo({
      variables: {
        userId: user!.id,
        input: { title: formTitle.trim(), description: formDesc.trim() || undefined },
      },
    });
  };

  return {
    // User
    user,
    greeting,
    initials,
    logout,
    // Todos
    todos,
    recentTodos,
    loading,
    total,
    completed,
    pending,
    progress,
    // Refresh
    refreshing,
    onRefresh,
    // Quick-add
    addVisible,
    formTitle,
    formDesc,
    formError,
    creating,
    setFormTitle,
    setFormDesc,
    openAdd,
    closeAdd,
    handleAdd,
  };
}
