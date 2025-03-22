/*
  Warnings:

  - You are about to drop the `BoardCollaborator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoardCollaborator" DROP CONSTRAINT "BoardCollaborator_boardId_fkey";

-- DropForeignKey
ALTER TABLE "BoardCollaborator" DROP CONSTRAINT "BoardCollaborator_collaboratorId_fkey";

-- DropTable
DROP TABLE "BoardCollaborator";

-- CreateTable
CREATE TABLE "board_collaborator" (
    "collaboratorId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "collaboratorType" "CollaboratorType" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "board_collaborator_pkey" PRIMARY KEY ("collaboratorId","boardId")
);

-- CreateIndex
CREATE INDEX "board_collaborator_boardId_idx" ON "board_collaborator"("boardId");

-- AddForeignKey
ALTER TABLE "board_collaborator" ADD CONSTRAINT "board_collaborator_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_collaborator" ADD CONSTRAINT "board_collaborator_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
