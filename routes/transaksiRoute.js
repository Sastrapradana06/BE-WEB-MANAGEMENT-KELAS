const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')

router.post('/add-kas', async (req, res) => {
  const {idUbah, user, jumlah, status, tanggal} = req.body
  try {
    if(idUbah) {
      // await prisma.mapel.update({
      //   where: {
      //     id: idUbah
      //   },
      //   data: {mapel, jam, hari, nama_guru}
      // });

      // const dataMapel = await prisma.mapel.findMany();
      res.status(201).json({ status: true, message: '✨ Mapel Berhasil Diubah', data:dataMapel})
    } else {
      const convertJumlah = parseInt(jumlah)
      const dataSaldo = await prisma.dataKelas.findMany();
      let newSaldoKas = ''

      if(status == 'Masuk') {
        newSaldoKas = dataSaldo[0].saldo_kas + convertJumlah
      } else {
        newSaldoKas = dataSaldo[0].saldo_kas - convertJumlah
      }

      const updateSaldoKas = await prisma.dataKelas.update({
        where : {
          id: 1
        },
        data: {
          saldo_kas: newSaldoKas,
        },
      })

      await prisma.kas.create({
        data: {jumlah: convertJumlah, status, tanggal, user}
      });
      const dataKas = await prisma.kas.findMany();
      res.status(201).json({ status: true, message: '🚀 Transaksi Berhasil', data:{dataKas, updateSaldoKas}})
 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/get-kas', async (req, res) => {
  try {
    const dataKas = await prisma.kas.findMany();
    res.status(201).json({ status: true, message: 'Data Kas', data:dataKas})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/get-dataKelas', async (req, res) => {
  try {
    const data = await prisma.dataKelas.findMany();
    res.status(201).json({ status: true, message: 'Data Kelas', data})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})





module.exports = router;
