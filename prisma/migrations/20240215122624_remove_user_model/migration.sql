/*
  Warnings:

  - You are about to drop the column `username` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `siswa` DROP COLUMN `username`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Authentication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jabatan` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
