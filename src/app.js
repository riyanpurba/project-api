const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const v1Routes = require('./routes/v1');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', v1Routes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
