const num_iterations_for_bcrypt = 10;

const invoker = (promise) => {
  return promise
    .then((res) => {
      return [res, null];
    })
    .catch((err) => {
      return [null, err];
    })
}

const writeResponse = (err, data, res) => {
  if(err) {
    let ecode = 500;
    if(err.code) ecode = err.code; 
    return res.status(ecode).json({
      error: true,
      message: err.msg 
    })
  }
  return res.status(200).json({
    error: false,
    message: 'success',
    ...data
  });
}

module.exports = {
  invoker,
  writeResponse,
  num_iterations_for_bcrypt
}