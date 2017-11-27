const express = require('express');
const router = express.Router();

//Route for a specific patient
router.get('/patient/:id', function(req, res) {
  //res.json()
  res.send('individual patient');
});

//Route for all patient
router.get('/patient', function(req, res) {
  //res.json()
  res.send([{name: 'John Doe', id: 1}, {name: 'Jane Doe', id: 2}]);
});

module.exports = router;
