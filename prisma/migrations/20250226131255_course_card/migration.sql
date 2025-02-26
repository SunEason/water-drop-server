-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('TIME', 'DURATION');

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "deleted_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "type" "CardType" NOT NULL DEFAULT 'TIME',
    "times" INTEGER DEFAULT 0,
    "duration" INTEGER DEFAULT 0,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Card_deleted_at_idx" ON "Card"("deleted_at");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
