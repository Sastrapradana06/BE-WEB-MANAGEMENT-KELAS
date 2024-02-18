-- AlterTable
ALTER TABLE `siswa` ALTER COLUMN `username` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Guru` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `nama_guru` VARCHAR(191) NOT NULL,
    `jekel` VARCHAR(191) NOT NULL,
    `mapel` VARCHAR(191) NOT NULL,
    `jadwal` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
