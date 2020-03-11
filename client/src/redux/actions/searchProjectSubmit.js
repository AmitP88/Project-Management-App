export const SEARCH_PROJECT_SUBMIT = "SEARCH_PROJECT_SUBMIT";

const searchProjectSubmit = (query) => {
  return {
    type: SEARCH_PROJECT_SUBMIT,
    query
  }
}

export default searchProjectSubmit;