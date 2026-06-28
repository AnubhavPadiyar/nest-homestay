/**
 * Global error handling middleware for Express.
 * Catches errors thrown in route handlers and returns consistent JSON error responses.
 */

// 404 — route not found
function notFound(req, res, next) {
  const error = new Error(`Route not found — ${req.originalUrl}`)
  error.status = 404
  next(error)
}

// General error handler
function errorHandler(err, req, res, next) {
  const status = err.status || 500
  const message = err.message || "Internal Server Error"

  console.error(`[${new Date().toISOString()}] ${status} — ${message}`)

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  })
}

module.exports = { notFound, errorHandler }
