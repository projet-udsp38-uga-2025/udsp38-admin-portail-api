'use client';

import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import AsyncCreatableSelect from "react-select/async-creatable";
import ProgrammerPublicationModal from "../components/ProgrammerPublicationModal";

import type { ActualiteDTO } from "@/application/dtos/ActualiteDTO";
import type { CategorieDTO } from "@/application/dtos/CategorieDTO";
import { NotificationType } from "@/shared/enums/NotificationType";
import { useNotification } from "@/shared/hooks/notification";
import type { CreerActualite } from "@/shared/types/CreerActualite.type";
import type { TagCreatableOption } from "@/shared/types/TagCreatableOption.type";
import { creerActualiteAction, enregistrerImage } from "../actions/ActualiteActions";
import { rechercherTagsAction } from "../actions/TagActions";
import EditeurTextQuill from "../components/EditeurTextQuill";
import InputFileUpload from "../components/InputFileUpload";

interface ActualiteEditionViewProps {
  categories: CategorieDTO[];
  actualite?: ActualiteDTO;
}

interface AutocompleteCategorie {
  choisie: string;
  aCreer: string;
  value: string;
}

const getInitialCategorie = (actualite: ActualiteDTO | undefined, categories: CategorieDTO[]): AutocompleteCategorie => {
  if (!actualite?.idCategorie) {
    return { choisie: "", aCreer: "", value: "" };
  }

  const categorie = categories.find((c) => c.id === actualite.idCategorie);
  return {
    choisie: String(actualite.idCategorie),
    aCreer: "",
    value: categorie?.nom ?? ""
  };
};

const getInitialTags = (actualite: ActualiteDTO | undefined): TagCreatableOption[] => {
  return actualite?.tags?.map(tag => ({
    value: String(tag.value),
    label: tag.label
  })) ?? [];
};

export default function ActualiteEditionView({ categories, actualite }: ActualiteEditionViewProps) {
  const isEditMode = !!actualite;

  // Direct initialization without useMemo - values only computed once on mount
  const [titre, setTitre] = useState(actualite?.titre ?? "");
  const [contenu, setContenu] = useState(actualite?.description ?? "");
  const [categorieChoisie, setCategorieChoisie] = useState<AutocompleteCategorie>(
    getInitialCategorie(actualite, categories)
  );
  const [tagsChoisis, setTagsChoisis] = useState<TagCreatableOption[]>(getInitialTags(actualite));
  const [image, setImage] = useState<File>();
  const [imageUrl] = useState<string | undefined>(actualite?.imageUrl ?? undefined);

  const { showNotification } = useNotification();
  const router = useRouter();

  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  const handleChange = (newValue: readonly TagCreatableOption[]): void => {
    setTagsChoisis([...newValue]);
  };

  const handleCreateTag = (inputValue: string): void => {
    const nouveauTag = {
      value: "new",
      label: inputValue,
    };
    setTagsChoisis((prev) => [...prev, nouveauTag]);
  };

  const uploadImage = async (file: File): Promise<string | undefined> => {
    try {
      return await enregistrerImage(file);
    } catch {
      showNotification("Erreur lors de l'enregistrement de l'image", NotificationType.ERROR);
      return undefined;
    }
  };

  const handleCreateActualite = async (mode: "BROUILLON" | "IMMEDIATE" | "PROGRAMMEE", datePublication?: Date): Promise<void> => {
    let uploadedImageUrl = imageUrl;

    if (!titre) {
      showNotification("Le titre est requis", NotificationType.ERROR);
      return;
    }

    if (image) {
      uploadedImageUrl = await uploadImage(image);
      if (!uploadedImageUrl) {
        return;
      }
    }

    const dataCreation: CreerActualite = {
      titre,
      description: contenu,
      categorie: categorieChoisie.aCreer || Number(categorieChoisie.choisie) || undefined,
      tags: tagsChoisis,
      imageUrl: uploadedImageUrl,
    };

    try {
      const createdActualite = await creerActualiteAction(dataCreation);
      if (createdActualite) {
        showNotification("Actualité créée avec succès", NotificationType.SUCCESS);
        router.back();
      }
    } catch {
      showNotification("Une erreur s'est produite", NotificationType.ERROR);
    }
  };

  const handleLoadImage = (file: File): void => {
    setImage(file);
  };

  const handleSearchTags = async (value: string): Promise<TagCreatableOption[]> => {
    return await rechercherTagsAction(value);
  };

  const categorieExiste = (value: string): boolean =>
    categories.some((categorie) => categorie.nom.toLowerCase() === value.toLowerCase());

  const onCategorieSelect = (key: React.Key | null): void => {
    const categorie = categories.find((c) => c.id === Number(key));
    setCategorieChoisie({
      choisie: String(key ?? ""),
      aCreer: "",
      value: categorie?.nom ?? ""
    });
  };

  const onCategorieInputChange = (value: string): void => {
    setCategorieChoisie({
      choisie: "",
      aCreer: value,
      value
    });
  };

  const onClear = (): void => {
    setCategorieChoisie({
      choisie: "",
      aCreer: "",
      value: ""
    });
  };

  return (
    <div className="flex flex-col actualite-edition-view">
      <div>
        <Button
          startContent={<IoReturnUpBackOutline size={20} className="text-gray-700" />}
          variant="flat"
          radius="none"
          as={Link}
          href="/actualites"
          className="bg-transparent text-md font-medium">
          Retour
        </Button>
      </div>
      <div className="flex-1 flex flex-row justify-between">
        <div className="rounded-lg shadow bg-white w-4/6 pt-6 pb-4 px-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            {isEditMode ? "Modifier l'actualité" : "Créer une actualité"}
          </h2>
          <div className="flex flex-col gap-4 mt-6">
            <Input
              label={<span className="text-gray-900 text-xl font-medium">Titre</span>}
              labelPlacement="outside"
              placeholder="Saisir le titre ici"
              className="w-full"
              size="lg"
              variant="bordered"
              radius="sm"
              value={titre}
              onValueChange={setTitre}
            />

            <div className="flex flex-col gap-2 mt-6">
              <label className="text-gray-900 text-xl font-medium mb-2 block">Contenu</label>
              <EditeurTextQuill value={contenu} onChange={setContenu} />
            </div>
          </div>
        </div>
        <div className="options-panel flex flex-col px-4 rounded-lg shadow bg-white ml-6 flex-1 w-2/6 pt-6 pb-4 px-2 justify-between">
          <div className="flex flex-col">
            <div>
              <label className="text-gray-900 text-lg font-medium mb-2 block">Image mise en avant</label>
              <InputFileUpload chargerImage={handleLoadImage} />
            </div>
            <div className="mt-6">
              <Autocomplete
                className="w-full"
                allowsCustomValue
                label={<label className="text-gray-900 text-lg font-medium">Catégorie</label>}
                labelPlacement="outside"
                placeholder="Choisir une catégorie"
                description={
                  categorieChoisie.aCreer && !categorieExiste(categorieChoisie.aCreer)
                    ? `Nouvelle catégorie à créer : "${categorieChoisie.aCreer}"`
                    : null
                }
                size="lg"
                variant="bordered"
                radius="sm"
                items={categories}
                inputValue={categorieChoisie.value}
                onInputChange={onCategorieInputChange}
                selectedKey={categorieChoisie.choisie}
                onSelectionChange={onCategorieSelect}
                onClear={onClear}>
                {(categorie) => (
                  <AutocompleteItem key={categorie.id}>{categorie.nom}</AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            <div className="mt-4">
              <label className="text-gray-900 text-lg font-medium mb-2 block">Étiquettes</label>
              <AsyncCreatableSelect
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null
                }}
                cacheOptions
                captureMenuScroll
                classNamePrefix="react-select"
                placeholder="Ajouter des étiquettes"
                isMulti
                loadOptions={handleSearchTags}
                onCreateOption={handleCreateTag}
                value={tagsChoisis}
                onChange={handleChange}
              />
            </div>
          </div>

          {!isEditMode && (
            <div>
              <Button
                radius="sm"
                className="w-full bg-gray-400 text-white text-sm xl:text-md"
                onPress={() => handleCreateActualite("BROUILLON")}>
                Enregistrer en brouillon
              </Button>
              <Button radius="sm" className="mt-4 w-full bg-primary text-white text-sm xl:text-md">
                Enregistrer et publier
              </Button>
            </div>
          )}
        </div>
        <ProgrammerPublicationModal
          isOpen={isSchedulerOpen}
          onClose={() => setIsSchedulerOpen(false)}
          onPublierMaintenant={async () => {
            await handleCreateActualite("IMMEDIATE");
            setIsSchedulerOpen(false);
          }}
          onProgrammer={async (date) => {
            await handleCreateActualite("PROGRAMMEE", date);
            setIsSchedulerOpen(false);
          }}
        />
      </div>
    </div>
  );
}
