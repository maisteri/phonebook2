const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

const userExtractor = function(request, response, next) {
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  request.user = decodedToken.id
  next()
}

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get('authorization')
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    request.token = authHeader.substring(7)
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}