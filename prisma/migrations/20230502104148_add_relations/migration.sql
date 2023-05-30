/*
  Warnings:

  - You are about to drop the `_EventToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ShopToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ShopToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToTag" DROP CONSTRAINT "_EventToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTag" DROP CONSTRAINT "_EventToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToTag" DROP CONSTRAINT "_ShopToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToTag" DROP CONSTRAINT "_ShopToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToUser" DROP CONSTRAINT "_ShopToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToUser" DROP CONSTRAINT "_ShopToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagToUser" DROP CONSTRAINT "_TagToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToUser" DROP CONSTRAINT "_TagToUser_B_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "_EventToTag";

-- DropTable
DROP TABLE "_EventToUser";

-- DropTable
DROP TABLE "_ShopToTag";

-- DropTable
DROP TABLE "_ShopToUser";

-- DropTable
DROP TABLE "_TagToUser";

-- CreateTable
CREATE TABLE "_ShopTag" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FollowedShop" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTag" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FollowedEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserTag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ShopTag_AB_unique" ON "_ShopTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ShopTag_B_index" ON "_ShopTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FollowedShop_AB_unique" ON "_FollowedShop"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowedShop_B_index" ON "_FollowedShop"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTag_AB_unique" ON "_EventTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTag_B_index" ON "_EventTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FollowedEvent_AB_unique" ON "_FollowedEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowedEvent_B_index" ON "_FollowedEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTag_AB_unique" ON "_UserTag"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTag_B_index" ON "_UserTag"("B");

-- AddForeignKey
ALTER TABLE "_ShopTag" ADD CONSTRAINT "_ShopTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShopTag" ADD CONSTRAINT "_ShopTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedShop" ADD CONSTRAINT "_FollowedShop_A_fkey" FOREIGN KEY ("A") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedShop" ADD CONSTRAINT "_FollowedShop_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTag" ADD CONSTRAINT "_EventTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTag" ADD CONSTRAINT "_EventTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedEvent" ADD CONSTRAINT "_FollowedEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedEvent" ADD CONSTRAINT "_FollowedEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTag" ADD CONSTRAINT "_UserTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTag" ADD CONSTRAINT "_UserTag_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
