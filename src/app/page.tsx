import DriveContent from "./drive-content";
import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";

export default async function Page() {
  const rawFiles = await db.select().from(filesSchema);
  const rawFolders = await db.select().from(foldersSchema);

  // Map DB data to your interfaces
  const files = rawFiles.map((f) => ({
    id: String(f.id),
    name: f.name,
    type: "file" as const,
    url: f.url, // make sure your schema has a URL field
    parent: String(f.parent),
    size: String(f.size), // convert number to string if needed
  }));

  const folders = rawFolders.map((f) => ({
    id: String(f.id),
    name: f.name,
    type: "folder" as const,
    parent: f.parent !== null ? String(f.parent) : null,
  }));

  return <DriveContent files={files} folders={folders} />;
}
