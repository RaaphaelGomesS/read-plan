/*
  Warnings:

  - You are about to alter the column `pages` on the `book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `pages` INTEGER NOT NULL,
    MODIFY `img` VARCHAR(191) NULL;
