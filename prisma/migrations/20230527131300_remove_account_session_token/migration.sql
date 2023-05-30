/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FollowedEvent" DROP CONSTRAINT "_FollowedEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_FollowedShop" DROP CONSTRAINT "_FollowedShop_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserTag" DROP CONSTRAINT "_UserTag_B_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "tiktok" TEXT;

-- AlterTable
ALTER TABLE "EventOrganizer" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "tiktok" TEXT;

-- AlterTable
ALTER TABLE "ShopOwner" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "email_verrified" TIMESTAMP(3),
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "_FollowedShop" ADD CONSTRAINT "_FollowedShop_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedEvent" ADD CONSTRAINT "_FollowedEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTag" ADD CONSTRAINT "_UserTag_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
