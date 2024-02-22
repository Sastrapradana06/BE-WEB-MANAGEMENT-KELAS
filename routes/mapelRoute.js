const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')


router.post('/add-mapel', async (req, res) => {
  const {idUbah, mapel, jam, hari, nama_guru} = req.body
  try {
    if(idUbah) {
      await prisma.mapel.update({
        where: {
          id: idUbah
        },
        data: {mapel, jam, hari, nama_guru}
      });

      const dataMapel = await prisma.mapel.findMany();
      res.status(201).json({ status: true, message: '✨ Mapel Berhasil Diubah', data:dataMapel})
    } else {
      await prisma.mapel.create({
        data: {mapel, jam, hari, nama_guru}
      });

      const data = await prisma.mapel.findMany();
      res.status(201).json({ status: true, message: '🚀 Mapel Berhasil Ditambah', data})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/get-mapel', async (req, res) => {
  try {
    const dataMapel = await prisma.mapel.findMany();
    res.status(201).json({ status: true, message: 'Data Mapel', data: dataMapel})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/get-mapel/:id', async (req, res) => {
  const mapelId = req.params.id;
  try {
    const mapel = await prisma.mapel.findUnique({
      where: {
        id: parseInt(mapelId)
      }
    });

    res.status(201).json({ status: true, message: `Data Mapel ${mapel.mapel}`, data: mapel})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/delete-mapel/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const mapelDelete = await prisma.mapel.delete({
      where: {
        id: parseInt(id)
      }
    });
    const mapel = await prisma.mapel.findMany();
    res.status(201).json({ status: true, message: `${mapelDelete.mapel} Berhasil DiHapus`, data: mapel})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
  }
})


module.exports = router;