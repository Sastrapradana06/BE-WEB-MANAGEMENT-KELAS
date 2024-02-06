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

module.exports = router;