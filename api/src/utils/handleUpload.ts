/* eslint-disable no-await-in-loop */
import { fileUpload } from "../resolvers/fileUpload";
import { getChangedFiles } from "./getChangedFiles";
import { getUploadDir } from "./getUploadDir";

// file upload handler
export async function handleUpload(): Promise<void> {
  // get upload position for file
  const files = await getChangedFiles();
  if (files) {
    for (const f of files) {
      console.log(f);
      const dir = await getUploadDir(f.path);

      if (dir) {
        // upload file to monday
        await fileUpload(f.path, dir.filteredItems.id, dir.filteredPath);
      }
    }
  }
}
