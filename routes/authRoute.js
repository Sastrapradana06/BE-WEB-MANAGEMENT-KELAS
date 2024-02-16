const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')
const {generateToken} = require('../utils/function')


router.post('/login', async (req, res) => {
  const {email, password} = req.body
  try {
    const siswaByEmail = await prisma.siswa.findUnique({
      where: {
        email: email,
      },
    })

    if(siswaByEmail) {
      const jabatan = siswaByEmail.jabatan.replace(/\s/g, '_')
      const getPassword = await prisma.authentication.findMany({
        where: {
          jabatan: jabatan,
        },
      })

      if(password == getPassword[0].password) {
        const token = generateToken(siswaByEmail.id)
        res.status(201).json({ status: true, message: '🚀 Login Successfully', token , data: siswaByEmail});
      } else {
        res.status(401).json({ status: false, message: 'Password Tidak Valid' });
      }

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


router.get('/get-auth', async  (req, res) => {
  try {
    const authUser = await prisma.authentication.findMany();
    res.status(200).json({ status: true, message: 'User Authentication', data: authUser})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.post('/set-auth/', async (req, res) => {
  const {id, value} = req.body;
  try {
    const editAuth = await prisma.authentication.update({
      where: {
        id: id
      },
      data: {password: value}
    });
    res.status(201).json({ status: true, message: `🚀 Kata Sandi ${editAuth.jabatan} Berhasil Diubah`, data: editAuth})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})


module.exports = router;