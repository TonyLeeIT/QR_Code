import React from "react";
import { useDispatch } from "react-redux";
import { PaginationAction } from "../../redux/actions/PaginationAction";
import "./pagination.scss";

export const Pagination = (props) => {
  const { page } = props;
  const dispatch = useDispatch();
  const nextPage = () => {
    dispatch(PaginationAction.nextPage(page.number));
  };

  const prevPage = () => {
    dispatch(PaginationAction.prevPage(page.number));
  };

  return (
    <div className="table__pagination">
      <button
        className="table__pagination__button"
        disabled={page.number <= 0}
        onClick={() => prevPage()}
      >
        {"<<<"}
      </button>
      <button
        className="table__pagination__button"
        onClick={() => dispatch(PaginationAction.getPage(0))}
      >
        1
      </button>
      {page.totalPages >= 2 && (
        <button
          className="table__pagination__button"
          onClick={() => dispatch(PaginationAction.getPage(1))}
        >
          2
        </button>
      )}
      {page.totalPages > 3 && (
        <button className="table__pagination__button">...</button>
      )}
      {page.totalPages > 2 && (
        <button
          className="table__pagination__button"
          onClick={() =>
            dispatch(PaginationAction.getPage(page.totalPages - 1))
          }
        >
          {page.totalPages}
        </button>
      )}
      <button
        className="table__pagination__button"
        disabled={page.number > page.totalPages - 2}
        onClick={() => nextPage()}
      >
        {">>>"}
      </button>
      <span style={{ marginLeft: "50px" }}>
        page : {page.number + 1} of total pages : {page.totalPages}
      </span>
    </div>
  );
};
