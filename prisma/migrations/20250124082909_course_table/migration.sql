-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "baseAbility" TEXT NOT NULL,
    "limitNumber" INTEGER NOT NULL,
    "desc" TEXT,
    "reserveInfo" TEXT,
    "refundInfo" TEXT,
    "otherInfo" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Course_deleted_at_idx" ON "Course"("deleted_at");
