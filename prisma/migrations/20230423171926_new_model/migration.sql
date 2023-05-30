/*
  Warnings:

  - You are about to drop the column `pic` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `EventOrganizer` table. All the data in the column will be lost.
  - You are about to drop the column `pic` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `ShopOwner` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `EventApplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventParticipation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavouriteEvents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavouriteShops` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `picture` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventApplication" DROP CONSTRAINT "EventApplication_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventApplication" DROP CONSTRAINT "EventApplication_shopId_fkey";

-- DropForeignKey
ALTER TABLE "EventParticipation" DROP CONSTRAINT "EventParticipation_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventParticipation" DROP CONSTRAINT "EventParticipation_shopId_fkey";

-- DropForeignKey
ALTER TABLE "FavouriteEvents" DROP CONSTRAINT "FavouriteEvents_shopId_fkey";

-- DropForeignKey
ALTER TABLE "FavouriteEvents" DROP CONSTRAINT "FavouriteEvents_userId_fkey";

-- DropForeignKey
ALTER TABLE "FavouriteShops" DROP CONSTRAINT "FavouriteShops_shopId_fkey";

-- DropForeignKey
ALTER TABLE "FavouriteShops" DROP CONSTRAINT "FavouriteShops_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "pic",
ADD COLUMN     "picture" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "EventOrganizer" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "pic",
ADD COLUMN     "picture" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "ShopOwner" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "EventApplication";

-- DropTable
DROP TABLE "EventParticipation";

-- DropTable
DROP TABLE "FavouriteEvents";

-- DropTable
DROP TABLE "FavouriteShops";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "_Application" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Participation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Application_AB_unique" ON "_Application"("A", "B");

-- CreateIndex
CREATE INDEX "_Application_B_index" ON "_Application"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Participation_AB_unique" ON "_Participation"("A", "B");

-- CreateIndex
CREATE INDEX "_Participation_B_index" ON "_Participation"("B");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Application" ADD CONSTRAINT "_Application_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Application" ADD CONSTRAINT "_Application_B_fkey" FOREIGN KEY ("B") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participation" ADD CONSTRAINT "_Participation_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participation" ADD CONSTRAINT "_Participation_B_fkey" FOREIGN KEY ("B") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
