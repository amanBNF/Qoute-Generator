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
    // fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-8 mb-10 flex flex-col items-center">
        {loading ? (
          <p className="text-lg text-gray-400">Loading quote...</p>
        ) : (
          <div className="text-center">
            <p className="text-2xl italic mb-4">"{quote.q}"</p>
            <p className="text-lg text-gray-300 text-right">— {quote.a}</p>
          </div>
        )}
        <button
          onClick={fetchData}
          className="mt-8 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          New Quote
        </button>
      </div>

      <form className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center">
        <textarea
          placeholder="Enter the quote"
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg mb-4 resize-none focus:outline-none focus:border-blue-500"
          rows={3}
        />
        <input
          type="text"
          placeholder="Enter the author"
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App