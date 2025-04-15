import config from './config.js';
import Postgres from 'pg';

const sql = new Postgres.Client(config);
sql.connect();

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

export async function saveStudent(student){
  const q = 'INSERT INTO student (firstName, lastName, course, markSup) VAlUES ($1, $2, $3, false);';
  await sql.query(q, [student.firstname, student.lastname, student.course]);
}

export async function saveSupervisors(supervisors){
  const q1 = 'INSERT INTO supervisor (supervisorid, supervisorfname, supervisorlname, course, supervisorslots) VALUES ($1, $2, $3, $4, $5);';
  await sql.query(q1, [supervisors.id, supervisors.fname, supervisors.lname, supervisors.course, supervisors.slots]);
}

export async function saveModerators(moderators){
  const q2 = 'INSERT INTO moderator (moderatorid, moderatorfname, moderatorlname, course, moderatorslots) VALUES ($1, $2, $3, $4, $5);';
  await sql.query(q2, [moderators.id, moderators.fname, moderators.lname, moderators.course, moderators.slots]);
}

export async function findAllStudents(){
  const q =  'SELECT studentID, firstName, lastName, student.course, markSup, supervisorFName, supervisorLName, moderatorFName, moderatorLName FROM student INNER JOIN supervisor ON student.supervisorID = supervisor.supervisorID INNER JOIN moderator ON student.moderatorID = moderator.moderatorID;';
  const r = await sql.query(q);
  return r.rows;
}

export async function findAllSupervisors(){
  const q = 'SELECT supervisorID, supervisorFName, supervisorLName, supervisorSlots, course FROM supervisor;';
  const r = await sql.query(q);
  return r.rows;
}

export async function findAllmoderators(){
  const q = 'SELECT moderatorID, moderatorFName, moderatorLName, moderatorSlots FROM moderator;';
  const r = await sql.query(q);
  return r.rows;
}

export async function findStudentEdit(id){
  const q = 'SELECT studentid, firstName, lastName, student.course, student.supervisorid, supervisorFName, supervisorLName, student.moderatorid, moderatorFName, moderatorLName FROM student INNER JOIN supervisor ON student.supervisorID = supervisor.supervisorID INNER JOIN moderator ON student.moderatorID = moderator.moderatorID WHERE studentID = $1;';
  const r = await sql.query(q, [id]);
  return r.rows[0];
}

export async function findSupervisorEdit(id){
  const q = 'SELECT * FROM supervisor WHERE supervisorID = $1;';
  const r = await sql.query(q, [id]);
  return r.rows[0];
}

export async function findModeratorEdit(id){
  const q = 'SELECT * FROM moderator WHERE moderatorID = $1;';
  const r = await sql.query(q, [id]);
  return r.rows[0];
}

export async function updateStudent(student){
  const q = 'UPDATE student SET firstname = $1, lastname = $2, course = $3, supervisorid = $4, moderatorid = $5 WHERE studentid = $6;';
  await sql.query(q, [student.firstname, student.lastname, student.course, student.supervisorid, student.moderatorid, student.id]);
}

export async function updateSupervisor(supervisor){
  const q = 'UPDATE supervisor SET supervisorfname = $1, supervisorlname = $2, supervisorslots = $3 WHERE supervisorid = $4;';
  await sql.query(q, [supervisor.supervisorfname, supervisor.supervisorlname, supervisor.supervisorslots, supervisor.supervisorid]);
}

export async function updateModerator(moderator){
  const q = 'UPDATE moderator SET moderatorfname = $1, moderatorlname = $2, moderatorslots = $3 WHERE moderatorid = $4;';
  await sql.query(q, [moderator.moderatorfname, moderator.moderatorlname, moderator.moderatorslots, moderator.moderatorid]);
}

export async function updateChoices(choices){
  const q = 'UPDATE student_choice SET choice1 = $1, choice2 = $2, choice3 = $3 WHERE studentid = $4;';
  await sql.query(q, [choices.choice1, choices.choice2, choices.choice3, choices.id]);
}

export async function setDefaultChoices(choices){
  const q = 'INSERT INTO student_choice (studentid, choice1, choice2, choice3) VALUES ($1, 1, 1, 1);';
  await sql.query(q, [choices.id]);
}

export async function assignSupervisor(choice){
  const q = 'UPDATE student SET supervisorid = $1, markSup = true WHERE studentid = $2;';
  await sql.query(q, [choice.supervisorid, choice.id]);
}

export async function minusSlots(supervisor){
  const q = 'UPDATE supervisor SET supervisorslots = $1 WHERE supervisorid = $2;';
  await sql.query(q, [supervisor.slots, supervisor.id]);
}

export async function findAllChosen(){
  const q = 'SELECT student.studentid, student.course, choice1, choice2, choice3, marksup FROM student INNER JOIN student_choice ON student.studentid = student_choice.studentid WHERE choice1 = 1 AND choice2 = 1 AND choice3 = 1 AND marksup = false;';
  const r = await sql.query(q);
  return r.rows;
}

// INNER JOIN supervisor ON student.supervisorid = supervisor.supervisorid
// supervisorslots
// WHERE choice1 = 1 AND choice2 = 1 AND choice3 = 1 AND marksup = false