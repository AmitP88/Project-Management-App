export const REQUEST_SENT = 'REQUEST_SENT';

const requestSent = (requestStatus) => {
  return {
    type: REQUEST_SENT,
    requestStatus
  }
}

export default requestSent;