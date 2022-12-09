var express = require('express'); 
var router = express.Router();
var path = require('path');
var cors = require('cors');

const app = express();
const port = 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var recieverRouter = require('./contractApi/recieverCall');
var senderRouter = require('./contractApi/senderCall');

app.use(cors());
app.use('/recieverCall', recieverRouter);
app.use('/senderCall', senderRouter);


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





module.exports = router;