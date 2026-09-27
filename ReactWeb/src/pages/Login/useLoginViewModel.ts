import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, SIGNUP } from "../../graphql/operations";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../types";

export function useLoginViewModel() {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [loginMutation, { loading: loginLoading }] = useMutation<{
    login: User;
  }>(LOGIN, {
    onCompleted: (data) => login(data.login),
    onError: (e) => setError(e.message),
  });

  const [signupMutation, { loading: signupLoading }] = useMutation<{
    signup: User;
  }>(SIGNUP, {
    onCompleted: (data) => login(data.signup),
    onError: (e) => setError(e.message),
  });

  const loading = loginLoading || signupLoading;

  const handleModeChange = (m: "login" | "signup") => {
    setMode(m);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    if (mode === "signup") {
      if (!name.trim()) {
        setError("Name is required");
        return;
      }
      signupMutation({
        variables: { name: name.trim(), email: email.trim(), password },
      });
    } else {
      loginMutation({ variables: { email: email.trim(), password } });
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
    setName,
    setEmail,
    setPassword,
    toggleShowPassword: () => setShowPassword((v) => !v),
    handleModeChange,
    handleSubmit,
  };
}
