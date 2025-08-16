"use client";

import { useState, useEffect } from "react";
import { Upload, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FileRow, FolderRow } from "./file-row";
import type { File, Folder } from "~/lib/mock-data";

interface DriveContentProps {
  files: File[];
  folders: Folder[];
}

export default function DriveContent({ files, folders }: DriveContentProps) {
  const [currentFolder, setCurrentFolder] = useState<string>("root");
  const [breadcrumbs, setBreadcrumbs] = useState<Folder[]>([]);

  const handleFolderClick = (folderId: string) => {
    console.log("📌 Folder Clicked:", folderId);
    setCurrentFolder(folderId);
  };

  // Build breadcrumbs whenever currentFolder changes
  useEffect(() => {
    const buildBreadcrumbs = () => {
      const result: Folder[] = [];
      let currentId: string | null = currentFolder;

      while (currentId && currentId !== "root") {
        const folder = folders.find((f) => f.id === currentId);

        if (folder) {
          result.unshift(folder);
          currentId = folder.parent;
        } else {
          break;
        }
      }

      setBreadcrumbs(result);
    };

    buildBreadcrumbs();
  }, [currentFolder, folders]);

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb & Upload */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex cursor-pointer items-center">
            <Button
              onClick={() => setCurrentFolder("root")}
              variant="ghost"
              className="mr-2 cursor-pointer text-gray-300"
            >
              My Drive
            </Button>

            {breadcrumbs.map((folder) => (
              <div key={folder.id} className="flex cursor-pointer items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                  className="cursor-pointer hover:text-black"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>

          <Button
            onClick={handleUpload}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>

        {/* File / Folder Table */}
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>

          <ul>
            {/* Render folders in current folder */}
            {folders
              .filter((f) => f.parent === currentFolder)
              .map((folder) => (
                <FolderRow
                  key={folder.id}
                  folder={folder}
                  handleFolderClick={() => handleFolderClick(folder.id)}
                />
              ))}

            {/* Render files in current folder */}
            {files
              .filter((file) => file.parent === currentFolder)
              .map((file) => (
                <FileRow key={file.id} file={file} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
