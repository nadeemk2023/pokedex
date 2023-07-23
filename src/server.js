const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get(`api/pokemon/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.data;

    //Fetch the Shiny Sprite URL
    const shinyResponse = await axios.get(pokemon.sprites.front_shiny);
    const shinySpriteUrl = shinyResponse.data.sprites.front_default;

    //Add the Shiny Sprite URL to the Pokemon Data
    pokemon.sprites.front_shiny = shinySpriteUrl;
    res.json(pokemon);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Something went wrong with getting the data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
