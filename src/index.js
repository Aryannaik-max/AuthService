const express = require('express');
const bodyParser = require('body-parser');  
const db = require('./models/index'); 

const app = express();

const { PORT, DB_SYNC } = require('./config/serverConfig');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.use('/api', require('./routes/index'));




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if(DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }
});