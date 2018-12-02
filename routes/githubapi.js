var express = require('express');
var router = express.Router();

var request = require('request');

var baseUri = 'https://jobs.github.com/positions';


function montarUrl(query, callback) {
    var description = query.description;
    var location = query.location;
    var fulltime = query.full_time;

    url = baseUri + '.json?';

    if (description) url = `${url}description=${description}&`;
    if (location) url = `${url}location=${location}&`;
    if (fulltime) url = `${url}full_time=${fulltime}`
    callback(url);
}

router.get('/', (req, res, next) => {
    var query = req.query;
    montarUrl(query, (url) => {
        console.log('url', url);
        request.get(url, (error, response, body) => {
            if (error) {
                res.status(500);
                res.send({success: false, errorMessage: 'Falha ao tentar buscar dados.'});
            }
            res.send(body);
        });
    });
})

router.get('/job/:job_id', (req, res, next) => {
    var job_id = req.param('job_id');
    console.log('job_id', job_id);
    request.get(baseUri + '/' + job_id + '.json?markdown=true', (error, response, body) => {
        if (error) {
            res.status(500);
            res.send({success: false, errorMessage: 'Falha ao buscar dados da vaga de emprego :('});
        }
        var result = JSON.parse(body);
        console.log('result', result);
        res.render('job', {jobInfo: result});
    });
});

module.exports = router;