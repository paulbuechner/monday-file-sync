import { format } from "date-fns";
import { readFile } from "fs/promises";
import fetch from "node-fetch";

import {
  API_V2_FILE_ENDPOINT,
  DATE_FORMAT,
  MONDAY_API_KEY,
} from "../constants";
import { uploadFile } from "../mutations/board";
import type { FilteredItemsProps, FilterProps } from "../utils/filter";

type FileUploadRespones = FilteredItemsProps;

export async function fileUpload(
  file: string,
  item_id: string,
  filteredPath: FilterProps
): Promise<FileUploadRespones | undefined> {
  // set query
  const query = uploadFile(item_id);

  // set URL and boundary
  const url = API_V2_FILE_ENDPOINT;
  const boundary = "xxx-1234";
  let data = "";

  // read file
  const content = await readFile(file, "binary");
  // console.log(content);

  // construct filename
  const filename = `${format(new Date(), DATE_FORMAT)}_${
    filteredPath.filename
  }.${filteredPath.type}`;

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
      Authorization: MONDAY_API_KEY!,
    },
    body: payload,
  };

  // make request
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    console.info(
      `Upload Successfully ✅ \n\n ${JSON.stringify(json, null, 2)}`
    );

    return json;
  } catch (error) {
    console.error("error:", error);

    return undefined;
  }
}
