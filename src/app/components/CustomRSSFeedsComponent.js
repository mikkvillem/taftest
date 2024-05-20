import React, { useState } from 'react';
import '../styles/customRSSFeeds.css'

const CustomRSSFeedsComponent = ({ onSubmit, customFeeds, handleDeleteFeed }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(url);
        setUrl('');
    };

    return (
        <div className="custom-feeds-section">
            <h2>Add Custom RSS Feed</h2>
            <form className="add-feed-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    placeholder="Enter RSS feed URL" 
                    required 
                />
                <button type="submit">Add Feed</button>
            </form>
            <ul>
                {customFeeds.map((feed, index) => (
                    <li key={index}>
                        {feed}
                        <button className="delete-button" onClick={() => handleDeleteFeed(feed)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomRSSFeedsComponent;
