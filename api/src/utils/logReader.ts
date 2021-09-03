import es from "event-stream";
import { createReadStream } from "fs";
import { readFile } from "fs/promises";
import stream from "stream";
import util from "util";

// import { LOG_CHANGE_PATH } from "../constants";

type ChangedFileProps = {
  level: string;
  timestamp: string;
  msg: string;
  additional_info: string;
};

export async function readLogs(
  file: string
): Promise<ChangedFileProps[] | undefined> {
  const files: ChangedFileProps[] = [];

  // read file
  const content = await readFile(file, "binary");
  if (content.length === 0) {
    return undefined;
  }

  const pipeline = util.promisify(stream.pipeline);

  try {
    await pipeline(
      createReadStream(file, "utf-8"),
      es.split(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      es.mapSync((line: any) => {
        if (line) {
          files.push(JSON.parse(line));
        }
      })
    );
  } catch (error) {
    console.log(error);
  }

  // return unique paths (filter duplicates)
  return [...new Map(files.map((item) => [item.msg, item])).values()];
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
// readLogs(LOG_CHANGE_PATH);
