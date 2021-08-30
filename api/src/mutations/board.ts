export const uploadFile = (itemId: string): string =>
  `mutation ($file: File!) {
    add_file_to_column (file: $file, item_id: ${itemId}, column_id: "datei") {
      id
    }
  }`;
