import express from 'express';
import Bundler from 'parcel-bundler';

const PORT = 3000;
const app = express();
const bundler = new Bundler('index.html', { watch: true, cache: false });

app.use(express.static('./dist'));
app.use(bundler.middleware());

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
