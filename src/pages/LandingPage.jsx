import React from "react";
import { Link } from "react-router-dom";
import { APP_NAME } from "../configs/constants";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-blue-600 mb-3">
          Welcome to {APP_NAME}
        </h1>
        <p className="text-lg text-gray-600">Connect with your world.</p>
      </header>

      {/* Main */}
      <main className="bg-white p-10 rounded-lg shadow-lg text-center">
        <div className="space-x-4">
          <Link
            to="/cadastro"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-lg transition-colors"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        <p>&copy; 2025 {APP_NAME} Social Network</p>
      </footer>
    </div>
  );
}
