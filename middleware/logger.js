// @desc Logs request to console
const logger = (req, res, next) => {
  req.hello = "HEllo World"
  console.log("Middleware run")
  next()
}

module.exports = logger;