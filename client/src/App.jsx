import React, { useEffect, useState } from 'react'

const App = () => {

  const [quote, setQuote] = useState('')
  const [loading, setLoading] = useState(true)
  const [newQuote, setNewQuote] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [customQuotes, setCustomQuotes] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/getQuote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: newQuote, a: newAuthor })
    })
      .then(res => res.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
        alert('Quote added successfully!');
        setNewAuthor('');
        setNewQuote('');

        fetchCustomQuotes();
      })
      .catch(() => setLoading(false));
  }

  const handleDelete = (index) => {
    fetch(`http://localhost:5000/api/getQuote/${index}`, {
      method: 'DELETE',
  })
  .then((res) => res.json())
  .then(() => {
    fetchCustomQuotes();
  })
  .catch((err) => console.error('Error deleting quote:', err));
}

  const fetchCustomQuotes = () => {
    fetch('http://localhost:5000/api/getQuote')
      .then(res => res.json())
      .then(data => setCustomQuotes(data))
  }

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
    fetchCustomQuotes();
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

      <form className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center"
        onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter the quote"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg mb-4 resize-none focus:outline-none focus:border-blue-500"
          rows={3}
        />
        <input
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          placeholder="Enter the author"
          className="w-full border border-gray-600 bg-gray-900 text-white p-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Submit
        </button>
      </form>

      <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-8 mt-10">
        {customQuotes.length == 0 ? (
          <p className="text-lg text-gray-400 mt-10">No custom quotes added yet.</p>
        ) : (
          <ul>
            {customQuotes.map((q, index) => (
              // 🔹 CHANGE 4: Added parentheses in map return to actually render list items
              <li key={index} className="mt-4 border-b border-gray-700 pb-4">
                <p className="text-xl italic">"{q.q}"</p>
                <p className="text-md text-gray-300 text-right">— {q.a}</p>
                <button onClick={() => handleDelete(index)} className='text-right text-sm border-2 text-white border-red-500 rounded-2xl py-2 px-3 cursor-pointer hover:bg-red-600 hover:text-black'>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App