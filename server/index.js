const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const apartment = require("./api/apartment");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('It Work'));
app.use('/api/apartment', apartment);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 