const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma')

router.post('/add-kas', async (req, res) => {
  const {idUbah, user, jumlah, status, tanggal} = req.body
  try {
    if(idUbah) {
      const kas = await prisma.kas.findUnique({
        where: {
          id: parseInt(idUbah)
        }
      });
      const dataSaldo = await prisma.dataKelas.findMany();
      const convertJumlah = parseInt(jumlah)
      let newSaldo = 0

      if(status == 'Masuk') {
        newSaldo = dataSaldo[0].saldo_kas - kas.jumlah + convertJumlah
      } else {
        newSaldo = dataSaldo[0].saldo_kas + kas.jumlah - convertJumlah
      }

      if(newSaldo >= 0) {
        await prisma.kas.update({
          where: {
            id: idUbah
          },
          data: {user, jumlah: convertJumlah, tanggal}
        });
  
        const updateSaldoKas = await prisma.dataKelas.update({
          where : {
            id: 1
          },
          data: {
            saldo_kas: newSaldo,
          },
        })

        const dataKas = await prisma.kas.findMany();
        res.status(201).json({ status: true, message: '✨ Data Kas Berhasil Diubah', data:{dataKas, updateSaldoKas}})
      } else {
        res.status(401).json({ status: false, message: 'Gagal, Transaksi Melewati Jumlah Saldo' });
      }

    } else {
      const convertJumlah = parseInt(jumlah)
      const dataSaldo = await prisma.dataKelas.findMany();
      let newSaldoKas = ''

      if(status == 'Masuk') {
        newSaldoKas = dataSaldo[0].saldo_kas + convertJumlah
      } else {
        newSaldoKas = dataSaldo[0].saldo_kas - convertJumlah
      }


      if(newSaldoKas >= 0) {
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
        res.status(201).json({ status: true, message: `🚀 Transaksi ${status} Berhasil`, data:{dataKas, updateSaldoKas}})
      } else {
        res.status(401).json({ status: false, message: 'Gagal, Transaksi Melewati Jumlah Saldo' });
      }

 
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

router.get('/get-kas/:id', async (req, res) => {
  const kasId = req.params.id;
  try {
    const kas = await prisma.kas.findUnique({
      where: {
        id: parseInt(kasId)
      }
    });

    res.status(201).json({ status: true, message: `Data Kas`, data: kas})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  }
})

router.get('/delete-kas/:id', async (req, res) => {
  const id = req.params.id;
  try {

    const kasDelete = await prisma.kas.delete({
      where: {
        id: parseInt(id)
      }
    });

    const {status, jumlah} = kasDelete
    let newSaldo = 0

    if(status == 'Masuk') {
      const saldoKas = await prisma.dataKelas.findMany();
      newSaldo = saldoKas[0].saldo_kas - jumlah
    } else {
      const saldoKas = await prisma.dataKelas.findMany();
      newSaldo = saldoKas[0].saldo_kas + jumlah
    }

    const updateSaldoKas = await prisma.dataKelas.update({
      where : {
        id: 1
      },
      data: {
        saldo_kas: newSaldo,
      },
    })
    const kas = await prisma.kas.findMany();
    res.status(201).json({ status: true, message: `Transaksi ${status} Berhasil DiHapus`, data: {kas, updateSaldoKas}})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Maaf, Terjadi Kesalahan Teknis' });
  } finally {
    await prisma.$disconnect();
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
