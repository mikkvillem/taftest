import React from 'react';
import { timeAgo } from './utils/date';
import '../styles/article.css';

const Article = ({ article, onArticleClick }) => {
  const publicationDate = article.pubDate;
  console.log(article);
  return (
    <div className="article">
      <div className="article-categories">
        {article?.categories?.map((category) => {
          if (!category) return;
          return <div>{category}</div>;
        })}
      </div>
      {article.mediaContent && (
        <img
          src={article.mediaContent.url}
          alt="Article Image"
          onClick={() => onArticleClick(article.link)}
          style={{ cursor: 'pointer' }}
        />
      )}
      <div className="article-content">
        <h4
          onClick={() => onArticleClick(article.link)}
          style={{ cursor: 'pointer' }}>
          {article.title}
        </h4>
        <p className="article-meta">
          {article.author && (
            <span className="article-author">{article.author}</span>
          )}
          <span
            className="article-date"
            style={{ marginLeft: article.author ? '15px' : '0' }}>
            {timeAgo(publicationDate)}
          </span>
        </p>
        <p className="article-source">Source: {article.feedUrl}</p>
      </div>
    </div>
  );
};

export default Article;
