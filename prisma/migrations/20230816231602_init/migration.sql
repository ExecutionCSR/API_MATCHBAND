/*
  Warnings:

  - You are about to drop the column `data_criacao` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `data_nascimento` on the `usuarios` table. All the data in the column will be lost.
  - You are about to alter the column `redeSocialId` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - Added the required column `codigoUsuario` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `data_criacao`,
    DROP COLUMN `data_nascimento`,
    ADD COLUMN `codigoUsuario` VARCHAR(45) NOT NULL,
    ADD COLUMN `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dataNascimento` DATE NULL,
    ADD COLUMN `dataStatus` DATE NULL,
    ADD COLUMN `status` INTEGER NOT NULL,
    MODIFY `redeSocialId` VARCHAR(45) NULL;

-- CreateTable
CREATE TABLE `usuario_arquivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idPostagemComentario` INTEGER NOT NULL,
    `idChatMensagem` INTEGER NOT NULL,
    `idPostagem` INTEGER NOT NULL,
    `dataArquivo` DATETIME(3) NOT NULL,
    `arquivo` MEDIUMBLOB NOT NULL,
    `status` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idPerfil` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `descricao` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_solicitacao_amizade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idUsuarioSolicitante` INTEGER NOT NULL,
    `mensagem` VARCHAR(200) NOT NULL,
    `dataSolicitacao` DATE NOT NULL,
    `status` INTEGER NOT NULL,
    `dataStatus` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `conteudo` VARCHAR(500) NOT NULL,
    `likes` INTEGER NULL DEFAULT 0,
    `compartilhamento` INTEGER NULL DEFAULT 0,
    `ameis` INTEGER NULL,
    `links` VARCHAR(100) NULL,
    `tags` VARCHAR(100) NULL,
    `dataPostagem` DATETIME(3) NOT NULL,
    `status` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postagem_interacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPostagem` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `tipo` INTEGER NOT NULL,
    `dataInteracao` DATETIME(3) NOT NULL,
    `status` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postagem_comentario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPostagem` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `conteudo` VARCHAR(500) NOT NULL,
    `dataComentario` DATETIME(3) NOT NULL,
    `status` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idUsuarioChat` INTEGER NOT NULL,
    `dataChat` DATETIME(3) NOT NULL,
    `status` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_mensagens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idChat` INTEGER NOT NULL,
    `idUsuarioEnvio` INTEGER NOT NULL,
    `idUsuarioRecebe` INTEGER NOT NULL,
    `mensagem` VARCHAR(500) NOT NULL,
    `dataEnvio` DATETIME(3) NOT NULL,
    `dataRecebido` DATETIME(3) NOT NULL,
    `status` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuarioCriacao` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` VARCHAR(100) NULL,
    `cep` VARCHAR(8) NULL,
    `numero` INTEGER NULL,
    `complemento` VARCHAR(100) NULL,
    `referencia` VARCHAR(100) NULL,
    `dataEnvio` DATETIME(3) NOT NULL,
    `quantidadeDias` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evento_agenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEvento` INTEGER NOT NULL,
    `dia` INTEGER NOT NULL,
    `idParticipante` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
