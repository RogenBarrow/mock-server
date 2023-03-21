const express = require('express');
const app = express();
const port = 5055;
const bodyParser = require('body-parser');
const router = require('./router');


//middleware
app.use(bodyParser.text({ type: 'application/xml'}));
app.use(router);

app.listen(port, () => {
    console.log(`The listen port is: http://localhost:${port}`)
});
