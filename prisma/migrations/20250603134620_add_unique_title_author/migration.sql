/*
  Warnings:

  - You are about to drop the column `description` on the `book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,author,user_id]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `description`;

-- CreateIndex
CREATE UNIQUE INDEX `Book_title_author_user_id_key` ON `Book`(`title`, `author`, `user_id`);
