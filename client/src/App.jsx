import React, { useEffect, useState } from 'react'

const App = () => {

  const [quote, setQuote] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true);
    fetch('http://localhost:5000/api/quote')
      .then(res => res.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="text-white p-6 flex flex-col items-center">
      {loading ? (
        <p>Loading quote...</p>
      ) : (
        <div className="max-w-xl text-center">
          <p className="text-xl italic">"{quote.q}"</p>
          <p className="mt-2 text-right">— {quote.a}</p>
        </div>
      )}

      {/* new quote button */}
      <button
        onClick={fetchData}
        className="mt-6 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
      >
        New Quote
      </button>
    </div>
  );
};

export default App