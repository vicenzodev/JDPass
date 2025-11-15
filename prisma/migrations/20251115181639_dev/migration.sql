/*
  Warnings:

  - You are about to drop the `Requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `US` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UTA` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Logs" DROP CONSTRAINT "Logs_utaId_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_rqstUtaId_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_utaId_fkey";

-- DropForeignKey
ALTER TABLE "US" DROP CONSTRAINT "US_utaId_fkey";

-- DropTable
DROP TABLE "Requests";

-- DropTable
DROP TABLE "US";

-- DropTable
DROP TABLE "UTA";

-- CreateTable
CREATE TABLE "Uta" (
    "id" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Uta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Us" (
    "id" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "senhas" TEXT NOT NULL,
    "last_change" TIMESTAMP(3) NOT NULL,
    "exp_date" TIMESTAMP(3) NOT NULL,
    "utaId" INTEGER NOT NULL,

    CONSTRAINT "Us_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Uta_email_key" ON "Uta"("email");

-- AddForeignKey
ALTER TABLE "Us" ADD CONSTRAINT "Us_utaId_fkey" FOREIGN KEY ("utaId") REFERENCES "Uta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_utaId_fkey" FOREIGN KEY ("utaId") REFERENCES "Uta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
