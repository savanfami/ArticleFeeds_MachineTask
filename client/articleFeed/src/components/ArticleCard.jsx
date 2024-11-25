import { Ban, Heart, ThumbsDown } from 'lucide-react'
import React from 'react'

export const ArticleCard = ({article}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{article?.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article?.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-900">created - {article?.userId?.firstName}</span>
          <div className="flex gap-3">
            <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
              <Heart size={16} /> {article.likes}
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
              <ThumbsDown size={16} /> {article?.dislikes}
            </button>
            {/* <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
              <Ban size={16} /> {article.blocks}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

