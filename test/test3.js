const Pet = require('../models/pet')

var now = Date.now()
Pet.create({
  id: 'g-' + now,
  name: 'Gaffey',
  gender: false,
  birth: '2007-07-07',
  createdAt: now,
  updatedAt: now,
  version: 0
})
  .then(function(p) {
    console.log('created.' + JSON.stringify(p))
  })
  .catch(function(err) {
    console.log('failed: ' + err)
  })
