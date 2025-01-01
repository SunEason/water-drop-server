-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "account" TEXT,
    "avatar" TEXT,
    "code" TEXT,
    "desc" TEXT,
    "codeCreateTime" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "account" TEXT,
    "avatar" TEXT,
    "code" TEXT,
    "desc" TEXT,
    "codeCreateTime" TIMESTAMP(3),

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

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
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "remark" TEXT,
    "frontOrgId" TEXT,
    "roomOrgId" TEXT,
    "otherOrgId" TEXT,

    CONSTRAINT "OrgImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_tel_key" ON "User"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "Student_tel_key" ON "Student"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_tel_key" ON "Organization"("tel");

-- CreateIndex
CREATE INDEX "Organization_deleted_at_idx" ON "Organization"("deleted_at");

-- AddForeignKey
ALTER TABLE "OrgImage" ADD CONSTRAINT "OrgImage_frontOrgId_fkey" FOREIGN KEY ("frontOrgId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgImage" ADD CONSTRAINT "OrgImage_roomOrgId_fkey" FOREIGN KEY ("roomOrgId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgImage" ADD CONSTRAINT "OrgImage_otherOrgId_fkey" FOREIGN KEY ("otherOrgId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
