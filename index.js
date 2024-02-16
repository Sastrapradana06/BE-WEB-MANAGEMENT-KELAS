const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// routes
const siswaRoute = require('./routes/siswaRoute')
const authRoute = require('./routes/authRoute')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/auth', authRoute)
app.use('/siswa', siswaRoute)



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});