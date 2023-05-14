-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `redeSocialId` VARCHAR(191) NULL,
    `celular` VARCHAR(191) NULL DEFAULT '(00) 0000-0000',
    `sobremim` VARCHAR(500) NULL,
    `data_nascimento` DATE NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_alteracao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    UNIQUE INDEX `usuario_redeSocialId_key`(`redeSocialId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
