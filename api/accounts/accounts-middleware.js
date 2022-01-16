const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
    const error = {status: 400}
    const {name, budget} = req.body

    if (name === undefined || budget === undefined) {
        error.message = 'name and budget are required'
    } else if (name.trim().length < 3 || name.trim().length > 100) {
        error.message = 'name of account must be between 3 and 100'
    } else if (typeof parseInt(budget) !== 'number') {
        error.message = 'budget of account must be a number'
    } else if (budget < 0 || budget > 100000) {
        error.message = 'budget of account is too large or too small'
    }

    if (error.message) {
        next(error)
    } else {
        next()
    }
}

exports.checkAccountNameUnique = (req, res, next) => {
    const name = req.body.name.trim().first()
    Accounts.checkName(name)
        .then(name => {
            if(name) {
                next({status: 400, message: 'that name is taken'})
            } else(next())
        })
        .catch(next)
}



exports.logger = (req, res, next) => {
    console.log(`[${req.method}]  ${req.url} ${new Date()}`)
    console.log(`This is ${req.body}`)
    next()
}






















