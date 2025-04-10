import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("anandheyy its an error");
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const name = method === "login" ? "Sign In" : "Register";

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-rose-100 rounded-2xl shadow-xl p-8 space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-rose-600">{name}</h1>
          <p className="text-sm text-gray-500">
            {method === "login" ? (
              <>
                Don't have an account?{" "}
                <a href="/register" className="text-rose-500 hover:underline">
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a href="/login" className="text-rose-500 hover:underline">
                  Sign in
                </a>
              </>
            )}
          </p>
        </div>

        <input
          className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 transition duration-200 font-semibold"
        >
          {loading ? "Please wait..." : name}
        </button>
      </form>
    </div>
  );
}

export default Form;
