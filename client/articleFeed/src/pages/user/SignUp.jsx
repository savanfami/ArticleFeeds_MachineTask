import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CheckCircle,Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../../redux/action/userAction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
  const [errors, setErrors] = useState({});
  const {loading,err,loggedIn}=useSelector(state=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    preferences: [],
  });

  const preferences = [
    { id: "sports", label: "Sports", icon: "⚽" },
    { id: "entertainment", label: "Entertainment", icon: "🎬" },
    { id: "politics", label: "Politics", icon: "📰" },
    { id: "tech", label: "Tech", icon: "💻" },
    { id: "health", label: "Health", icon: "🏥" },
    { id: "food", label: "Food", icon: "🍳" },
  ];

  const handlePreferenceChange = (preferenceId) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preferenceId)
        ? prev.preferences.filter((id) => id !== preferenceId)
        : [...prev.preferences, preferenceId],
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      preferences: "",
    }));
  };

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
    if (!formData.firstName || formData.firstName.trim() === "") {
      Errors.firstName = "first name is required";
      isValid = false;
    }

    if (!formData.lastName || !formData.lastName.trim()) {
      Errors.lastName = "last name is required";
      isValid = false;
    }

    const mobileRegex = /^(\+?\d{1,4}[\s-]?)?(?!0+\s*,?$)\d{10}$/;
    if (!formData.phone) {
      Errors.phone = "phone number is required";
      isValid = false;
    } else if (!mobileRegex.test(formData.phone)) {
      Errors.phone = "please enter a valid mobile number";
      isValid = false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (!formData.email) {
      Errors.email = "email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      Errors.email = "please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      Errors.password = "Password is required ";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      Errors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else if (!formData.confirmPassword) {
      Errors.confirmPassword = "confirm password is required";
      isValid = false;
    }

    if (formData.preferences.length === 0) {
      Errors.preferences = "At least one preference must be selected";
      isValid = false;
    }

    if (!formData.dob) {
      Errors.dob = "dob is required";
      isValid = false;

      // } else {
      //   const dob = new Date(formData.dob);
      //   const today = new Date();
      //   const minAgeDate = new Date();
      //   minAgeDate.setFullYear(today.getFullYear() - 10);
      //   if (dob > today) {
      //     Errors.dob = "Date of birth cannot be in the future";
      //     isValid = false;
      //   } else if (dob > minAgeDate) {
      //     Errors.dob = "You must be at least 10 years old";
      //     isValid = false;
      //   }
    }

    setErrors(Errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(Register(formData)).unwrap();
        navigate("/");
      } catch (error) {
        toast.info(err?.message);
      }
    }
  };

  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate('/')
  //   } 
  // }, [])

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="rounded-lg shadow-lg max-w-md w-full p-6 bg-white">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  placeholder="First Name"
                  className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div>
              <PhoneInput
                country={"in"}
                value={formData.phone}
                autoComplete="new-password"
                inputStyle={{ width: "100%" }}
                onChange={(phone) => {
                  setFormData((prev) => ({ ...prev, phone }));
                  setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
                }}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
            <div>
              <label className="text-gray-500" htmlFor="dob">
                Dob
              </label>
              <input
                id="dob"
                type="date"
                name="dob"
                onChange={handleChange}
                placeholder="enter your dob"
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.dob && (
                <p className="text-red-500 text-xs">{errors.dob}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                autoComplete="new-password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Select Your Interests
              </p>
              <div className="grid grid-cols-3 gap-2">
                {preferences.map((preference) => (
                  <button
                    key={preference.id}
                    type="button"
                    onClick={() => handlePreferenceChange(preference.id)}
                    className={`relative p-2 rounded-md border text-sm ${
                      formData.preferences.includes(preference.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    } transition-colors duration-200`}
                  >
                    <div className="text-center">
                      <span className="text-lg block mb-1">
                        {preference.icon}
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        {preference.label}
                      </span>
                    </div>
                    {formData.preferences.includes(preference.id) && (
                      <CheckCircle className="absolute top-1 right-1 w-3 h-3 text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
              {errors.preferences && (
                <p className="text-red-500 text-xs">{errors.preferences}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
               {loading ? (
                <Loader2 className="animate-spin w-5 h-5 mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>
            <span>
              already have account??{" "}
              <Link to="/login">
                {" "}
                <span className="cursor-pointer text-blue-500 font-semibold">
                  sign in
                </span>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
