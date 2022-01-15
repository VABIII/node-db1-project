const yup = require('yup')
const Accounts = require('./accounts-model')


const accountsSchema = yup.object({
    name: yup.string().trim().min(3).max(100).required(),
    budget: yup.number().min(0).max(1000000).required()
})

// exports.checkAccountPayload = async (req, res, next) => {
//     const {name, budget} = req.body
//     // const checkedBudget = parseInt(budget)
//
//     if(!name || !budget) {
//         next({status: 400, message: "name and budget are required" })
//     } else{next()}
//
//     // if(!name || !budget) {
//         // next({status: 400, message: 'name and budget are required'})
//     // } else if (!validated.name) {
//     //     next({status: 400, message: 'name of account must be between 3 and 100'})
//     // } else if (!validated.budget) {
//     //     next({status: 400, message: 'budget of account is too large or too small'})
//     // } else if (!checkedBudget){
//     //     next({status: 400, message: "budget of account must be a number"})
//     // } else (next())
//     // try{
//     //     const validated = await accountsSchema.validate(req.body)
//     //
//     // }
//     // catch(err) {
//     //     next(err)
//     // }
//
// }

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
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.logger = (req, res, next) => {
    console.log(`[${req.method}]  ${req.url} ${new Date()}`)
    console.log(`This is ${req.body}`)
    next()
}
