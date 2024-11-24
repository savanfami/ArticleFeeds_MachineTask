import React, { useState } from "react";

export const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const Errors = {};
    let isValid = true;

    if (!formData.emailOrPhone) {
      Errors.emailOrPhone = "Email or phone number is required";
      isValid = false;
    }

    if (!formData.password) {
      Errors.password = "Password is required";
      isValid = false;
    }

    setErrors(Errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
      alert("Login successful!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="rounded-lg shadow-lg max-w-md w-full p-6 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* Email or Phone */}
            <input
              id="emailOrPhone"
              type="text"
              name="emailOrPhone"
              onChange={handleChange}
              value={formData.emailOrPhone}
              placeholder="Email or Phone"
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.emailOrPhone && (
              <p className="text-red-500 text-xs">{errors.emailOrPhone}</p>
            )}
          </div>

          <div>
            {/* Password */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <span className="cursor-pointer text-blue-500 font-semibold">
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
