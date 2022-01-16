const router = require('express').Router()
const Accounts = require('./accounts-model')
const {logger, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')

router.get('/',  (req, res, next) => {
    Accounts.getAll()
        .then(accounts => {
            res.json(accounts)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) =>{
    res.json(req.account)
})

router.post('/', (req, res, next) =>{
    const name = req.body.name.trim()
    const budget = req.body.budget

    Accounts.create({name, budget})
        .then(newAccount => {
            res.status(201).json(newAccount)
        })
        .catch(next)
})



module.exports = router;
