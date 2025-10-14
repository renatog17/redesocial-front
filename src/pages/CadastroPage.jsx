import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, genders } from "../services/apiService";
import { APP_NAME } from "../configs/constants";

const CadastroPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    profile: {
      name: "",
      nickname: "",
      birthDate: "",
      gender: "",
    },
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [genderOptions, setGenderOptions] = useState([]);

  // Busca os gêneros do backend
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await genders();
        setGenderOptions(response.data); // espera array de {code, label}
      } catch (error) {
        console.error("Error fetching genders:", error);
      }
    };
    fetchGenders();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["userName", "password"].includes(id)) {
      setFormData((prev) => ({ ...prev, [id]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        profile: { ...prev.profile, [id]: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.profile.gender) {
      setMessage("Please select a gender.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response.status === 201 || response.status === 200) {
        setMessage("Account created successfully!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error creating account. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-600 mb-3">
          Create Your Account
        </h1>
        <p className="text-lg text-gray-600">
          Join {APP_NAME} and start connecting today.
        </p>
      </header>

      <main className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
            Account Information
          </h2>

          <div>
            <label htmlFor="userName" className="block text-left text-gray-700 font-medium mb-1">
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
            <label htmlFor="password" className="block text-left text-gray-700 font-medium mb-1">
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

          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-3 border-b pb-2">
            Profile Information
          </h2>

          <div>
            <label htmlFor="name" className="block text-left text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.profile.name}
              onChange={handleChange}
              placeholder=""
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="nickname" className="block text-left text-gray-700 font-medium mb-1">
              Nickname
            </label>
            <input
              id="nickname"
              type="text"
              value={formData.profile.nickname}
              onChange={handleChange}
              placeholder=""
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-left text-gray-700 font-medium mb-1">
              Birth Date
            </label>
            <input
              id="birthDate"
              type="date"
              value={formData.profile.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Gender select */}
          <div>
            <label htmlFor="gender" className="block text-left text-gray-700 font-medium mb-1">
              Gender
            </label>
            <select
              id="gender"
              value={formData.profile.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Select your gender
              </option>
              {genderOptions.map((g) => (
                <option key={g.code} value={g.code}>
                  {g.label}
                </option>
              ))}
            </select>
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
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        <p>&copy; 2025 {APP_NAME} Social Network</p>
      </footer>
    </div>
  );
};

export default CadastroPage;
