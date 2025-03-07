/*
  Warnings:

  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BoardAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BoardCollaborator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Element` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CollaboratorType" AS ENUM ('EDITOR', 'VIEWER');

-- DropForeignKey
ALTER TABLE "BoardAdmin" DROP CONSTRAINT "BoardAdmin_adminId_fkey";

-- DropForeignKey
ALTER TABLE "BoardAdmin" DROP CONSTRAINT "BoardAdmin_boardId_fkey";

-- DropForeignKey
ALTER TABLE "BoardCollaborator" DROP CONSTRAINT "BoardCollaborator_boardId_fkey";

-- DropForeignKey
ALTER TABLE "BoardCollaborator" DROP CONSTRAINT "BoardCollaborator_collaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "Element" DROP CONSTRAINT "Element_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Element" DROP CONSTRAINT "Element_boardId_fkey";

-- DropTable
DROP TABLE "Board";

-- DropTable
DROP TABLE "BoardAdmin";

-- DropTable
DROP TABLE "BoardCollaborator";

-- DropTable
DROP TABLE "Element";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board" (
    "id" TEXT NOT NULL,
    "boardName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "onwerId" TEXT NOT NULL,

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board_collaborator" (
    "collaboratorId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "collaboratorType" "CollaboratorType" NOT NULL DEFAULT 'VIEWER',

    CONSTRAINT "board_collaborator_pkey" PRIMARY KEY ("collaboratorId","boardId")
);

-- CreateTable
CREATE TABLE "element" (
    "id" TEXT NOT NULL,
    "shapeType" TEXT NOT NULL,
    "shapeProperties" JSONB NOT NULL,
    "boardId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "element_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "board_slug_key" ON "board"("slug");

-- AddForeignKey
ALTER TABLE "board" ADD CONSTRAINT "board_onwerId_fkey" FOREIGN KEY ("onwerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_collaborator" ADD CONSTRAINT "board_collaborator_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_collaborator" ADD CONSTRAINT "board_collaborator_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element" ADD CONSTRAINT "element_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "element" ADD CONSTRAINT "element_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
