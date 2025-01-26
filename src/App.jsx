import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/get/key");
      // const res = await fetch("https://trustbackend.onrender.com/api/get/key");
      const result = await res.json();
      if (result.isSuccess) {
        setData(result.keys);
      } else {
        setError("Failed to fetch data.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/key/delete/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.isSuccess) {
        fetchData();
        alert("Phrase deleted successfully.");
      } else {
        alert("Failed to delete the phrase.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the phrase.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="container">
        <h1 className="heading">Phrases List</h1>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && data.length > 0 && (
          <div className="grid">
            {data.map((item) => (
              <div key={item._id} className="card">
                <h2 className="card-title">Phrase</h2>
                <p className="card-text">{item.phrase}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="delete-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && data.length === 0 && (
          <p className="empty">No phrases found.</p>
        )}
      </section>
    </>
  );
}

export default App;
