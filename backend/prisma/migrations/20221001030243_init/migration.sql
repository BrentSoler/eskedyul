-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `Schedule_programId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_programId_fkey`;

-- AlterTable
ALTER TABLE `schedule` MODIFY `programId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `programId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `Schedule_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
