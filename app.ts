const express = require('express')
const app = express()
const port = 3000

import en from './routes/en';

app.use('/', en);
app.use('/word', en);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})