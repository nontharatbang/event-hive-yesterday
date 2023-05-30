/*
  Warnings:

  - A unique constraint covering the columns `[eventOrganizerId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Made the column `eventOrganizerId` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventOrganizerId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "eventOrganizerId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventOrganizerId_key" ON "Event"("eventOrganizerId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventOrganizerId_fkey" FOREIGN KEY ("eventOrganizerId") REFERENCES "EventOrganizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
