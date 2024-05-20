import React from 'react';
import { timeAgo } from './utils/date';
import '../styles/article.css'

const Article = ({ article, onArticleClick }) => {
    const publicationDate = article.pubDate;

    return (
        <div className="article">
            {article.mediaContent && (
                <img
                    src={article.mediaContent.url}
                    alt="Article Image"
                    onClick={() => onArticleClick(article.link)}
                    style={{ cursor: 'pointer' }}
                />
            )}
            <div className='article-content'>
                <h4 onClick={() => onArticleClick(article.link)} style={{ cursor: 'pointer' }}>{article.title}</h4>
                <p className="article-meta">
                    {article.author && (
                        <span className="article-author">{article.author}</span>
                    )}
                    <span className="article-date" style={{ marginLeft: article.author ? '15px' : '0' }}>
                        {timeAgo(publicationDate)}
                    </span>
                </p>
                <p className="article-source">
                    Source: {article.feedUrl}
                </p>
            </div>
        </div>
    );
};

export default Article;
