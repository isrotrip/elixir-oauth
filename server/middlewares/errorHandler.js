function errorHandler(err, req, res, next) {
  res.status(err.code || 500).json({
    error: err.msg
  });
}

module.exports = errorHandler;