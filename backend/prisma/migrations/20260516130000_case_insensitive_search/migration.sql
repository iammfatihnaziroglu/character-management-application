-- SQLite: name ve description için NOCASE — contains araması büyük/küçük harf duyarsız olur
-- (Prisma SQLite provider `mode: 'insensitive'` desteklemez)
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL COLLATE NOCASE,
    "status" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "description" TEXT NOT NULL COLLATE NOCASE
);

INSERT INTO "new_Character" ("id", "image", "name", "status", "gender", "description")
SELECT "id", "image", "name", "status", "gender", "description" FROM "Character";

DROP TABLE "Character";

ALTER TABLE "new_Character" RENAME TO "Character";

PRAGMA foreign_keys=ON;
