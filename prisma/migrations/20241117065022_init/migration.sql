-- AlterTable
ALTER TABLE "User" ADD COLUMN     "codeCreateTime" TIMESTAMP(3),
ALTER COLUMN "account" DROP NOT NULL;
