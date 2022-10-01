-- AlterTable
ALTER TABLE `users` ADD COLUMN `email` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;
