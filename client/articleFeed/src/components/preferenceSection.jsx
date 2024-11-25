import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../constants/axiosInstance";
import { config } from "../constants/configurations";
import { toast } from "react-toastify";
import { fetchUserData } from "../redux/action/userAction";

export const PreferenceSection = () => {
  const dispatch = useDispatch();
  const {
    user: { data },
  } = useSelector((state) => state.user);
  const [selectedPrefs, setSelectedPrefs] = useState(data?.preferences || []);

  const preferences = [
    { id: "sports", label: "Sports", icon: "⚽" },
    { id: "entertainment", label: "Entertainment", icon: "🎬" },
    { id: "politics", label: "Politics", icon: "📰" },
    { id: "tech", label: "Tech", icon: "💻" },
    { id: "health", label: "Health", icon: "🏥" },
    { id: "food", label: "Food", icon: "🍳" },
  ];

  const handlePreferenceChange = (preferenceId) => {
    let newPreferences;
    if (selectedPrefs.includes(preferenceId)) {
      newPreferences = selectedPrefs.filter((id) => id !== preferenceId);
    } else {
      newPreferences = [...selectedPrefs, preferenceId];
    }
    setSelectedPrefs(newPreferences);
  };

  const updatePreference = async () => {
    try {
      if(selectedPrefs.length<1){
        toast.warning('at least one preference must be selected')
        return
      }
      const {data} = await axiosInstance.patch("/updatepreference",{data:selectedPrefs}, config);
      if(data){
        toast.success(data?.message)
        await dispatch(fetchUserData()).unwrap()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-medium mb-4">Content Preferences</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select your preferred content categories. You currently have{" "}
          {selectedPrefs.length} preferences selected.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {preferences.map(({ id, label, icon }) => {
            const isSelected = selectedPrefs.includes(id);

            return (
              <label
                key={id}
                className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handlePreferenceChange(id)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xl">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
                {isSelected && (
                  <span className="ml-auto text-xs text-blue-600">
                    Selected
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
      <button
        className="bg-blue-600 p-2 rounded-md text-white"
        onClick={updatePreference}
      >
        {" "}
        update preference
      </button>
      {selectedPrefs.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Your Selected Preferences:
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedPrefs.map((prefId) => {
              const pref = preferences.find((p) => p.id === prefId);
              return (
                <span
                  key={prefId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                >
                  {pref?.icon} {pref?.label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
