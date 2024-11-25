import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/action/userAction";
import { useEffect, useState } from "react";
import { BookOpen, ChevronRight, Lock, User } from "lucide-react";
import { ProfileSection } from "../../components/profileSection";
import { SecuritySection } from "../../components/securitySection";
import { PreferenceSection } from "../../components/preferenceSection";
import { ArticleSection } from "../../components/articleSection";

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user); 
  useEffect(() => {
    dispatch(fetchUserData()).unwrap(); 
  }, [dispatch]);

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 p-3 w-full rounded-lg transition-colors ${
        activeTab === id
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      <ChevronRight size={20} className="ml-auto" />
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-blue-500">Loading...</div>
      </div>
    );
  }

  if (!user?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-500">Failed to load user data.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px]">
            <div className="p-6 border-r border-gray-200">
              <h2 className="text-xl font-bold mb-6">Settings</h2>
              <div className="space-y-2">
                <TabButton id="profile" label="Profile" icon={User} />
                <TabButton id="security" label="Security" icon={Lock} />
                <TabButton
                  id="preferences"
                  label="Preferences"
                  icon={BookOpen}
                />
                <TabButton id="articles" label="My Articles" icon={BookOpen} />
              </div>
            </div>

            <div className="col-span-3 p-6">
              {activeTab === "profile" && <ProfileSection data={user.data} />}
              {activeTab === "security" && <SecuritySection />}
              {activeTab === "preferences" && <PreferenceSection />}
              {activeTab === "articles" && <ArticleSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
