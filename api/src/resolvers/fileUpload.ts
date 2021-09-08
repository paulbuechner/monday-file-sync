import { format } from "date-fns";
import { readFile } from "fs/promises";
import fetch from "node-fetch";

import {
  API_V2_FILE_ENDPOINT,
  DATE_FORMAT,
  DEV_MONDAY_API_KEY,
  PROD_MONDAY_API_KEY,
  __prod__,
} from "../constants";
import type { FileUploadMutationResponse } from "../mutations/board";
import { uploadFile } from "../mutations/board";
import type { UploadDirProps } from "../utils/getUploadDir";
import { logger } from "../utils/logger";

export async function fileUpload(
  file: string,
  dir: UploadDirProps
): Promise<FileUploadMutationResponse | undefined> {
  // set query
  const query = uploadFile(
    dir.filteredItems.id,
    dir.filteredItems.column_values[0].column_id
  );

  // set URL and boundary
  const url = API_V2_FILE_ENDPOINT;
  const boundary = "xxx-1234";
  let data = "";

  // read file
  const content = await readFile(file, "binary");
  // console.log(content);

  // construct filename
  const filename = `${format(new Date(), DATE_FORMAT)}_${
    dir.filteredPath.filename
  }.${dir.filteredPath.type}`;

  // construct query part
  data += `--${boundary}\r\n`;
  data += 'Content-Disposition: form-data; name="query"; \r\n';
  data += "Content-Type:application/json\r\n\r\n";
  data += `\r\n${query}\r\n`;

  // construct file part
  data += `--${boundary}\r\n`;
  data += `Content-Disposition: form-data; name="variables[file]"; filename="${filename}"\r\n`;
  data += "Content-Type:application/octet-stream\r\n\r\n";

  const payload = Buffer.concat([
    Buffer.from(data, "utf8"),
    Buffer.from(content, "binary"),
    Buffer.from(`\r\n--${boundary}--\r\n`, "utf8"),
  ]);

  // construct request options
  const options = {
    method: "post",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
      Authorization: __prod__ ? PROD_MONDAY_API_KEY! : DEV_MONDAY_API_KEY!,
    },
    body: payload,
  };

  // make request
  try {
    const res = await fetch(url, options);
    const json = (await res.json()) as FileUploadMutationResponse;

    logger.upload(
      `✅ File has been uploaded succesfully. <br> • ${json.data.add_file_to_column.name} <br><br> Please update the Board accordingly.`,
      {
        additional_info: dir.boardId,
      }
    );

    return json;
  } catch (error) {
    logger.error(
      `⛔ Oh no! Something went wrong: ${error} <br> • ${file} <br><br> Please Update the Board manually.`,
      {
        additional_info: dir.boardId,
      }
    );

    return undefined;
  }
}
