// src/hooks/useAuthCheck.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired, removeToken } from "../utils/auth";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenExpired()) {
      removeToken();
      navigate("/login", { replace: true });
    }
  }, [navigate]);
};

export default useAuthCheck;
