-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "businessLicense" TEXT NOT NULL,
    "identityCardFrontImg" TEXT NOT NULL,
    "identityCardBackImg" TEXT NOT NULL,
    "tags" TEXT,
    "description" TEXT,
    "name" TEXT,
    "logo" TEXT,
    "address" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "tel" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "remark" TEXT,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_tel_key" ON "Organization"("tel");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
