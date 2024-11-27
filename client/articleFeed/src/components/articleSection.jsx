import React, { useEffect, useState } from "react";
import { Plus, X, Edit2, Trash2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../constants/axiosInstance";
import { CreateArticle } from "../redux/action/articeAction";
import { config } from "../constants/configurations";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";

export const ArticleSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    references: "",
    tags: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const fetchArticles = async () => {
    try {
      const { data } = await axiosInstance.get("/article", config);
      if (data) {
        setArticleData(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const allPreferences = [
    { id: "sports", label: "Sports", icon: "⚽" },
    { id: "entertainment", label: "Entertainment", icon: "🎬" },
    { id: "politics", label: "Politics", icon: "📰" },
    { id: "tech", label: "Tech", icon: "💻" },
    { id: "health", label: "Health", icon: "🏥" },
    { id: "food", label: "Food", icon: "🍳" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || formData.title.trim() === "")
      newErrors.title = "Title is required";
    if (!formData.description || formData.description.trim() === "")
      newErrors.description = "Description is required";
    if (!formData.references) newErrors.references = "Please select a category";
    if (!formData.tags || formData.tags.trim() === "")
      newErrors.tags = "tags is required";
    if (!formData.imageUrl) newErrors.image = "Image upload is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        const { data } = await axiosInstance.put(
          `/article/${editingId}`,
          formData,
          config
        );
        if (data) {
          setIsModalOpen(false);
        }
      } else {
        await dispatch(CreateArticle(formData)).unwrap();
      }
      setIsModalOpen(false);
      resetForm();
      fetchArticles();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };


  const handleEdit = (article) => {
    setIsEditing(true);
    setEditingId(article._id);
    setFormData({
      title: article.title,
      description: article.description,
      references: article.references,
      tags: article.tags,
      imageUrl: article.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/article/${id}`, config);
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      references: "",
      tags: "",
      imageUrl: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, imageUrl: res }));
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">My Articles</h3>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articleData.map((article) => (
          <div
            key={article._id}
            className="border rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-2">{article.title}</h4>
              <p className="text-gray-600 text-sm mb-2">
                {article.description.substring(0, 100)}...
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {article.references}
                </span>
                {article.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded"
                  >
                    {tag.trim()}
                  </span>
                ))}
              <ThumbsUp size={16} /> {article?.likes}
              <ThumbsDown size={16} /> {article?.dislikes}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleEdit(article)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full m-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">
                {isEditing ? "Edit Article" : "Create New Article"}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                  className="mt-1 block w-full border p-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {allPreferences.map((pref) => (
                    <option key={pref.id} value={pref.id}>
                      {pref.icon} {pref.label}
                    </option>
                  ))}
                </select>
                {errors.references && (
                  <p className="text-red-500 text-sm">{errors.references}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Separate tags with commas"
                  className="mt-1 block w-full border p-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="mt-1 block w-full"
                />
                {formData.imageUrl && (
                  <div className="mt-4">
                    <img
                      src={formData.imageUrl}
                      alt="Image preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
                {uploading && <p>Uploading...</p>}
                {/* {formData.imageUrl && (
                  <p className="text-green-500 text-sm">Image uploaded!</p>
                )} */}
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isEditing ? "Save Changes" : "Create Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
