/*
  Warnings:

  - Added the required column `createdBy` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
