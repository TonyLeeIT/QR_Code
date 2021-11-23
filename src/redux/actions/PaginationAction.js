const nextPage = (page) => {
  return {
    type: "NEXT_PAGE",
    payload: page,
  };
};
const prevPage = (page) => {
  return {
    type: "PREV_PAGE",
    payload: page,
  };
};

const getPage = (page) => {
  return {
    type: "GET_PAGE",
    payload: page,
  };
};

const searhPage = (searchKeyWord) => {
  return {
    type: "SEARCH_PAGE",
    payload: searchKeyWord,
  };
};

export const PaginationAction = {
  nextPage,
  prevPage,
  getPage,
  searhPage,
};
