import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full flex justify-between items-center bg-white shadow-sm border-b px-6 py-3">

      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
          alt="logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-lg font-semibold text-gray-800">HatchHub</div>
      </div>

      {/* Right: Navigation Buttons */}
      <div className="flex items-center gap-3">
        <button
          className="text-sm font-medium text-gray-700 hover:text-black px-3 py-1 transition"
          onClick={() => navigate("/private-view")}
        >
          Private View
        </button>
        <button
          className="text-sm font-medium text-gray-700 hover:text-black px-3 py-1 transition"
          onClick={() => navigate("/")}
        >
          Public View
        </button>
        <button
          className="text-sm font-medium text-gray-700 hover:text-black px-3 py-1 transition"
          onClick={() => navigate("/myjoinrequests")}
        >
          My Join Requests
        </button>
        <button
          className="text-sm font-medium text-gray-700 hover:text-black px-3 py-1 transition"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
        <button
          className="px-3 py-1 text-sm font-medium text-white bg-gray-800 hover:bg-black rounded-full transition"
          onClick={() => navigate("/logout")}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
