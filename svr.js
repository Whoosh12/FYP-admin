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

async function getStudentEdit(req, res){
  const result = await db.findStudentEdit(req.params.id);
  if(result){
    res.json(result);
  } else {
    res.status(404).send('Nothing found');
  }
}

async function getSupervisorEdit(req, res){
  const result = await db.findSupervisorEdit(req.params.id);
  if(result){
    res.json(result);
  } else {
    res.status(404).send('Nothing found');
  }
}

async function getModeratorEdit(req, res){
  const result = await db.findModeratorEdit(req.params.id)
  if(result){
    res.json(result);
  } else {
    res.status(404).send('Nothing found');
  }
}

async function studentUpdate(req, res){
  console.log(req);
  const result = await db.updateStudent(req.body);
  res.json(result);
}

async function supervisorUpdate(req, res){
  console.log(req.body);
  const result = await db.updateSupervisor(req.body);
  res.json(result);
}

async function moderatorUpdate(req, res){
  const result = await db.updateModerator(req.body);
  res.json(result);
}

app.get('/students', getStudents);
app.post('/student', express.json(), asyncWrap(saveStudent));
app.get('/supervisors', getSupervisors);
app.get('/moderators', getModerators);
app.get('/student/:id', getStudentEdit);
app.get('/supervisor/:id', getSupervisorEdit);
app.get('/moderator/:id', getModeratorEdit);
app.put('/student/:id', express.json(), studentUpdate);
app.put('/supervisor/:id', express.json(), supervisorUpdate);
app.put('/moderator/:id', express.json(), moderatorUpdate);

app.listen(8080);