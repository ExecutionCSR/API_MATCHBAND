/*
  Warnings:

  - You are about to drop the column `data_alteracao` on the `usuarios` table. All the data in the column will be lost.
  - You are about to alter the column `senha` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `data_alteracao`,
    MODIFY `nome` VARCHAR(500) NOT NULL,
    MODIFY `email` VARCHAR(200) NOT NULL,
    MODIFY `senha` VARCHAR(8) NOT NULL;
