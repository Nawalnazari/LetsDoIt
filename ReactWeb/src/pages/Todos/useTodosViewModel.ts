import { useCallback, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
} from "../../graphql/operations";
import { useAuth } from "../../context/AuthContext";
import { Todo } from "../../types";

export type Filter = "all" | "pending" | "completed";

export function useTodosViewModel() {
  const { user } = useAuth();

  const [filter, setFilter] = useState<Filter>("all");
  const [addVisible, setAddVisible] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Todo | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formError, setFormError] = useState("");

  const queryVars = {
    userId: user!.id,
    ...(filter !== "all" ? { completed: filter === "completed" } : {}),
  };

  const { data, loading, refetch } = useQuery<{ todos: Todo[] }>(GET_TODOS, {
    variables: queryVars,
    skip: !user,
    fetchPolicy: "cache-and-network",
  });

  const [createTodo, { loading: creating }] = useMutation(CREATE_TODO, {
    onCompleted: () => {
      refetch();
      closeAdd();
    },
    onError: (e) => setFormError(e.message),
  });

  const [updateTodo, { loading: updating }] = useMutation(UPDATE_TODO, {
    onCompleted: () => {
      refetch();
      closeEdit();
    },
    onError: (e) => setFormError(e.message),
  });

  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    onCompleted: () => refetch(),
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted: () => {
      refetch();
      setDeleteTarget(null);
    },
  });

  const todos: Todo[] = data?.todos ?? [];

  const onRefresh = useCallback(() => refetch(), [refetch]);

  const openAdd = () => {
    setFormTitle("");
    setFormDesc("");
    setFormError("");
    setAddVisible(true);
  };
  const closeAdd = () => setAddVisible(false);

  const openEdit = (todo: Todo) => {
    setEditTodo(todo);
    setFormTitle(todo.title);
    setFormDesc(todo.description ?? "");
    setFormError("");
  };
  const closeEdit = () => setEditTodo(null);

  const handleAdd = async () => {
    setFormError("");
    if (!formTitle.trim()) {
      setFormError("Title is required");
      return;
    }
    await createTodo({
      variables: {
        userId: user!.id,
        input: {
          title: formTitle.trim(),
          description: formDesc.trim() || undefined,
        },
      },
    });
  };

  const handleUpdate = async () => {
    setFormError("");
    if (!formTitle.trim()) {
      setFormError("Title is required");
      return;
    }
    await updateTodo({
      variables: {
        id: editTodo!.id,
        input: {
          title: formTitle.trim(),
          description: formDesc.trim() || undefined,
        },
      },
    });
  };

  const handleToggle = (id: string) => toggleTodo({ variables: { id } });
  const handleDelete = () => {
    if (deleteTarget) deleteTodo({ variables: { id: deleteTarget.id } });
  };

  return {
    todos,
    loading,
    filter,
    addVisible,
    editTodo,
    deleteTarget,
    formTitle,
    formDesc,
    formError,
    creating,
    updating,
    setFilter,
    setFormTitle,
    setFormDesc,
    setDeleteTarget,
    openAdd,
    closeAdd,
    openEdit,
    closeEdit,
    handleAdd,
    handleUpdate,
    handleToggle,
    handleDelete,
    onRefresh,
  };
}
