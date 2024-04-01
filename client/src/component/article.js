import React, { useState, useEffect } from "react";
import "./article.css"; // Import your custom CSS file

function ArticlesPage() {
    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=enterkey");
          const data = await response.json();
          // Filter out articles without valid titles or images
          const filteredArticles = data.articles.filter((article) => article.title && article.urlToImage);
          setArticles(filteredArticles);
        } catch (error) {
          console.error("Error fetching articles:", error);
          setArticles([]);
        }
      };
  
      fetchArticles();
    }, []);
  
    return (
      <div className="content-container">
        <div className="health-tips">
          <marquee behavior="scroll" direction="left">
            Did you know? Regular exercise improves mood and reduces stress!
          </marquee>
        </div>
        <h1 className="page-title">🌿 Health Articles 🌿</h1>
        <div className="article-container">
          {articles.map((article, index) => (
            <div key={index} className="article-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} />
              )}
              <div className="article-details">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-description">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* Health tips ticker */}
        <div className="health-tips">
          <marquee behavior="scroll" direction="left">
            Did you know? Regular exercise improves mood and reduces stress!
          </marquee>
        </div>
      </div>
    );
  }
  
export default ArticlesPage;  