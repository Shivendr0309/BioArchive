import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

import { useAuth } from "../../context/AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, data } = response.data;

      login(token, data);

      toast.success("Registration successful!");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Join BioArchive "
      subtitle="Create your account and start sharing your knowledge with the world."
    >
      <RegisterForm onSubmit={handleRegister} />
    </AuthLayout>
  );
}

export default Register;