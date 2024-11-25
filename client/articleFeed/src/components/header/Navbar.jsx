import React from "react";
import { Bell, Settings, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/settings");
  };
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold font-serif  text-gray-900">Article Feed</h1>
            </Link>{" "}
          </div>
          <div className="flex items-center gap-4">
            <button
              className="text-gray-600 hover:text-gray-900"
              aria-label="Settings"
              onClick={handleRedirect}
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
