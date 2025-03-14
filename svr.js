import express from 'express';

const app = express();
app.use(express.static('client', { extensions: ['html'] }));

function asyncWrap(f) {
    return (req, res, next) => {
      Promise.resolve(f(req, res, next))
        .catch((e) => next(e || new Error()));
    };
  }

async function getStudents(req, res){
  res.json(1);
}

app.get('/student', asyncWrap(getStudents));

app.listen(8080);