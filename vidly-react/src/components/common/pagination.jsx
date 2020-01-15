import React from "react";
import _ from "lodash";

//Create an array of page numbers [1,2,3] and map each page number to a list item
//nb lodash used to create array
const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = itemsCount / pageSize;
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount <= 1) return null;

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
