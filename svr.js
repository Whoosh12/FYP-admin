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

async function saveStudent(req, res) {
  const students = await db.saveStudent(req.body);
  res.json(students);
};

app.get('/students', getStudents);
app.post('/student', express.json(), asyncWrap(saveStudent));
// app.post('/student', function() {console.log('hello!') })

app.listen(8080);