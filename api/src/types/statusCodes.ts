/**
 * Our monday.com GraphQL API returns the set of predefined errors listed below. If an exception is handled by the GraphQL application later, it will return a 200 status code and further information in the following structure:
 * @example
 * {
 *  "error_code": "SomeKindOfException",
 *  "status_code": 200,
 *  "error_message": "Some error happened",
 *  "errorData": {...}
 * }
 */
export type StatusCode = {
  error_code: string;
  status_code: number;
  error_message: string;
  errorData: Record<string, unknown>;
};
