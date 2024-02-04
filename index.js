const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');
const {generateToken} = require('./utils/function')


const prisma = require('./libs/prisma');
const prisma2 = new PrismaClient();
const cors = require('cors');

// routes
const siswaRoute = require('./routes/siswaRoute')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/auth/login', async (req, res) => {
  const {email, password} = req.body
  try {
    const userByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    console.log({userByEmail});

    if(userByEmail) {
      if(password == userByEmail.password) {
        const token = generateToken(userByEmail.id)
        res.status(201).json({ status: true, message: '🚀 Login Successfully', token });
      } else {
        res.status(404).json({ status: false, message: 'Password Tidak Valid' });
      }
    } else {
      res.status(401).json({ status: false, message: 'Email Tidak Valid' });
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
});

app.use('/siswa', siswaRoute)



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});