const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error("❌ CEMS Server Error:");
  console.error(err);

  const statusCode =
    err.statusCode || 500;

  const message =
    err.message || "Internal Server Error";

  const errors =
    err.errors || [];

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorMiddleware;