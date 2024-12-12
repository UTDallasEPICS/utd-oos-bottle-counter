-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fountain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buildingId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "bottleNum" INTEGER NOT NULL,
    CONSTRAINT "Fountain_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building" ("buildingId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Fountain" ("bottleNum", "buildingId", "description", "id") SELECT "bottleNum", "buildingId", "description", "id" FROM "Fountain";
DROP TABLE "Fountain";
ALTER TABLE "new_Fountain" RENAME TO "Fountain";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
