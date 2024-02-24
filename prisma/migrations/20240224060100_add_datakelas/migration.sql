-- CreateTable
CREATE TABLE `DataKelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saldo_kas` INTEGER NOT NULL,
    `jumlah_siswa` INTEGER NOT NULL,
    `jumlah_guru` INTEGER NOT NULL,
    `jumlah_mapel` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
