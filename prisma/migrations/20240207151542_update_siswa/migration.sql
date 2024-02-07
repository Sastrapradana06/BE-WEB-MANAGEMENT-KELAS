/*
  Warnings:

  - Added the required column `jekel` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `siswa` ADD COLUMN `jekel` VARCHAR(191) NOT NULL DEFAULT 'unknown';
