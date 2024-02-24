-- CreateTable
CREATE TABLE `Kas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
