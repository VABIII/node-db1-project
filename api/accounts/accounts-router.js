const router = require('express').Router()
const Accounts = require('./accounts-model')
const logger = require('./accounts-middleware')


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

router.post('/', logger, (req, res, next) => {
    Accounts.create(req.body)
        .then(newAccount => {
            res.status(201).json(newAccount)
        })
        .catch(next)


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
        message: `The Horror: ${err.message}`,
        stack: err.stack
    })
})

module.exports = router;
