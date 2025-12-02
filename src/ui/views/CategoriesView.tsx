"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from "@heroui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CategorieDTO } from "@/application/dtos/CategorieDTO";
import { createCategorieAction, deleteCategorieAction, updateCategorieAction } from "@/ui/actions/CategorieActions";

interface CategoriesViewProps {
  categories: CategorieDTO[];
}

export default function CategoriesView({ categories }: CategoriesViewProps) {
  const router = useRouter();


  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCategorie, setEditingCategorie] =
    useState<CategorieDTO | null>(null);
  const [viewingCategorie, setViewingCategorie] =
    useState<CategorieDTO | null>(null);

  const [createNom, setCreateNom] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [isCreatePending, startCreateTransition] = useTransition();

  const handleCreate = () => {
    startCreateTransition(async () => {
      await createCategorieAction({
        nom: createNom.trim(),
        description: createDescription.trim(),
      });
      setCreateNom("");
      setCreateDescription("");
      setIsCreateOpen(false);
      router.refresh();
    });
  };

  const [editNom, setEditNom] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isEditPending, startEditTransition] = useTransition();


  const handleEdit = () => {
    if (!editingCategorie) return;

    startEditTransition(async () => {
      await updateCategorieAction(editingCategorie.id, {
        nom: editNom.trim(),
        description: editDescription.trim(),
      });
      setEditingCategorie(null);
      router.refresh();
    });
  };

  const [isPending, startTransition] = useTransition();
  const [categorieToDelete, setCategorieToDelete] =
    useState<CategorieDTO | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDelete = (cat: CategorieDTO) => {
    setCategorieToDelete(cat);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setCategorieToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!categorieToDelete) return;

    startTransition(async () => {
      await deleteCategorieAction(categorieToDelete.id);
      closeDelete();
      router.refresh();
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl p-6 shadow-sm w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
            <p className="text-gray-500 text-sm mt-1">
              Gérez les catégories utilisées pour les actualités et événements.
            </p>
          </div>

          <Button color="primary" onPress={() => setIsCreateOpen(true)} radius="sm">
            Créer une catégorie
          </Button>
        </div>

        <table className="w-full text-black">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3 pl-4 uppercase text-black">Nom</th>
              <th className="py-3 uppercase text-black">Description</th>
              <th className="py-3 text-right pr-6 uppercase text-black">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((categorie) => (
              <tr key={categorie.id} className="border-b border-gray-200 hover:bg-slate-50/25">
                <td className="py-3 pl-4 text-base font-medium">
                  {categorie.nom ?? "-"}
                </td>
                <td className="py-3 text-base font-medium">
                  {categorie.description ?? "-"}
                </td>

                <td className="py-3 text-right pr-8">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button isIconOnly variant="light" radius="full" size="sm">
                        <HiOutlineDotsHorizontal size={20} className="text-gray-700"/>
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="Actions">
                      <DropdownItem
                        key="details"
                        className="text-gray-700"
                        onPress={() => setViewingCategorie(categorie)}>
                        Afficher les détails
                      </DropdownItem>

                      <DropdownItem
                        key="edit"
                        className="text-gray-700"
                        onPress={() => {
                          setEditingCategorie(categorie);
                          setEditNom(categorie.nom ?? "");
                          setEditDescription(categorie.description ?? "");
                        }}
                      >
                        Modifier
                      </DropdownItem>

                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onPress={() => openDelete(categorie)}
                      >
                        Supprimer
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-400">
                  Aucune catégorie pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        backdrop="opaque"
        classNames={{
          backdrop: "bg-black/20",
          base: "max-w-lg w-full",
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="text-xl font-semibold text-black">
              Créer une catégorie
            </ModalHeader>
            <ModalBody className="space-y-4">
              <Input
                label="Nom"
                variant="bordered"
                value={createNom}
                onChange={(e) => setCreateNom(e.target.value)}
                isRequired
                className="text-gray-700"
              />
              <Textarea
                label="Description"
                variant="bordered"
                value={createDescription}
                onChange={(e) => setCreateDescription(e.target.value)}
                minRows={3}
                className="text-gray-700"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={() => setIsCreateOpen(false)}
                isDisabled={isCreatePending}
              >
                Annuler
              </Button>
              <Button
                color="primary"
                onPress={handleCreate}
                isLoading={isCreatePending}
                isDisabled={createNom.trim() === ""}
              >
                Enregistrer
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={!!editingCategorie}
        onClose={() => setEditingCategorie(null)}
        backdrop="opaque"
        classNames={{
          backdrop: "bg-black/20",
          base: "max-w-lg w-full",
        }}
      >
        <ModalContent>
          {editingCategorie && (
            <>
              <ModalHeader className="text-xl font-semibold text-black">
                Modifier la catégorie
              </ModalHeader>
              <ModalBody className="space-y-4 text-black">
                <Input
                  label="Nom"
                  variant="bordered"
                  value={editNom}
                  onChange={(e) => setEditNom(e.target.value)}
                  isRequired
                />
                <Textarea
                  label="Description"
                  variant="bordered"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  minRows={3}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  onPress={() => setEditingCategorie(null)}
                  isDisabled={isEditPending}
                >
                  Annuler
                </Button>
                <Button
                  color="primary"
                  onPress={handleEdit}
                  isLoading={isEditPending}
                  isDisabled={editNom.trim() === ""}
                >
                  Enregistrer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={!!viewingCategorie}
        onClose={() => setViewingCategorie(null)}
        backdrop="opaque"
        classNames={{
          backdrop: "bg-black/20",
          base: "max-w-lg w-full",
        }}
      >
        <ModalContent>
          {viewingCategorie && (
            <>
              <ModalHeader className="text-xl font-semibold text-black">
                Détails de la catégorie
              </ModalHeader>
              <ModalBody className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Nom</p>
                  <p className="text-sm font-medium text-gray-900">
                    {viewingCategorie.nom ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Description</p>
                  <p className="text-sm text-gray-900">
                    {viewingCategorie.description ?? "-"}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={() => setViewingCategorie(null)}>
                  Fermer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        placement="center"
        hideCloseButton
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="text-lg font-semibold text-black">
                Supprimer la catégorie
              </ModalHeader>

              <ModalBody>
                <p className="text-sm text-gray-700">
                  Êtes-vous sûr de vouloir supprimer la catégorie{" "}
                  <span className="font-semibold">
                    {categorieToDelete?.nom}
                  </span>?
                </p>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="bordered"
                  onPress={closeDelete}
                  isDisabled={isPending}
                  className="text-black"
                >
                  Annuler
                </Button>
                <Button
                  color="danger"
                  onPress={handleConfirmDelete}
                  isLoading={isPending}
                >
                  Supprimer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
