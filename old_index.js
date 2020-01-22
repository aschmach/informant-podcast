// require('rootpath')();
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/error-handler');

const {links} = require('./svc');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes

app.use(errorHandler);

app.post('/links', trigger);

// TODO add validation
// https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/

async function trigger (req, res, next) {
  const {sourceUrl} = req.body
  console.log({sourceUrl})
  const response = await links(sourceUrl)
  res.send(response)
}

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8081;
const server = app.listen(port, function () {
    console.log('Links server listening on port ' + port);
});