const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next() // do not end with response, use next() to go to next middleware 
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorizationth = request.get('Authorization')
    if (authorizationth && authorizationth.toLowerCase().startsWith('bearer ')) {
        request.token = authorizationth.substr(7)
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}