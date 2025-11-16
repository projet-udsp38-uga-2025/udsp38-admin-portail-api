"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { CategorieDTO } from "@/application/dtos/CategorieDTO";

interface CategorieEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  categorie: CategorieDTO;
  updateCategorie: (
    id: number,
    input: { nom: string; description: string }
  ) => Promise<void>;
}

export default function CategorieEditModal({
  isOpen,
  onClose,
  categorie,
  updateCategorie,
}: CategorieEditModalProps) {
  const [nom, setNom] = useState(categorie.nom ?? "");
  const [description, setDescription] = useState(categorie.description ?? "");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
  if (isOpen && categorie) {
    startTransition(() => {
      setNom(categorie.nom ?? "");
      setDescription(categorie.description ?? "");
    });
  }
}, [isOpen, categorie]);


  const handleSubmit = () => {
    startTransition(async () => {
      await updateCategorie(categorie.id, {
        nom: nom.trim(),
        description: description.trim(),
      });
      onClose(); 
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="opaque" 
      classNames={{
        backdrop: "bg-black/20", 
        base: "max-w-lg w-full", 
      }}
    >
      <ModalContent>
        <>
          <ModalHeader className="text-xl font-semibold">
            Modifier la catégorie
          </ModalHeader>

          <ModalBody className="space-y-4">
            <Input
              label="Nom"
              variant="bordered"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              isRequired
            />

            <Textarea
              label="Description"
              variant="bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minRows={3}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="flat"
              onPress={onClose}
              isDisabled={isPending}
            >
              Annuler
            </Button>

            <Button
              color="primary"
              onPress={handleSubmit}
              isLoading={isPending}
            >
              Enregistrer
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}