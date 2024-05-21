'use client';

import formatXMLData from '@/utils/formatXMLData';
import { useEffect } from 'react';
import styles from './page.module.css';
import { useState } from 'react';
import Article from './components/Article';
import CustomRSSFeedsComponent from './components/CustomRSSFeedsComponent';
import ArticleFilterComponent from './components/ArticleFilterComponent';
import ModalComponent from './components/ModalComponent';

const defaultFeed = ['https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss'];

const fetchArticles = async (feedUrl) => {
  try {
    const response = await fetch('/api/articles?feedUrl=' + feedUrl);
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // to add feed: () => localStorage.setItem("feeds", [feedUrl, feedUrl2 etc])
  // https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/

  let feedUrls = defaultFeed;
  if (typeof window !== 'undefined') {
    feedUrls = localStorage.getItem('feeds')
      ? [...feedUrls, ...JSON.parse(localStorage.getItem('feeds'))]
      : defaultFeed;
  }

  useEffect(() => {
    try {
      feedUrls.forEach((feedUrl) => {
        fetchArticles(feedUrl).then((res) => {
          const formattedResponse = formatXMLData(res.data, feedUrl);
          return formattedResponse.then((data) =>
            setArticles((prev) => [...prev, ...data])
          );
        });
      });
    } catch (error) {
      console.log('error fetching feeds');
    } finally {
      setArticlesLoading(false);
    }
  }, []);

  const categories = articles.reduce((acc, article) => {
    article.categories.forEach((category) => {
      if (!acc.includes(category)) {
        acc.push(category);
      }
    });
    return acc;
  }, []);

  const filteredArticles = articles.filter((article) => {
    return (
      selectedCategories.length === 0 ||
      article.categories.some((category) =>
        selectedCategories.includes(category)
      )
    );
  });

  const handleFilterChange = (category) => {
    setSelectedCategories(category ? [category] : []);
  };

  const handleArticleClick = async (url) => {
    try {
      setIsModalOpen(true);
      const response = await fetch('/api/article?url=' + url);
      const responseJSON = await response.json();
      setModalContent(responseJSON.data);
    } catch (error) {
      console.error('Error fetching article content:', error);
      setIsModalOpen(false);
    }
  };

  if (articlesLoading === true)
    return <div className={styles.main}>...Loading Articles</div>;

  return (
    <main className={(styles.main, isModalOpen ? styles.scrollLock : '')}>
      <CustomRSSFeedsComponent
        onSubmit={(url) => {
          if (typeof window !== 'undefined') {
            const feedUrls = localStorage.getItem('feeds')
              ? JSON.parse(localStorage.getItem('feeds'))
              : defaultFeed;
            const newFeedUrls = [...feedUrls, url];
            return localStorage.setItem('feeds', JSON.stringify(newFeedUrls));
          }
          /* add feed to localStorage */
        }}
        customFeeds={/* JSON.parse(localStorage.getItem('feeds')) || */ []}
        handleDeleteFeed={() => {
          /* remove feed from localStorage */
        }}
      />
      <ArticleFilterComponent
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      <div className={styles.grid}>
        {filteredArticles.map((article, index) => {
          return (
            <Article
              key={index}
              article={article}
              onArticleClick={() => {
                handleArticleClick(article.link);
              }}
            />
          );
        })}
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
    </main>
  );
}
