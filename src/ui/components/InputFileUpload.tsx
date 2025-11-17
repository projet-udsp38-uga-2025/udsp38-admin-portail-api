"use client";

import { Button } from "@heroui/react";
import { useRef, useState } from "react";
import DisplayMainImage from "./DisplayMainImage";
import { useNotification } from "@/shared/hooks/notification";
import { NotificationType } from "@/shared/enums/NotificationType";

interface inputFieldProps {
  chargerImage: (image: File) => void
}

export default function InputFileUpload({ chargerImage }: inputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const MAX_SIZE = 2 * 1024 * 1024;
  const { showNotification } = useNotification();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        showNotification("Le fichier est trop volumineux (max 2MB)", NotificationType.ERROR);
        return;
      }
      setFile(file)
      chargerImage(file);
    }
  };

  return (
    <div>
      <div className="flex items-center border border-gray-300 text-sm rounded-lg bg-gray-100 h-12">
        <Button radius="none"
          type="button"
          onPress={() => inputRef.current?.click()}
          className="text-sm h-full text-white mr-2 rounded-l-lg bg-primary hover:bg-blue-700">
          Choisir un fichier
        </Button>
        {
          file === null ? <span className="text-gray-500 truncate">Aucun fichier choisi</span>
            : <DisplayMainImage file={file} />
        }
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>
      <span className="text-xs text-gray-500 ml-2" aria-live="polite">
        Taille maximale du fichier : {MAX_SIZE / (1024 * 1024)} Mo
      </span>
    </div>
  );
}
