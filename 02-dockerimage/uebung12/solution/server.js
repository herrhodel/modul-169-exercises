const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World! This is a simple Node.js web server using Express.js.');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
