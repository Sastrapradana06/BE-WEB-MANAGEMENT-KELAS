const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')

router.post('/add', async (req, res) => {
  const {idUbah, image, username, tanggal_lahir, email, notel, jabatan, nama_ortu, alamat, jekel} = req.body

  try {
    if(idUbah) {
      await prisma.siswa.update({
        where: {
          id: idUbah
        },
        data: {image, username, tanggal_lahir, email, notel, jabatan, nama_ortu, alamat, jekel}
      });
      const siswa = await prisma.siswa.findMany();
      res.status(201).json({ status: true, message: '✨ Siswa Berhasil Diubah', data:siswa})
    } else {
      const siswaByEmail = await prisma.siswa.findUnique({
        where: {
          email: email,
        },
      })
      
      if(!siswaByEmail) {
        const imgUser = image == '' ? (jekel === 'laki-laki' ? '/men-user.jfif' : '/women.jfif') : image;
        await prisma.siswa.create({
          data: {
              image: imgUser,
              username, 
              tanggal_lahir, 
              email, 
              notel, 
              jabatan, nama_ortu, 
              alamat,
              jekel
          }
        });
        const siswa = await prisma.siswa.findMany();
        await prisma.dataKelas.update({
          where : {
            id: 1
          },
          data: {
            jumlah_siswa: siswa.length,
          },
        })
        res.status(201).json({ status: true, message: '🚀 Siswa Berhasil Ditambah', data: siswa})
  
      } else {
        res.status(404).json({ status: false, message: 'Email Sudah Digunakan' });
      }
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
  }
})

router.get('/get', async (req, res) => {
  try {
    const siswa = await prisma.siswa.findMany();
    res.status(201).json({ status: true, message: 'Semua Data Siswa', data: siswa})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
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
  } finally {
    await prisma.$disconnect();
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
    const siswa = await prisma.siswa.findMany();
    await prisma.dataKelas.update({
      where : {
        id: 1
      },
      data: {
        jumlah_siswa: siswa.length,
      },
    })
    res.status(201).json({ status: true, message: `${siswaDelete.username} Berhasil DiHapus`, data: siswa})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
  }
})



module.exports = router;