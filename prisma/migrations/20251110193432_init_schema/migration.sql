-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3),
    "date_publication" TIMESTAMP(3),
    "date_expiration" TIMESTAMP(3),
    "statut" VARCHAR(50),
    "titre" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "id_categorie" INTEGER,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actualite" (
    "id" SERIAL NOT NULL,
    "id_publication" INTEGER NOT NULL,

    CONSTRAINT "Actualite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT,
    "description" TEXT,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "libelle" VARCHAR(100) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsDePublication" (
    "id_tag" INTEGER NOT NULL,
    "id_publication" INTEGER NOT NULL,

    CONSTRAINT "TagsDePublication_pkey" PRIMARY KEY ("id_tag","id_publication")
);

-- CreateTable
CREATE TABLE "Evenement" (
    "id" SERIAL NOT NULL,
    "id_publication" INTEGER NOT NULL,
    "adresse" VARCHAR(255),
    "date_planifiee" TIMESTAMP(3),

    CONSTRAINT "Evenement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Actualite_id_publication_key" ON "Actualite"("id_publication");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_libelle_key" ON "Tag"("libelle");

-- CreateIndex
CREATE UNIQUE INDEX "Evenement_id_publication_key" ON "Evenement"("id_publication");

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actualite" ADD CONSTRAINT "Actualite_id_publication_fkey" FOREIGN KEY ("id_publication") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsDePublication" ADD CONSTRAINT "TagsDePublication_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsDePublication" ADD CONSTRAINT "TagsDePublication_id_publication_fkey" FOREIGN KEY ("id_publication") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evenement" ADD CONSTRAINT "Evenement_id_publication_fkey" FOREIGN KEY ("id_publication") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
