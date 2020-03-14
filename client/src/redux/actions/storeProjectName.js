export const STORE_PROJECT_NAME = "STORE_PROJECT_NAME";

const storeProjectName = (projectName) => {
  return {
    type: STORE_PROJECT_NAME,
    projectName
  }
}

export default storeProjectName;