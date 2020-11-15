var express = require('express')
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())


app.use(express.static('./dist'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'src/'}),
);
app.listen(process.env.PORT || 8080);
