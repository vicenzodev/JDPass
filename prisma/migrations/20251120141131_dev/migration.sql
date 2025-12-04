/*
  Warnings:

  - Added the required column `last_senha` to the `Us` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obs` to the `Us` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sistema` to the `Us` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Us" ADD COLUMN     "last_senha" TEXT NOT NULL,
ADD COLUMN     "obs" TEXT NOT NULL,
ADD COLUMN     "sistema" TEXT NOT NULL;
