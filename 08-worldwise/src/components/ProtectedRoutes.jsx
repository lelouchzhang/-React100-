import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function ProtectedRoutes({ children }) {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) navigate("/");
  }, [isLogin, navigate]);
  return isLogin ? children : null;
}
