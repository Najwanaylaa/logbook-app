-- CreateEnum
CREATE TYPE "ProductCode" AS ENUM ('XEBJ3', 'XEGM1');

-- CreateEnum
CREATE TYPE "IBCNumber" AS ENUM ('IBC1', 'IBC2', 'IBC3');

-- CreateTable
CREATE TABLE "LogbookTipping" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "productCode" "ProductCode" NOT NULL,
    "quantityTarget" DOUBLE PRECISION NOT NULL,
    "rawMaterialName" TEXT NOT NULL DEFAULT 'Minor',
    "batchNumber" TEXT NOT NULL,
    "ibcNumber" "IBCNumber" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "yield" DOUBLE PRECISION NOT NULL,
    "operator" TEXT NOT NULL,

    CONSTRAINT "LogbookTipping_pkey" PRIMARY KEY ("id")
);
