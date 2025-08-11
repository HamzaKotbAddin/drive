"use client";

import { useState, useEffect } from "react";
import { mockFiles, mockFolders } from "../lib/mock-data";
import { Upload, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FileRow, FolderRow } from "./file-row";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root");

  console.log("SINGLESTORE_HOST:", process.env.SINGLESTORE_HOST);
  console.log("SINGLESTORE_PORT:", process.env.SINGLESTORE_PORT);
  console.log("SINGLESTORE_USER:", process.env.SINGLESTORE_USER);
  console.log("SINGLESTORE_PASSWORD:", process.env.SINGLESTORE_PASSWORD);
  console.log("SINGLESTORE_DATABASE:", process.env.SINGLESTORE_DATABASE);

  const getCurrentFiles = () => {
    const files = mockFiles.filter((file) => file.parent === currentFolder);
    console.log("📁 Current Files:", files);
    return files;
  };

  const getCurrentFolders = () => {
    const folders = mockFolders.filter(
      (folder) => folder.parent === currentFolder,
    );
    console.log("📂 Current Folders:", folders);
    return folders;
  };

  const handleFolderClick = (folderId: string) => {
    console.log("📌 Folder Clicked:", folderId);
    setCurrentFolder(folderId);
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentId: string | null = currentFolder;
    console.log("🔍 Building breadcrumbs for:", currentId);

    while (currentId && currentId !== "root") {
      const folder = mockFolders.find((f) => f.id === currentId);
      console.log("➡️ Found folder in breadcrumbs:", folder);

      if (folder && folder.parent !== null) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent;
      } else {
        console.log("🛑 Stopping breadcrumb loop at:", folder);
        break;
      }
    }

    console.log("✅ Final Breadcrumbs:", breadcrumbs);
    return breadcrumbs;
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  useEffect(() => {
    console.log("📍 Folder changed to:", currentFolder);
  }, [currentFolder]);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex cursor-pointer items-center">
            <Button
              onClick={() => {
                console.log("🏠 Back to root");
                setCurrentFolder("root");
              }}
              variant="ghost"
              className="mr-2 cursor-pointer text-gray-300"
            >
              My Drive
            </Button>
            {getBreadcrumbs().map((folder) => (
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
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {getCurrentFolders().map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                handleFolderClick={() => handleFolderClick(folder.id)}
              />
            ))}
            {getCurrentFiles().map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
