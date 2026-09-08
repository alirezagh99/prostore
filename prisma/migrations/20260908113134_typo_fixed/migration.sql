/*
  Warnings:

  - You are about to drop the column `paymentMethods` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "paymentMethods",
ADD COLUMN     "paymentMethod" TEXT;
