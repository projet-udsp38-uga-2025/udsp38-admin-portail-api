import { Image, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useEffect } from "react";

interface DisplayMainImageProps {
    file: File;
}

export default function DisplayMainImage({ file }: DisplayMainImageProps) {
    const previewUrl = URL.createObjectURL(file);
    useEffect(() => {
        return () => {
            if (!file) {
                URL.revokeObjectURL(previewUrl);
            }
        }; 
    }, [file]);
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <span className="text-gray-500 truncate cursor-pointer hover:text-blue-600">{file.name}</span>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2 ">
                    <Image
                        alt="Image mise en avant"
                        src={previewUrl}
                        width={500}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}