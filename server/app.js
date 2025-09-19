const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); //use for cross origin requests

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})