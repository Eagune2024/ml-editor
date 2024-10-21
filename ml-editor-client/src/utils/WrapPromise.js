export default function WrapPromise (promise) {
  let status = 'pending'
  let result;

  const suspender = promise.then((resole) => {
    status = 'success'
    result = resole
  }, (error) => {
    status = 'error'
    result = error
  })

  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    }
  }
}