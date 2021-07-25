import fs from "fs";
import fetch from "node-fetch";

import { MONDAY_API_KEY } from "../utils/constants";

export async function upload(file: string): Promise<void> {
  // set auth token and query
  const query =
    'mutation ($file: File!) { add_file_to_column (file: $file, item_id: 1507965378, column_id: "datei") { id } }';

  // set URL and boundary
  const url = "https://api.monday.com/v2/file";
  const boundary = "xxx-1234";
  let data = "";

  // read file
  const content = fs.readFileSync(file);
  // console.log(content);

  // construct query part
  data += `--${boundary}\r\n`;
  data += 'Content-Disposition: form-data; name="query"; \r\n';
  data += "Content-Type:application/json\r\n\r\n";
  data += `\r\n${query}\r\n`;

  // construct file part
  data += `--${boundary}\r\n`;
  data += `Content-Disposition: form-data; name="variables[file]"; filename="${file}"\r\n`;
  data += "Content-Type:application/octet-stream\r\n\r\n";

  const payload = Buffer.concat([
    Buffer.from(data, "utf8"),
    Buffer.from(content as unknown as string, "binary"),
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
    // check response
    const json = await res.json();
    console.log(json);
  } catch (error) {
    // handle error
    console.log("error:", error);
  }
}
