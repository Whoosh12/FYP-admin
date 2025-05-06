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

async function saveSupervisors(req, res) {
  const sup = await db.saveSupervisors(req.body);
  res.json(sup);
}

async function saveModerators(req, res) {
  const mod = await db.saveModerators(req.body);
  res.json(mod);
}

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
  const result = await db.updateStudent(req.body);
  res.json(result);
}

async function supervisorUpdate(req, res){
  const result = await db.updateSupervisor(req.body);
  res.json(result);
}

async function moderatorUpdate(req, res){
  const result = await db.updateModerator(req.body);
  res.json(result);
}

async function updateChoices(req, res){
  const choices = await db.updateChoices(req.body);
  res.json(choices);
}

async function setDefaultChoices(req, res){
  const choices = await db.setDefaultChoices(req.body);
  res.json(choices);
}

async function assignSupervisor(req, res){
  const prio = await db.assignSupervisor(req.body);
  res.json(prio);
}

async function getChosen(req, res){
  res.json(await db.findAllChosen());
}

async function updateSupSlots(req, res){
  const slots = await db.updateSupSlots(req.body);
  res.json(slots);
}

async function updateModSlots(req, res){
  const slots = await db.updateModSlots(req.body);
  res.json(slots);
}

async function assignModerator(req, res){
  const mod = await db.assignModerator(req.body);
  res.json(mod);
}

async function deleteStudent(req, res){
  const student = await db.deleteStudent(req.body);
  res.json(student);
}

async function deleteSupervisor(req, res){
  const staff = await db.deleteSupervisor(req.body);
  res.json(staff);
}

async function deleteModerator(req, res){
  const staff = await db.deleteModerator(req.body);
  res.json(staff);
}

async function updateAssignments(req, res){
  const id = await db.updateAssignments(req.body);
  res.json(id);
}

app.get('/students', getStudents);
app.post('/student', express.json(), asyncWrap(saveStudent));
app.post('/supervisors', express.json(), asyncWrap(saveSupervisors));
app.post('/moderators', express.json(), asyncWrap(saveModerators));
app.get('/supervisors', getSupervisors);
app.get('/moderators', getModerators);
app.get('/student/:id', getStudentEdit);
app.get('/supervisor/:id', getSupervisorEdit);
app.get('/moderator/:id', getModeratorEdit);
app.put('/student/:id', express.json(), studentUpdate);
app.put('/supervisor/:id', express.json(), supervisorUpdate);
app.put('/moderator/:id', express.json(), moderatorUpdate);
app.put('/choices/:id', express.json(), asyncWrap(updateChoices));
app.post('/choices', express.json(), asyncWrap(setDefaultChoices));
app.post('/assign', express.json(), asyncWrap(assignSupervisor));
app.get('/chosen', getChosen);
app.put('/supSlots', express.json(), asyncWrap(updateSupSlots));
app.put('/modSlots', express.json(), asyncWrap(updateModSlots));
app.put('/choices', express.json(), asyncWrap(updateChoices));
app.post('/assignMod', express.json(), asyncWrap(assignModerator));
app.post('/student/:id', express.json(), asyncWrap(deleteStudent));
app.post('/staff/:id', express.json(), asyncWrap(deleteSupervisor));
app.post('/moderator/:id', express.json(), asyncWrap(deleteModerator));
app.get('/assignedStudent/:id', express.json(), asyncWrap(updateAssignments));

app.listen(8080);