const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message);

    return res.status(400).json({
      message: "Validation failed",
      errors
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON payload"
    });
  }

  res.status(500).json({
    message: "Something went wrong"
  });
};

module.exports = errorHandler;
