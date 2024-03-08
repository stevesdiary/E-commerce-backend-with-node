const errorHandler = (error, req, res, next) =>  {
  const errorStatusCode = error.statusCode || 500;
 const errorMessage =  error.status || 'Something went wrong!';
  return res.status(errorStatusCode).json({
    success: false,
    status: errorStatusCode,
    message: errorMessage,
  });
};

module.exports = errorHandler;