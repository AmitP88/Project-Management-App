export const REQUEST_SUCCEEDED = 'REQUEST_SUCCEEDED';

const requestSucceeded = (requestStatus) => {
  return {
    type: REQUEST_SUCCEEDED,
    requestStatus
  }
}

export default requestSucceeded;