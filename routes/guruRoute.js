const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')

router.post('/add-guru', async (req, res) => {
  const {idUbah, image, nama_guru, jekel, mapel, jadwal} = req.body
  try {
    if(idUbah) {
      const imgGuru = (jekel === 'laki-laki' ? '/men-teacher.jfif' : '/women-teacher.jfif');
      await prisma.guru.update({
        where: {
          id: idUbah
        },
        data: {image: imgGuru, nama_guru, jekel, mapel, jadwal}
      });
      const guru = await prisma.guru.findMany();
      res.status(201).json({ status: true, message: '✨ Guru Berhasil Diubah', data:guru})
    } else {
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
      await prisma.dataKelas.update({
        where : {
          id: 1
        },
        data: {
          jumlah_guru: data.length,
        },
      })
      res.status(201).json({ status: true, message: '🚀 Guru Berhasil Ditambah', data})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
  }
})

router.get('/get-guru', async (req, res) => {
  try {
    const dataGuru = await prisma.guru.findMany();
    res.status(201).json({ status: true, message: 'Data Guru', data: dataGuru})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
  }
})

router.get('/get-guru/:id', async (req, res) => {
  const guruId = req.params.id;
  try {
    const guru = await prisma.guru.findUnique({
      where: {
        id: parseInt(guruId)
      }
    });

    res.status(201).json({ status: true, message: `Data Guru ${guru.nama_guru}`, data: guru})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
  }
})

router.get('/delete-guru/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const guruDelete = await prisma.guru.delete({
      where: {
        id: parseInt(id)
      }
    });
    const guru = await prisma.guru.findMany();
    await prisma.dataKelas.update({
      where : {
        id: 1
      },
      data: {
        jumlah_guru: guru.length,
      },
    })
    res.status(201).json({ status: true, message: `${guruDelete.nama_guru} Berhasil DiHapus`, data: guru})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
  }
})

module.exports = router;