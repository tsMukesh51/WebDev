/*
  Warnings:

  - You are about to drop the `board_collaborator` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `shapeType` on the `element` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ShapeType" AS ENUM ('RECTANGLE', 'CIRCLE', 'LINE');

-- DropForeignKey
ALTER TABLE "board_collaborator" DROP CONSTRAINT "board_collaborator_boardId_fkey";

-- DropForeignKey
ALTER TABLE "board_collaborator" DROP CONSTRAINT "board_collaborator_collaboratorId_fkey";

-- AlterTable
ALTER TABLE "board" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "element" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "shapeType",
ADD COLUMN     "shapeType" "ShapeType" NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "board_collaborator";

-- CreateTable
CREATE TABLE "BoardCollaborator" (
    "collaboratorId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "collaboratorType" "CollaboratorType" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BoardCollaborator_pkey" PRIMARY KEY ("collaboratorId","boardId")
);

-- CreateIndex
CREATE INDEX "BoardCollaborator_boardId_idx" ON "BoardCollaborator"("boardId");

-- AddForeignKey
ALTER TABLE "BoardCollaborator" ADD CONSTRAINT "BoardCollaborator_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardCollaborator" ADD CONSTRAINT "BoardCollaborator_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
