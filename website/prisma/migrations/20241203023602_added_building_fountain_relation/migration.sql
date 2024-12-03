/*
  Warnings:

  - You are about to drop the `building` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fountain` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "building";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "fountain";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Fountain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buildingId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "bottleNum" INTEGER NOT NULL,
    CONSTRAINT "Fountain_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building" ("buildingId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Building" (
    "buildingId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buildingName" TEXT NOT NULL,
    "buildingLongitude" DECIMAL NOT NULL,
    "buildingLatitude" DECIMAL NOT NULL
);
