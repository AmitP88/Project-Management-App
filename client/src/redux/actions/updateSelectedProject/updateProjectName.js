export const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME';

const updateProjectName = (name) => {
  return {
    type: UPDATE_PROJECT_NAME,
    name
  }
}

export default updateProjectName;