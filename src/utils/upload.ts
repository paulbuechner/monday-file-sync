/* eslint-disable no-console */
import "dotenv-safe/config";
import fs from "fs";
import fetch from "node-fetch";

import { MONDAY_API_KEY } from "../utils/constants";

const upfile = "src/sfi/1.txt";

export async function upload(): Promise<void> {
  // set auth token and query
  const query =
    'mutation ($file: File!) { add_file_to_column (file: $file, item_id: 1507965378, column_id: "datei") { id } }';

  // set URL and boundary
  const url = "https://api.monday.com/v2/file";
  const boundary = "xxx-1234";
  let data = "";

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  fs.readFile(upfile, async (err, content) => {
    // simple catch error
    if (err) {
      console.error(err);
    }

    console.log(content);

    // construct query part
    data += `--${boundary}\r\n`;
    data += 'Content-Disposition: form-data; name="query"; \r\n';
    data += "Content-Type:application/json\r\n\r\n";
    data += `\r\n${query}\r\n`;

    // construct file part
    data += `--${boundary}\r\n`;
    data += `Content-Disposition: form-data; name="variables[file]"; filename="${upfile}"\r\n`;
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
    await fetch(url, options)
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      })
      .then((json) => {
        console.log(json);
      });
  });
}
