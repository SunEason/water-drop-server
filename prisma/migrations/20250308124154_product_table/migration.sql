-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('UN_LIST', 'LIST');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "deleted_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "type" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'UN_LIST',
    "stock" INTEGER NOT NULL DEFAULT 0,
    "curStock" INTEGER NOT NULL DEFAULT 0,
    "buyNumber" INTEGER NOT NULL DEFAULT 0,
    "limitBuyNumber" INTEGER NOT NULL DEFAULT -1,
    "coverUrl" TEXT,
    "bannerUrl" TEXT,
    "originalPrice" DOUBLE PRECISION NOT NULL,
    "preferentialPrice" DOUBLE PRECISION NOT NULL,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Product_deleted_at_idx" ON "Product"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToProduct_AB_unique" ON "_CardToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToProduct_B_index" ON "_CardToProduct"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToProduct" ADD CONSTRAINT "_CardToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToProduct" ADD CONSTRAINT "_CardToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
