-- CreateTable
CREATE TABLE `Mapel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mapel` VARCHAR(191) NOT NULL,
    `jam` VARCHAR(191) NOT NULL,
    `hari` VARCHAR(191) NOT NULL,
    `nama_guru` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
