/*
  Warnings:

  - Made the column `tel` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "code" TEXT,
ALTER COLUMN "tel" SET NOT NULL;
