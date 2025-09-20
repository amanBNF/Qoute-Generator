const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); //use for cross origin requests

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let customQuotes = [];

//routes
app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    res.json({
      q: response.data[0].q,
      a: response.data[0].a
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

app.delete('/api/getQuote/:index', (req,res) => {
  const {index} = req.params;

  if(index < 0 || index >= customQuotes.length){
    res.status(400).json({error: 'Invalid index'});
  }

  const deletedQuote = customQuotes.splice(index,1);

  res.json({message: 'Quote deleted successfully', deletedQuote});
})

app.get('/api/getQuote', (req, res) => {
  res.json(customQuotes);
});

app.post('/api/getQuote', (req, res) => {
  const {q, a} = req.body;

  if(!q || !a) {
    res.status(400).json({error: 'Quote and Author are required'});
  }

  const newQuote = {q,a};
  customQuotes.push(newQuote);

  res.status(201).json(newQuote);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})