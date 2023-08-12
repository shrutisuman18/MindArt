import React, { useState } from 'react';
import axios from 'axios';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('small');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/generator`, { prompt, size });
      setImageUrl(response.data.data);
      setError('');
    } catch (error) {
      setError(error.message);
      setImageUrl('');
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            id="text"
            type="text"
            placeholder='Enter the text..'
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
    
          <select value={size} onChange={(event) => setSize(event.target.value)} >
            <option value="small">Small</option>
            <option  value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <div className="btnarea">
        <button type="submit" id ="btn">Generate</button>
        </div>
        <div className="frame">
        {imageUrl && <img src={imageUrl} alt="Generated Image" />}
      {error && <p>{error}</p>}</div>
      </form>
  
    </div>
  );
}

export default ImageGenerator;