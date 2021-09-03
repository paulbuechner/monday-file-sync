export type FileUploadMutationResponse = {
  data: { add_file_to_column: { id: string; name: string } };
  account_id: number;
};

export const uploadFile = (itemId: string, column_id: string): string =>
  `mutation ($file: File!) {
    add_file_to_column (file: $file, item_id: ${itemId}, column_id: "${column_id}") {
      id
      name
    }
  }`;
