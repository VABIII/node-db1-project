const router = require('express').Router()
const Accounts = require('./accounts-model')
const {logger, checkAccountPayload} = require('./accounts-middleware')


router.get('/', logger, (req, res, next) => {
  Accounts.getAll()
      .then(accounts =>{
          res.json(accounts)
      })
      .catch(next)
})

router.get('/:id', logger, (req, res, next) => {
  Accounts.getById(req.params.id)
      .then(account => {
          res.json(account)
      })
      .catch(next)
})

router.post('/', logger, checkAccountPayload, (req, res, next) => {
    Accounts.create(req.body)
        .then(newAccount => {
            res.status(201).json(newAccount)
        })
        .catch(err => {
            next({status: 400, message: err.message})
        })
})

router.put('/:id', (req, res, next) => {

    Accounts.updateById(req.params.id, req.body)
        .then(updates => {
            res.json(updates)
            })
        .catch(next)
});

router.delete('/:id', (req, res, next) => {
    const {id} = req.params

    Accounts.getById(id)
        .then(account => {
            res.json(account)
            return Accounts.deleteById(id)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    console.log('disaster!')
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

// router.use((err, req, res, next) => { // eslint-disable-line
//     res.status(err.status || 500).json({
//         message: err.message,
//         stack: err.stack
//     })
// })


module.exports = router;
