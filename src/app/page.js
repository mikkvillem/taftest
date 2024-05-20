'use client';
import formatXMLData from '@/utils/formatXMLData';
import { useEffect } from 'react';
import styles from './page.module.css';
import { useState } from 'react';
import Article from './components/Article';
import CustomRSSFeedsComponent from './components/CustomRSSFeedsComponent';
import ArticleFilterComponent from './components/ArticleFilterComponent';
const defaultFeed = 'https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // to add feed: () => localStorage.setItem("feeds", [feedUrl, feedUrl2 etc])
  // https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
  const feedUrl = JSON.parse(localStorage.getItem('feeds')) || defaultFeed;

  useEffect(() => {
    fetchArticles(feedUrl).then((res) => {
      const formattedResponse = formatXMLData(res.data, feedUrl);
      return formattedResponse.then((data) => setArticles(data));
    });
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
  return (
    <main className={styles.main}>
      <CustomRSSFeedsComponent
        onSubmit={() => {
          /* add feed to localStorage */
        }}
        customFeeds={JSON.parse(localStorage.getItem('feeds')) || []}
        handleDeleteFeed={() => {
          /* remove feed from localStorage */
        }}
      />
      <ArticleFilterComponent
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      <div className="container">
        <div className="articles-container">
          {filteredArticles.map((article, index) => (
            <Article key={index} article={article} onArticleClick={() => {}} />
          ))}
        </div>
      </div>
    </main>
  );
}
