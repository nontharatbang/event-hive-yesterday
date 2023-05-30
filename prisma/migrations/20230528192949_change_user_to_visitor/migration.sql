/*
  Warnings:

  - You are about to drop the `_UserTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FollowedEvent" DROP CONSTRAINT "_FollowedEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_FollowedShop" DROP CONSTRAINT "_FollowedShop_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserTag" DROP CONSTRAINT "_UserTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTag" DROP CONSTRAINT "_UserTag_B_fkey";

-- DropTable
DROP TABLE "_UserTag";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VisitorTag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_email_key" ON "Visitor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_VisitorTag_AB_unique" ON "_VisitorTag"("A", "B");

-- CreateIndex
CREATE INDEX "_VisitorTag_B_index" ON "_VisitorTag"("B");

-- AddForeignKey
ALTER TABLE "_FollowedShop" ADD CONSTRAINT "_FollowedShop_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedEvent" ADD CONSTRAINT "_FollowedEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisitorTag" ADD CONSTRAINT "_VisitorTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VisitorTag" ADD CONSTRAINT "_VisitorTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
