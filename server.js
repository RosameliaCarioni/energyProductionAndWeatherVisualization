const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static('.'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
