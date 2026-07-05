import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

import { useAuth } from "../../context/AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, data } = response.data;

      login(token, data);

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue your writing journey and manage your articles."
    >
      <LoginForm
        onSubmit={handleLogin}
      />
    </AuthLayout>
  );
}

export default Login;