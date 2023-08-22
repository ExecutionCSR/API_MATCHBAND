/*
  Warnings:

  - Made the column `dataStatus` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuarios` MODIFY `dataStatus` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
