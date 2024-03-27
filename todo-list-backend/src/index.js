const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectToMongo();

app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/todos',require('./routes/todos.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});