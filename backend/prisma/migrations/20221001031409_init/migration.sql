/*
  Warnings:

  - Made the column `programId` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `programId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `Transaction_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
