const { Router } = require('express')

module.exports = function campgroundRouter(collection) {
  const router = new Router()

  router.get('/', (req, res, next) => {
    const validPrice = !isNaN(req.query.maxPrice)
    const validAmenity = req.query.amenities
    const validLong = req.query.longitude
    const validLat = req.query.latitude

    let filterQuery = {}

    if (validLong && validLat && !validPrice && !validAmenity) {
      filterQuery = {
        'location': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [ parseInt(req.query.longitude), parseInt(req.query.latitude) ]
            },
            $maxDistance: parseInt(req.query.distance)
          }
        }
      }
    }

    if (validAmenity && !validPrice) {
      filterQuery.amenities = {
        $all: req.query.amenities
      }
    }
    else if (validPrice && !validAmenity) {
      filterQuery.price = {
        $lt: parseInt(req.query.maxPrice, 10)
      }
    }
    else if (validPrice && validAmenity) {
      filterQuery = {
        $and: [
          { amenities:
            { $all: req.query.amenities }
          },
          { price: { $lt: parseInt(req.query.maxPrice, 10) } }
        ]
      }
    }

    collection
      .find(filterQuery)
      .toArray()
      .then(campgrounds => res.json(campgrounds))
      .catch(err => next(err))
  })

  router.get('/:id', (req, res, next) => {
    collection
      .findOne({ id: req.params.id })
      .then(campground => res.json(campground))
      .catch(err => next(err))
  })
  return router
}
