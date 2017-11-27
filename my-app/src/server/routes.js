const express = require('express');
const router = express.Router();
const request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//Route for a specific patient
router.get('/patient/:id', function(req, res) {
  //res.json()
  res.send('individual patient');
});

//Route for all patient
router.get('/patient', function(req, res) {
  request('https://api.interview.healthforge.io/api/patient', function(
    error,
    response,
    body
  ) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
  //res.json()
  // res.send([{name: 'John Doe', id: 1}, {name: 'Jane Doe', id: 2}]);
});

module.exports = router;
