import * as db from './dbAccess.js';
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
  res.json(await db.findAllStudents());
}

async function saveStudents(req, res) {
  const students = await db.saveStudents(req.body);
  res.json(students);
};

app.get('/student', asyncWrap(getStudents));
app.put('/student', asyncWrap(saveStudents));

app.listen(8080);