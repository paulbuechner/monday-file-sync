import type { ItemProps } from "../queries/board";

export type FilterProps = {
  dir: string;
  filename: string;
  type: string;
};

/**
 * Destructure filepath into the follwing capture groups:
 * - dir: parent file directory
 * - filename: name of the file
 * - type: fileextension / type
 *
 * @example <caption>Example usage of filterPath.</caption>
 * const filteredPath = filterPath("foo/bar/foobar.pdf")
 * // returns { dir: "bar", filename: "foobar", type: "pdf" }
 *
 * @param {string} path - The filepath to be destructured.
 *
 * @returns {Object} Object including the mentioned capture groups.
 */
export function filterPath(path: string): FilterProps | undefined {
  // eslint-disable-next-line unicorn/no-unsafe-regex
  const groups = /(?:.+\\)*(.+)\\(.+)\.(.+)$/u.exec(path);

  if (groups) {
    const [, dir, filename, type] = groups;

    return { dir, filename, type };
  }
  return undefined;
}

export type ValueProps = {
  name: string;
  assetId: number;
  isImage: string;
  fileType: string;
};

type FileValueProps = {
  files: ValueProps[];
};

export type FilteredItemsProps = {
  id: string;
  column_values?: ValueProps[];
};

/**
 * Filters all items including the given filename.
 *
 * @example <caption>Example usage of filterItems.</caption>
 * const filteredItems = filterItems(items, "foobar")
 * // returns { id: string, column_values?: ValueProps[] }
 *
 * @param {Array} items - Array of items used for filtering.
 * @param {string} filename - The filename to filter for.
 *
 * @returns {Object} Object including filtered items and their respective id.
 */
export function filterItems(
  items: ItemProps[],
  filename: string
): FilteredItemsProps {
  const filteredItems = items.flatMap((item) => {
    // get all column values for given filename
    const filteredColumnValues = item.column_values.flatMap((col) => {
      if (col.value) {
        const { files }: FileValueProps = JSON.parse(col.value);

        // filter all column values where file includes filename
        return files.filter((f) => f.name.includes(filename));
      }
      // else return empty array
      return [];
    });

    // Return object with id and file value if file for given filename was found
    if (filteredColumnValues.length > 0) {
      return { id: item.id, column_values: filteredColumnValues };
    }

    // else return empty array
    return [];
  });

  // If no location to put the new file was found, return the first id
  // of the "datei" column to put the new file in
  if (!filteredItems || filterItems.length > 1) {
    console.log(
      "⚠ Upload directory could not be localized. Uploading to first item..."
    );
    return { id: items[0].id };
  }

  return filteredItems[0];
}
