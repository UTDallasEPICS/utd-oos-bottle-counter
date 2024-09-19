/*
  Warnings:

  - You are about to drop the column `name` on the `fountain` table. All the data in the column will be lost.
  - Added the required column `building` to the `fountain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `fountain` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fountain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "building" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bottleNum" INTEGER NOT NULL
);
INSERT INTO "new_fountain" ("bottleNum", "id") SELECT "bottleNum", "id" FROM "fountain";
DROP TABLE "fountain";
ALTER TABLE "new_fountain" RENAME TO "fountain";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
