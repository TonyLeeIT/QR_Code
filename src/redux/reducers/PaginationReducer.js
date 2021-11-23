const initailSate = {
  size: 5,
  page: 0,
  searchKeyWord: "",
};

export const PaginationReducer = (state = initailSate, action) => {
  switch (action.type) {
    case "NEXT_PAGE":
      const nextPage = action.payload + 1;
      return {
        ...state,
        page: nextPage,
      };
    case "PREV_PAGE":
      const prevPage = action.payload - 1;
      return {
        ...state,
        page: prevPage,
      };
    case "GET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SEARCH_PAGE":
      return {
        ...state,
        searchKeyWord: action.payload,
      };
    default:
      return state;
  }
};
