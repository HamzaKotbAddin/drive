"use client";

import type { Folder, File } from "../lib/mock-data";
import { Folder as FolderIcon, FileIcon } from "lucide-react";

export function FileRow(props: { file: File }) {
  const { file } = props;
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex cursor-pointer items-center text-gray-100 hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">{file.type}</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  folder: Folder;
  handleFolderClick: () => void;
}) {
  const { folder, handleFolderClick } = props;
  return (
    <li className="hover:bg-gray-750 cursor-pointer border-b border-gray-700 px-6 py-4">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <button
            onClick={() => handleFolderClick()}
            className="flex cursor-pointer items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </button>
        </div>
        <div className="col-span-3 text-gray-400">
          {folder.type === "folder" ? "Folder" : "File"}
        </div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  );
}
