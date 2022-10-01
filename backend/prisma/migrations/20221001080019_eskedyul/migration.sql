-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_scheduleId_fkey`;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `Transaction_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `schedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
