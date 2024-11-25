import { Heart, ThumbsDown } from "lucide-react";
import React, { useState } from "react";
import { axiosInstance } from "../constants/axiosInstance";
import { config } from "../constants/configurations";

export const ArticlePopup = ({ article, onClose }) => {
  const [likes, setLikes] = useState(article.likes || 0);
  const [dislikes, setDislikes] = useState(article.dislikes || 0);
  const [userInteraction, setUserInteraction] = useState(
    article.userInteractions.find(
      (interaction) => interaction?.userId === article?.userId
    )?.type || null
  );

  const handleInteraction = async (type) => {
    if (userInteraction === type) return;

    try {
      const {data} = await axiosInstance.post(
        "/interact",
        {
          articleId: article._id,
          type,
        },
        config
      );
      setLikes(data?.data?.likes);
      setDislikes(data?.data?.dislikes);
      setUserInteraction(type);
    } catch (error) {
      console.error("Interaction failed", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
          <p className="text-gray-600 mb-6">{article.description}</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => handleInteraction("like")}
                className={`flex items-center gap-1 ${
                  userInteraction === "like" ? "text-red-500" : "text-gray-600"
                }`}
              >
                <Heart size={20} /> Like ({likes})
              </button>
              <button
                onClick={() => handleInteraction("dislike")}
                className={`flex items-center gap-1 ${
                  userInteraction === "dislike"
                    ? "text-gray-800"
                    : "text-gray-600"
                }`}
              >
                <ThumbsDown size={20} /> Dislike ({dislikes})
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
