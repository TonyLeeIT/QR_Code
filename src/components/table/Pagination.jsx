import React from "react";
import { useDispatch } from "react-redux";
import { PaginationAction } from "../../redux/actions/PaginationAction";
import "./pagination.scss";

export const Pagination = (props) => {
  const { page } = props;
  const dispatch = useDispatch();
  // const totaPages = Math.ceil(last_page / per_page);
  const nextPage = () => {
    dispatch(PaginationAction.nextPage(page.current_page));
  };

  const prevPage = () => {
    dispatch(PaginationAction.prevPage(page.current_page));
  };

  return (
    <div>
      <button
        style={{ marginRight: "20px" }}
        // disabled={page <= 1}
        onClick={() => prevPage()}
      >
        Prev
      </button>
      <button
        // disabled={page >= totalPages}
        onClick={() => nextPage()}
      >
        Next
      </button>
      <span> Current Page : {page.current_page} </span>
      <span> Last Page : {page.last_page} </span>
    </div>
  );
};
