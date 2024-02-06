const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')

router.post('/add', async (req, res) => {
  const {idUbah, image, username, tanggal_lahir, email, notel, jabatan, nama_ortu, alamat} = req.body

  try {
    if(idUbah) {
      await prisma.siswa.update({
        where: {
          id: idUbah
        },
        data: {image, username, tanggal_lahir, email, notel, jabatan, nama_ortu, alamat}
      });
      res.status(201).json({ status: true, message: '🚀 Siswa Berhasil Diubah'})
    } else {
      const siswaByEmail = await prisma.siswa.findUnique({
        where: {
          email: email,
        },
      })
      
      if(!siswaByEmail) {
        await prisma.siswa.create({
          data: {
              image, 
              username, 
              tanggal_lahir, 
              email, 
              notel, 
              jabatan, nama_ortu, 
              alamat
          }
        });
        res.status(201).json({ status: true, message: '🚀 Siswa Berhasil Ditambah'})
  
      } else {
        res.status(404).json({ status: false, message: 'Email Sudah Digunakan' });
      }
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/get-siswa/:id', async (req, res) => {
  const siswaId = req.params.id;
  try {
    const siswa = await prisma.siswa.findUnique({
      where: {
        id: parseInt(siswaId)
      }
    });

    res.status(201).json({ status: true, message: 'Semua Data Siswa', data: siswa})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const siswaDelete = await prisma.siswa.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(201).json({ status: true, message: `🚀 ${siswaDelete.username} Berhasil DiHapus`})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
  }
})



module.exports = router;