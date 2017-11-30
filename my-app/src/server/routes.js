const express = require('express');
const router = express.Router();
const request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//Route for a specific patient
router.get('/patient/:id', function(req, res) {
  console.log('req url is ', req.url);
  let url = `https://api.interview.healthforge.io/api${req.url}`;
  request(url, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.send(body);
  });
});

//Route for all patient
router.get('/patient', function(req, res) {
  let url;
  if (req.query.page) {
    let page = req.query.page;
    url = `https://api.interview.healthforge.io/api/patient?size=10&page=${page}`;
  } else {
    url = 'https://api.interview.healthforge.io/api/patient?size=100';
  }
  request(url, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.send(body);
  });
});

//Route for all patient
// router.get('/filteredPatient', function(req, res) {
//   let lastName = req.query.lastName;
//   let url = `https://api.interview.healthforge.io/api/patient?&lastName=${lastName}`;
//   request(url, function(error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     res.send(body);
//   });
// });

module.exports = router;
