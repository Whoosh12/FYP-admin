import express from 'express';

const app = express();
app.use(express.static('client', { extensions: ['html'] }));

function asyncWrap(f) {
    return (req, res, next) => {
      Promise.resolve(f(req, res, next))
        .catch((e) => next(e || new Error()));
    };
  }