const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')

router.post('/add', async (req, res) => {
  const {image, username, tanggal_lahir, email, notel, jabatan, nama_ortu, alamat} = req.body

  try {
    const siswaByEmail = await prisma.siswa.findUnique({
      where: {
        email: email,
      },
    })
    console.log({siswaByEmail});

    if(!siswaByEmail) {
      await  prisma.siswa.create({
        data: {
            image, 
            username, 
            tanggal_lahir, 
            email, 
            notel: parseInt(notel), 
            jabatan, nama_ortu, 
            alamat
        }
      });
      res.status(201).json({ status: true, message: '🚀 Siswa Berhasil Ditambah'})
    } else {
      res.status(404).json({ status: false, message: 'Email Sudah Digunakan' });
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/get', async (req, res) => {
  try {
    const siswa = await prisma.siswa.findMany();
    res.status(201).json({ status: true, message: 'Semua Data Siswa', data: siswa})
    console.log({siswa});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})



module.exports = router;