const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const HttpError = require('./model/http-error')

const plansRoute = require('./routes/plan-route')

const app = express();


let port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.options('*', cors());


app.use('/api/plans', plansRoute)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});


mongoose
  .connect(
    "mongodb+srv://devendra:devendra@flexmoney.mniburm.mongodb.net/plans?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });



