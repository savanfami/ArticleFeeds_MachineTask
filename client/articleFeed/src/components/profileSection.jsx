import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios"; // Import axios for backend calls
import 'react-toastify/dist/ReactToastify.css';
import { format } from "date-fns";
import { axiosInstance } from "../constants/axiosInstance";
import { config } from "../constants/configurations";
import { fetchUserData, Logout, updateProfile } from "../redux/action/userAction";




export const ProfileSection = ({ data }) => {
  const dispatch = useDispatch();

  const formatDate = (date) => {
    if (!date) return ""; 
    return format(new Date(date), "yyyy-MM-dd");
  };

  const [profile, setProfile] = useState({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    phone: data.phone || "",
    dob: formatDate(data.dob) || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!profile.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!profile.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!profile.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profile.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!profile.phone.trim() ) {
      newErrors.phone = " phone number is required";
    }
    if (!profile.dob.trim()) newErrors.dob = "Date of Birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
     await dispatch(updateProfile(profile)).unwrap()
      toast.success("Profile updated successfully");
     await dispatch(fetchUserData()).unwrap()
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      const data = await dispatch(Logout()).unwrap();
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 mt-4 col-span-1 md:col-span-2"
          >
            Update Profile
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white rounded-md p-2 mt-4"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};
