const express = require('express'),
      app = express(),
      prometheusClient = require('prom-client'),
      server = require('http').createServer(app);
let port = process.env.PORT || 3030;

const serviceCallsCounter = new prometheusClient.Counter({ 
    name: 'service_calls_counter', 
    help: 'Number of calls served for this service.' 
});

app.get('/', function (req, res) {
    serviceCallsCounter.inc();
    res.send('Call served!');
});

app.get('/metrics', (req, res) => {
    res.set('Content-Type', prometheusClient.register.contentType);
    res.end(prometheusClient.register.metrics());
});

server.listen(port);

console.log('server listening on port: ' + port);

prometheusClient.collectDefaultMetrics();
