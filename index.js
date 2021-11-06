const app = require('./src/app');

const port = 5000;
if (!port) {
  console.log('No port provided');
  return;
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
