const yup = require('yup')
const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

const accountsSchema = yup.object({
    name: yup.string().trim().min(3).max(100).required(),
    budget: yup.number().min(0).max(1000000).required()
})




exports.checkAccountPayload = async (req, res, next) => {
    const {name, budget} = req.body

    if(!name || !budget) {
        next({status: 400, message:"Suck it Trebec!"})
    } else if (name.trim().length < 3 || name.trim().length > 100) {
        next({status:400, message: "Too long/not long enough"})
    } else if (isNaN(parseInt(budget))) {
        next({status: 400, message: "Budget must be a number"})
    } else if (budget < 0 || budget > 1000000) {
        next({status: 404, message: "Budget is fucked"} )
    }

    else {next()}
}


exports.checkAccountNameUnique = (req, res, next) => {

    try {
        const account =  db('accounts').where('name', req.body.name.trim()).first()
        if(!account) {
            next({
                status: 400,
                message: 'That name already exists'
            })
        } else {next()}

    }
    catch(err) {
        next(err)
    }

}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.logger = (req, res, next) => {
    console.log(`[${req.method}]  ${req.url} ${new Date()}`)
    console.log(`This is ${req.body}`)
    next()
}






















