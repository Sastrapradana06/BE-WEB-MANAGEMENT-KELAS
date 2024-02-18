const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')

router.post('/add-guru', async (req, res) => {
  const {image, nama_guru, jekel, mapel, jadwal} = req.body
  try {
    const imgGuru = image == '' ? (jekel === 'laki-laki' ? '/men-teacher.jfif' : '/women-teacher.jfif') : image;
    await prisma.guru.create({
      data: {
          image: imgGuru,
          nama_guru, 
          jekel, 
          mapel, 
          jadwal, 
      }
    });
    const data = await prisma.guru.findMany();
    res.status(201).json({ status: true, message: '🚀 Guru Berhasil Ditambah', data})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

module.exports = router;