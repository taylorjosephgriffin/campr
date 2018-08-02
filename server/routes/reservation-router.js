const { Router } = require('express')

module.exports = function reservationRouter(collection) {
  const router = new Router()

  router.post('/', (req, res, next) => {
    collection
      .insertOne(req.body)
      .then(({ ops: [created] }) => {
        res.status(201).json(created)
      })
      .catch(err => next(err))
  })

  router.get('/', (req, res, next) => {
    collection
      .find()
      .toArray()
      .then(reservations => res.json(reservations))
      .catch(err => next(err))
  })

  router.get('/:reservationId', (req, res, next) => {
    collection
      .findOne({ reservationId: req.params.reservationId })
      .then(reservation => res.json(reservation))
      .catch(err => next(err))
  })
  return router
}
