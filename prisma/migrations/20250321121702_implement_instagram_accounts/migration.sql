/*
  Warnings:

  - Made the column `expires_at` on table `instagram_accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `instagram_accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instagram_id` on table `instagram_accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "instagram_accounts_instagram_id_key";

-- AlterTable
ALTER TABLE "instagram_accounts" ALTER COLUMN "expires_at" SET NOT NULL,
ALTER COLUMN "token" SET NOT NULL,
ALTER COLUMN "instagram_id" SET NOT NULL,
ALTER COLUMN "instagram_id" SET DATA TYPE TEXT;
