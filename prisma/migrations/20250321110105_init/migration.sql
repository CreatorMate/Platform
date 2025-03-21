-- CreateTable
CREATE TABLE "creator_brand" (
    "id" UUID NOT NULL,
    "creator_id" UUID NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "accepted" BOOLEAN,

    CONSTRAINT "creator_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creators" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR,
    "last_name" TEXT,
    "instagram_id" INTEGER,
    "user_id" UUID NOT NULL,
    "status" TEXT,
    "handle" VARCHAR,
    "linked" BOOLEAN,

    CONSTRAINT "creators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "external_id" VARCHAR,
    "email" VARCHAR,
    "brand_id" INTEGER,
    "full_name" VARCHAR,
    "picture" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "color" TEXT,
    "name" TEXT,
    "creators" TEXT,
    "days" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "brand_id" INTEGER,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "picture" TEXT,
    "name" VARCHAR,
    "is_premium" BOOLEAN,
    "customer_id" VARCHAR,
    "instagram_id" INTEGER,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instagram_accounts" (
    "id" SERIAL NOT NULL,
    "expires_at" DATE,
    "token" TEXT,
    "instagram_id" INTEGER,

    CONSTRAINT "instagram_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "columns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "position" INTEGER,

    CONSTRAINT "columns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_widgets" (
    "id" UUID NOT NULL,
    "widget_id" INTEGER,
    "project_id" INTEGER NOT NULL,
    "component" TEXT,
    "value" TEXT,
    "column_id" INTEGER NOT NULL,
    "order" INTEGER,

    CONSTRAINT "project_widgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "widgets" (
    "id" SERIAL NOT NULL,
    "top" TEXT,
    "grouped" BOOLEAN,
    "name" TEXT,
    "description" TEXT,
    "brand_id" INTEGER,
    "component" TEXT,
    "action" TEXT,
    "endpoint" TEXT,
    "metric_name" TEXT,

    CONSTRAINT "widgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "creators_instagram_id_key" ON "creators"("instagram_id");

-- CreateIndex
CREATE UNIQUE INDEX "creators_user_id_key" ON "creators"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "brands_instagram_id_key" ON "brands"("instagram_id");

-- CreateIndex
CREATE UNIQUE INDEX "instagram_accounts_instagram_id_key" ON "instagram_accounts"("instagram_id");

-- AddForeignKey
ALTER TABLE "creator_brand" ADD CONSTRAINT "creator_brand_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_brand" ADD CONSTRAINT "creator_brand_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creators" ADD CONSTRAINT "creators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creators" ADD CONSTRAINT "creators_instagram_id_fkey" FOREIGN KEY ("instagram_id") REFERENCES "instagram_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_instagram_id_fkey" FOREIGN KEY ("instagram_id") REFERENCES "instagram_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "columns" ADD CONSTRAINT "columns_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_widgets" ADD CONSTRAINT "project_widgets_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;
