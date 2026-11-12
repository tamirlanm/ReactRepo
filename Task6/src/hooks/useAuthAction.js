
import { useState } from "react";
import {
  getAuthErrorMessage,
} from "../services/authService";

export function useAuthAction() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function run(action) {
    setPending(true);
    setError("");

    try {
      await action();
      return true;
    } catch (err) {
      setError(getAuthErrorMessage(err));
      return false;
    } finally {
      setPending(false);
    }
  }

  return {
    pending,
    error,
    setError,
    run,
  };
}
