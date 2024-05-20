import { parseStringPromise } from 'xml2js';

const formatXMLData = async (xmlData, feedUrl) => {
  const xmlString = await parseStringPromise(xmlData);
  return xmlString.rss.channel[0].item.map((item) => {
    const categories = item.category ? item.category.map((cat) => cat._) : [];
    let author = 'Unknown';

    if (item.author) {
      author = item.author[0];
    } else if (item['dc:creator']) {
      author = item['dc:creator'][0];
    } else if (item['creator']) {
      author = item['creator'][0];
    }

    return {
      title: item.title[0],
      link: item.link[0],
      pubDate: new Date(item.pubDate[0]),
      description: item.description[0],
      author: author,
      mediaContent: item['media:content'] ? item['media:content'][0].$ : null,
      categories: categories,
      feedUrl: feedUrl,
    };
  });
};

// Sort articles by publication date (newest first)

export default formatXMLData;
