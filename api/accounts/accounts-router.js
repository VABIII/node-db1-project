const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')

router.get('/',  (req, res, next) => {
    Accounts.getAll()
        .then(accounts => {
            res.json(accounts)
        })
        .catch(next)
})

router.get('/:id',  checkAccountId, (req, res, next) =>{
    res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique,(req, res, next) =>{
    const name = req.body.name.trim()
    const budget = req.body.budget

    Accounts.create({name, budget})
        .then(newAccount => {
            res.status(201).json(newAccount)
        })
        .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) =>{
    Accounts.updateById(req.params.id, req.body)
        .then(updated => {
            res.json(updated)
        })
        .catch(next)
})

router.delete('/:id', checkAccountId,(req, res, next) => {
    Accounts.deleteById(req.params.id)
        .then(() => {
            res.json(req.account)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router;



























