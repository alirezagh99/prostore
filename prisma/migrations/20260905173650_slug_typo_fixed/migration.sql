/*
  Warnings:

  - You are about to drop the column `Slug` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "product_slug_index";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Slug",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_index" ON "Product"("slug");
