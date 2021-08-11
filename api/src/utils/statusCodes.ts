/**
 * HTTP status code: 401
 *
 * A 401 (Not authenticated) error indicates that you don't have permission to access the data you're attempting to access.
 *
 * Ensure your API key is valid and passed in the “Authorization” header.
 */
export const UNAUTHORIZED = 401;

/**
 * HTTP status code: 400
 *
 * A 400 (No query string was present) error indicates that the structure of your query string was passed incorrectly.
 *
 * Ensure your query string is passed with the “query” key, your request is sent as a POST request with a JSON body, and that your query does not contain unterminated strings.
 */
export const BAD_REQUEST = 400;

/**
 * HTTP status code: 500
 *
 * A 500 (No query string was present) error indicates that some formatting within your query string is incorrect.
 *
 * Check the format of any JSON strings in your query. If you are updating a column, check that you are using the right data structure for your column values.
 */
export const INTERNAL_SEVER_ERROR = 500;

/**
 * HTTP status code: 200
 *
 * A ```Parse error on...``` error indicates that some formatting in your query string is incorrect.
 *
 * Ensure your query is a valid string, and all parenthesis, brackets, and curly brackets are closed.
 */
export const PARSE_ERROR = 200;

/**
 * HTTP status code: 200
 *
 * A 200 (User unauthorized to perform action) error with a ```UserUnauthorizedException``` indicates that the user in question does not have the permissions to perform the action in question.
 *
 * Check if the user has permission to access or edit the given resource.
 */
export const USER_UNAUTHORIZED_EXCEPTION = 200;

/**
 * HTTP status code: 200
 *
 * A 200 error with a ```InvalidColumnIdException``` indicates that the column ID being passed in the query is not a valid column ID.
 *
 * Ensure the column ID exists and you have access to the column.
 */
export const INVALID_COLUMN_ID_EXCEPTION = 200;

/**
 * HTTP status code: 200
 *
 * A 200 error with a ```InvalidBoardIdException``` indicates that the board ID being passed in the query is not a valid board ID.
 *
 * Ensure the board ID exists and you have access to the board.
 */
export const INVALID_BOARD_ID_EXCEPTION = 200;

/**
 * HTTP status code: 200
 *
 * A 200 error with a ```CreateBoardException``` indicates that there was an error in your query to create a board.
 *
 * If you’re creating a board from a template, ensure the template ID is a valid monday template or a board that has template status. To learn more about making a board a template, check out our resource on board templates {@link https://support.monday.com/hc/en-us/articles/360001362625-Does-monday-com-offer-templates here}.
 *
 * If you’re duplicating a board, ensure the board ID exists.
 */
export const CREATE_BOARD_EXCEPTION = 200;

/**
 * HTTP status code: 200
 *
 * A 200 error with a ```ResourceNotFoundException``` indicates that the ID you are attempting to pass in your query is invalid.
 *
 * Ensure the ID of the item, group or board you’re querying exists.
 */
export const RESOURCE_NOT_FOUND_EXCEPTION = 200;

/**
 * HTTP status code: 200
 *
 * A 200 error with a ```ItemsLimitationException``` indicates that you have exceeded the limit of items allowed for a board.
 *
 * To prevent abuse, each board has a limit of 10,000 items created via the API. This error is thrown when you have reached the limit.
 */
export const ITEMS_LIMITATION_EXCEPTION = 200;

/**
 * HTTP status code: 200
 *
 * A 200 error with a ```ItemNameTooLongException``` indicates that the item name you have chosen has exceeded the amount of characters allowed.
 *
 * Ensure your item name is between 1 and 255 characters long.
 */
export const ITEM_NAME_TOO_LONG_EXCEPTION = 200;

/**
 * HTTP status code: 200
 *
 * A 200 error with a ```ColumnValueException``` indicates that the column value you are attempting to send in your query is of the incorrect formatting.
 *
 * If you are updating a column value, ensure the value conforms with each column’s data structure. To learn more about columns that support JSON values, check out the ```change_column_values()``` method {@link https://api.developer.monday.com/docs/change-column-values here}.
 *
 * If you’re retrieving a column value, ensure the column is supported by our API and not calculated in the client (eg, formula column).
 *
 * If you get the error "The column has no connected boards," ensure the Connect column you're referencing is connected to a board via the monday.com UI.
 */
export const COLUMN_VALUE_EXCEPTION = 200;

/**
 * HTTP status code: 200
 *
 * A 200 error with a ```CorrectedValueException``` indicates that the value you are attempting to send in your query is of the wrong type.
 *
 * If you try to update a column with simple values (```String``` values), ensure the column supports this type of value format.
 *
 * To learn more about columns that support simple values, check out the ```change_simple_column_values()``` method {@link https://api.developer.monday.com/docs/change-column-values here}.
 */
export const CORRECTED_VALUE_EXCEPTION = 200;
