/*
  Warnings:

  - Added the required column `userId` to the `Residents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `residents` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Residents` ADD CONSTRAINT `Residents_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
