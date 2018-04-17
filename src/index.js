const express             = require('express');
const OneSphere           = require('@hpe/hpe-onesphere-js').default;

console.log(process.env);

const app = express();

app.set('port', process.env.PORT || 80);
app.use('/', express.static('react-app/build'));

// middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// launching server
app.listen(app.get('port'), (err) => {
  if (err) throw err;
  console.log(`listening on: ${app.get('port')}`);
});


app.get('/api/info', (req, res) => {
  console.log('got request');
  res.status(200).send({
    version: 2,
  });
});
