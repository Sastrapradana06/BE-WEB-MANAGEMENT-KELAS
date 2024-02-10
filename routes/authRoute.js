const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')
const {generateToken} = require('../utils/function')



router.post('/login', async (req, res) => {
  const {email} = req.body
  try {
    const siswaByEmail = await prisma.siswa.findUnique({
      where: {
        email: email,
      },
    })

    if(siswaByEmail) {
      const token = generateToken(siswaByEmail.id)
      res.status(201).json({ status: true, message: '🚀 Login Successfully', token , data: siswaByEmail});
    } else {
      res.status(401).json({ status: false, message: 'Email Tidak Valid' });
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/get-user/:id', async (req, res) => {
  const siswaId = req.params.id;
  try {
    const siswa = await prisma.siswa.findUnique({
      where: {
        id: parseInt(siswaId)
      }
    });

    if(siswa) {
      res.status(201).json({ status: true, message: 'User Login', data: siswa})
    } else {
      res.status(404).json({ status: false, message: 'User Login', data: null})
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

module.exports = router;