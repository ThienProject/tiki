import express from 'express';
import 'dotenv/config' ;
import innitAPIRoute from './route/api';
const app = express()
const port = process.env.PORT;
app.get('/', (req, res) => {
  res.send('Hello World! vs pham van thien');
})
innitAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})