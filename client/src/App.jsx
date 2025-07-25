import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [name, setName] = useState('');
  const [names, setNames] = useState([]);

   // Fetch names on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/name`)
      .then(res => res.json())
      .then(data => setNames(data))
      .catch(err => console.error(err));
  }, []);


  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/name`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      // handle response if needed
      console.log(data);

      // Refresh names list
      const res = await fetch('https://personalised-image-scan.onrender.com/api/name');
      const updatedList = await res.json();
      setNames(updatedList);
      setName(''); // Clear input field after submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          <label htmlFor="name">Name:
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <input type="button" value="Submit" onClick={handleSubmit} />
        </p>
      </div>
      <h2>Saved Names:</h2>
      <ul>
        {names.map((n, index) => (
          <li key={index}>{n.name}</li>
        ))}
      </ul>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App
