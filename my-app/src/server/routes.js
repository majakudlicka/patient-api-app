const express = require('express');
const router = express.Router();
const request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//Route for a specific patient
router.get('/patient/:id', function(req, res) {
  let url = `https://api.interview.healthforge.io/api${req.url}`;
  request(url, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.send(body);
  });
});

//Route for all patient
router.get('/patient', function(req, res) {
  let page = req.query.page;
  let url = `https://api.interview.healthforge.io/api/patient?size=10&page=${page}`;
  request(url, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.send(body);
  });
});

module.exports = router;
