import _ from "lodash";

/**
 * Use lodash utility methods to implement pagination on the client side.
 * Calculate the start index of the items on this page
 * First go to the start index and take all the items fro the current page.
 *  Use lodash to to slice the items array from the startIndex.
 * We can now take items from this array for the current page.
 * Then we need to convert the lodash wrapper object to a regular array, using value()
 * @param {*} items -array of items to be paginated
 * @param {*} pageNumber -The page number we are on
 * @param {*} pageSize - The number of itmes to fit on the page size
 */

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
