"use client";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link"],
        ["clean"],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "indent",
    "align",
    "link",
];

export type EditeurTextQuillProps = {
    value?: string;
    onChange?: (value: string) => void;
};

export default function EditeurTextQuill({value, onChange}: EditeurTextQuillProps) {
    return (
        <div className="w-full">
            <div
                className="rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-400 bg-white shadow-sm">
                <ReactQuill
                    theme="snow"
                    value={value || ""}
                    onChange={e => onChange && onChange(e)}
                    modules={modules}
                    formats={formats}
                    placeholder="Commencer ici ..."
                    className="ql-custom"
                />
            </div>
        </div>
    );
}