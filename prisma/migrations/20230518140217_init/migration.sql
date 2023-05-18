-- CreateTable
CREATE TABLE "Flashcard" (
    "id" SERIAL NOT NULL,
    "backpage" TEXT NOT NULL,
    "frontpage" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);
