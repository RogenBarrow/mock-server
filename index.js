const express = require('express')
const app = express()
const port = 80
var bodyParser = require('body-parser')

//middleware
app.use(bodyParser.text({ type: 'application/xml'}));

app.listen(port, () => {
    console.log(`The listen port is: http://localhost:${port}`)
});

app.post('/postxml', (req, res) => {
    res.status(200).send('OK')
    console.log(Date(), req.body);
});

app.post('/ping', (req, res) => {
    res.status(200).send('PONG')
});

app.get('/ping', (req, res) => {
    res.status(200).send('PONG')
})