import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../constants/axiosInstance";
import { config } from "../../constants/configurations";
import { ArticleCard } from "../../components/ArticleCard";
import { ArticlePopup } from "../../components/ArticlePopup";
import Lootie from 'lottie-react'
import Animation from '../../assets/lottieFiles/Animation - 1728127355120.json'

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading,setLoading]=useState(true)
  const [selectedArticle, setSelectedArticle] = useState(null);

  const fetchArticleByPreference = async () => {
    try {
      const { data } = await axiosInstance.get("/articlepreference", config);
      if (data) {
        setArticles(data?.data);
      }
      setLoading(false)
      console.log(articles, "aticles from the state");
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchArticleByPreference();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <p></p>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="cursor-pointer"
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <Lootie height={200} width={200} animationData={Animation} />
          </div>
        )}
      </main>
      {selectedArticle && (
        <ArticlePopup
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};
