'use client';
import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";
import EditeurTextQuill from "../components/EditeurTextQuill";
import InputFileUpload from "../components/InputFileUpload";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import { CategorieDTO } from "@/application/dtos/CategorieDTO";
import AsyncCreatableSelect from "react-select/async-creatable";
import { CreerActualite } from "@/shared/types/CreerActualite.type";
import { TagCreatableOption } from "@/shared/types/TagCreatableOption.type";
import { useRouter } from "next/navigation";
import { NotificationType } from "@/shared/enums/NotificationType";
import { useNotification } from "@/shared/hooks/notification";
import { creerActualiteAction, enregistrerImage } from "../actions/ActualiteActions";
import { rechercherTagsAction } from "../actions/TagActions";

interface ActualiteEditionViewProps {
    categories: CategorieDTO[];
}

interface AutocompleteCategorie {
    choisie: string;
    aCreer: string;
    value: string;
}

export default function ActualiteEditionView({ categories }: ActualiteEditionViewProps) {
    const [titre, setTitre] = useState("");
    const [contenu, setContenu] = useState("");
    const [categorieChoisie, setCategorieChoisie] = useState<AutocompleteCategorie>({
        choisie: "",
        aCreer: "",
        value: ""
    });
    const [tagsChoisis, setTagsChoisis] = useState<TagCreatableOption[]>([]);
    const [image, setImage] = useState<File>();
    const { showNotification } = useNotification();

    const router = useRouter();

    const handleChange = (newValue: readonly TagCreatableOption[]) => {
        setTagsChoisis(newValue as TagCreatableOption[]);
    };

    const handleCreateTag = (inputValue: string) => {
        const nouveauTag = {
            value: "new",
            label: inputValue
        }
        setTagsChoisis((prev) => [...prev, nouveauTag]);
    };

    const uploadImage = async (file: File) => {
        try {
            return await enregistrerImage(file);
        } catch {
            showNotification("Erreur lors de l'enregistrement de l'image", NotificationType.ERROR);
            return;
        }
    };

    const handleCreateActualite = async () => {
        let imageUrl;

        if (!titre) {
            showNotification("Le titre est requis", NotificationType.ERROR);
            return;
        }

        if (image) {
            imageUrl = await uploadImage(image);
            if (!imageUrl) {
                return;
            }
        }

        const dataCreation: CreerActualite = {
            titre,
            description: contenu,
            categorie: categorieChoisie.aCreer || Number(categorieChoisie.choisie) || undefined,
            tags: tagsChoisis,
            imageUrl,
        };

        try {
            const actualite = await creerActualiteAction(dataCreation);
            if (actualite) {
                showNotification("Actualité Créée avec succès", NotificationType.SUCCESS);
                router.back();
            }
        } catch {
            showNotification("Une erreur s'est produite", NotificationType.ERROR);
        }
    }

    const handleLoadImage = (file: File) => {
        setImage(file);
    }

    const handleSearchTags = async (value: string) => {
        return await rechercherTagsAction(value);
    }

    const categorieExiste = (value: string) =>
        categories.some((categorie) => categorie.nom.toLowerCase() === value.toLowerCase());

    const onCategorieSelect = (key: React.Key | null) => {
        const categorie = categories.find((categorie) => categorie.id === Number(key));
        setCategorieChoisie({
            choisie: String(key),
            aCreer: "",
            value: categorie?.nom || ""
        });
    }

    const onCategorieInputChange = (value: string) => {
        setCategorieChoisie({
            choisie: "",
            aCreer: value,
            value: value
        });
    }

    const onClear = () => {
        setCategorieChoisie({
            choisie: "",
            aCreer: "",
            value: ""
        });
    }

    return (
        <div className="flex flex-col actualite-edition-view">
            <div className="">
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
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Créer une actualité</h2>
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
                            onValueChange={setTitre} />

                        <div className="flex flex-col gap-2 mt-6">
                            <label className="text-gray-900 text-xl font-medium mb-2 block">Contenu</label>
                            <EditeurTextQuill value={contenu} onChange={setContenu} />
                        </div>
                    </div>
                </div>
                <div className="options-panel flex flex-col px-4 rounded-lg shadow bg-white ml-6 flex-1 w-2/6 pt-6 pb-4 px-2 justify-between flex-1">
                    <div className="flex flex-col">
                        <div>
                            <label className="text-gray-900 text-lg font-medium mb-2 block">Image mise en avant</label>
                            <InputFileUpload chargerImage={handleLoadImage} />
                        </div>
                        <div className="mt-6">
                            <Autocomplete
                                className="w-full"
                                allowsCustomValue={true}
                                label={<label className="text-gray-900 text-lg font-medium">Catégorie</label>}
                                labelPlacement="outside"
                                placeholder="Choisir une catégorie"
                                description={(categorieChoisie.aCreer && !categorieExiste(categorieChoisie.aCreer)) ? `Nouvelle catégorie à créer : "${categorieChoisie.aCreer}"` : null}
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
                            <label className="text-gray-900 text-lg font-medium mb-2 block">Etiquettes</label>
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
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="">
                        <Button radius="sm" className="w-full bg-gray-400 text-white text-sm xl:text-md"
                            onPress={handleCreateActualite}>
                            Enregistrer en brouillon
                        </Button>
                        <Button radius="sm" className="mt-4 w-full bg-primary text-white text-sm xl:text-md">
                            Enregistrer et publier
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}