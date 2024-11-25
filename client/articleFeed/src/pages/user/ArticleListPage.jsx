import React, { useState } from 'react';
import { Bell, Settings, PlusCircle, Heart, ThumbsDown, Ban, Edit, Trash2 } from 'lucide-react';

export const Articles = () => {
//   const [articles, setArticles] = useState([
//     {
//       id: 1,
//       title: 'The Future of Space Exploration',
//       description: 'NASA announces new missions to explore Mars...',
//       category: 'space',
//       author: 'John Doe',
//       likes: 124,
//       dislikes: 12,
//       blocks: 2,
//       image: '/api/placeholder/400/200'
//     },
//     {
//       id: 2,
//       title: 'Latest Sports Updates',
//       description: 'Championship finals result in unexpected victory...',
//       category: 'sports',
//       author: 'Jane Smith',
//       likes: 89,
//       dislikes: 5,
//       blocks: 0,
//       image: '/api/placeholder/400/200'
//     }
//   ]);

//   const [selectedArticle, setSelectedArticle] = useState(null);

//   const ArticleCard = ({ article }) => (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <img 
//         src={article.image} 
//         alt={article.title} 
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
//         <p className="text-gray-600 mb-4">{article.description}</p>
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-500">By {article.author}</span>
//           <div className="flex gap-3">
//             <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
//               <Heart size={16} /> {article.likes}
//             </button>
//             <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
//               <ThumbsDown size={16} /> {article.dislikes}
//             </button>
//             <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
//               <Ban size={16} /> {article.blocks}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const ArticlePopup = ({ article, onClose }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <img 
//             src={article.image} 
//             alt={article.title} 
//             className="w-full h-64 object-cover rounded-lg mb-4"
//           />
//           <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
//           <p className="text-gray-600 mb-6">{article.description}</p>
//           <div className="flex justify-between items-center">
//             <div className="flex gap-4">
//               <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
//                 <Heart size={20} /> Like
//               </button>
//               <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
//                 <ThumbsDown size={20} /> Dislike
//               </button>
//               <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
//                 <Ban size={20} /> Block
//               </button>
//             </div>
//             <button 
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

  return (
    <div>
        list the articlse
    </div>
    // <div className="min-h-screen bg-gray-100">
    //   <nav className="bg-white shadow-sm">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="flex justify-between h-16">
    //         <div className="flex items-center">
    //           <h1 className="text-2xl font-bold text-gray-900">Article Feed</h1>
    //         </div>
    //         <div className="flex items-center gap-4">
    //           <button className="text-gray-600 hover:text-gray-900">
    //             <Bell size={24} />
    //           </button>
    //           <button className="text-gray-600 hover:text-gray-900">
    //             <Settings size={24} />
    //           </button>
    //           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
    //             <PlusCircle size={20} />
    //             New Article
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>

    //   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {articles.map(article => (
    //         <div 
    //           key={article.id} 
    //           onClick={() => setSelectedArticle(article)}
    //           className="cursor-pointer"
    //         >
    //           <ArticleCard article={article} />
    //         </div>
    //       ))}
    //     </div>
    //   </main>

    //   {selectedArticle && (
    //     <ArticlePopup 
    //       article={selectedArticle} 
    //       onClose={() => setSelectedArticle(null)} 
    //     />
    //   )}
    // </div>
  );
};

