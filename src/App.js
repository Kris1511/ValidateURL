import React, { useState, useEffect, useRef } from 'react'
import './App.css';

function App() {

  const inputRef = useRef(null);

  const [url, setUrl] = useState("")

  const [data, setData] = useState("");

  const [error, setError] = useState("")

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  const handleValidateClick = (e, url) => {
    console.log('url: ', url);
    e.preventDefault();
    setData('');
    setError('')
    setLoading(false);

    if (url !== data) {
      fetch(url)
        .then((response) => {
          console.log("response", response);
          if (!response.ok) {
            throw new error('Network response was not Ok.');
          }
          return response.json();
        })
        .then((jsonData) => {
          console.log("jsondata", jsonData);
          setLoading(true)
          setData(JSON.stringify(jsonData));
        })
        .catch((error) => {
          setError(error.message)
        })
    } else {
      alert("Please enter your URL")
    }
  }

  return (
    <>
      <form className="form" >
        <input value={url} className='input' type='text' placeholder='Enter URL' name='text' ref={inputRef} onChange={handleChange} />
        <button className='button' onClick={(e) => handleValidateClick(e, url)}>Validate</button>
        {<div className='box-model'>
          {error && <p>Error{error}</p>}
          {!loading && <p>Loading.......</p>}
          {<p>{data}</p>}
        </div>}
      </form>
    </>
  );
}

export default App;
