import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/apiService";
import { APP_NAME } from "../configs/constants";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuthenticated, setUser } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await login(formData);
      setUser(response.data);
      console.log("Login successful:", response.data);
      if (response.status === 200) {
        setMessage("Login successful!");
        setAuthenticated(true);
        navigate("/feed");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Invalid credentials. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-600 mb-3">Welcome Back</h1>
        <p className="text-lg text-gray-600">
          Sign in to continue to {APP_NAME}.
        </p>
      </header>

      {/* Main */}
      <main className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="userName"
              className="block text-left text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              id="userName"
              type="email"
              value={formData.userName}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-left text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-lg text-white transition-colors ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}

        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/cadastro" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        <p>&copy; 2025 {APP_NAME} Social Network</p>
      </footer>
    </div>
  );
};

export default LoginPage;
