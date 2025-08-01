import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [file, setFile] = useState(null); // File for image upload

  // Fetch names on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/name`)
      .then(res => res.json())
      .then(data => setNames(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async () => {
    try {
      // 👉 First: Upload name
      const nameResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/name`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const nameData = await nameResponse.json();
      console.log('Name response:', nameData);

      // 👉 Second: Upload image if file is selected
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const imageResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/image/upload`, {
          method: 'POST',
          body: formData, // Don't set Content-Type manually
        });


        if (!imageResponse.ok) {
          const text = await imageResponse.text();
          throw new Error(`Image upload failed: ${text}`);
        }




        const imageData = await imageResponse.json();
        console.log('Image response:', imageData);
      }

      // Refresh names list
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/name`);
      const updatedList = await res.json();
      setNames(updatedList);

      // Clear form
      setName('');
      setFile(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div>
        <p>
          <label htmlFor="name">Name:
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="file">Upload File (optional):
            <input
              type="file"
              id="file"
              onChange={e => setFile(e.target.files[0])}
            />
          </label>
          <br />
          <input type="button" value="Submit" onClick={handleSubmit} />
        </p>
      </div>

      <h2>Saved Names:</h2>
      <ul>
        {names.map((n, index) => (
          <li key={index}>{n.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
