import React, { useState } from "react";
import { axiosInstance } from "../constants/axiosInstance";
import { config } from "../constants/configurations";
import { useDispatch } from "react-redux";
import { updatePassword, updateProfile } from "../redux/action/userAction";
import { toast } from "react-toastify";

export const SecuritySection = () => {
  const dispatch=useDispatch()
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return "All fields are required.";
    }
   
    if (newPassword !== confirmPassword) {
      return "New password and confirm password do not match.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
     await dispatch(updatePassword(passwordForm)).unwrap()
     setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
     toast.success('updated successfully')
    } catch (error) {
      toast.error(error?.message)
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Change Password</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};
