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

async function getSupervisors(req, res){
  res.json(await db.findAllSupervisors());
}

async function getModerators(req, res){
  res.json(await db.findAllmoderators());
}

app.get('/students', getStudents);
app.post('/student', express.json(), asyncWrap(saveStudent));
app.get('/supervisors', getSupervisors);
app.get('/moderators', getModerators);

app.listen(8080);