import config from './config.js';
import Postgres from 'pg';

const sql = new Postgres.Client(config);
sql.connect();

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

export async function saveStudent(student){
  const q = 'INSERT INTO student (studentID, firstName, lastName, course) VAlUES ($1, $2, $3, $4);';
  await sql.query(q, [student.studentID, student.firstName, student.lastName, student.course]);
}

export async function findAllStudents(){
  const q =  'SELECT studentID, firstName, lastName, course, supervisorFName, supervisorLName, moderatorFName, moderatorLName FROM student INNER JOIN supervisor ON student.supervisorID = supervisor.supervisorID INNER JOIN moderator ON student.moderatorID = moderator.moderatorID;';
  const r = await sql.query(q);
  return r.rows;
}

export async function findAllSupervisors(){
  const q = 'SELECT supervisorID, supervisorFName, supervisorLName, supervisorSlots FROM supervisor;';
  const r = await sql.query(q);
  return r.rows;
}

export async function findAllmoderators(){
  const q = 'SELECT moderatorID, moderatorFName, moderatorLName, moderatorSlots FROM supervisor;';
  const r = await sql.query(q);
  return r.rows;
}

export async function findStudentEdit(id){
  const q = 'SELECT studentid, firstName, lastName, course, supervisorFName, supervisorLName, moderatorFName, moderatorLName FROM student INNER JOIN supervisor ON student.supervisorID = supervisor.supervisorID INNER JOIN moderator ON student.moderatorID = moderator.moderatorID WHERE studentID = $1;';
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
  const q = 'UPDATE student SET firstname = $1, lastname = $2, course = $3, supervisorfname = $4, supervisorlname = $5, moderatorfname = $6, moderatorlname = $7 WHERE studentid = $8;';
  await sql.query(q, [student.firstname, student.lastname, student.course, student.supervisorfname, student.supervisorlname, student.moderatorfname, student.moderatorlname, student.id]);
}

export async function updateSupervisor(supervisor){
  const q = 'UPDATE supervisor SET supervisorfname = $1, supervisorlname = $2, supervisorslots = $3 WHERE supervisorid = $4;';
  await sql.query(q, [supervisor.supervisorfname, supervisor.supervisorlname, supervisor.supervisorslots, supervisor.supervisorid]);
}

export async function updateModerator(moderator){
  const q = 'UPDATE moderator SET moderatorfname = $1, moderatorlname = $2, moderatorslots = $3 WHERE moderatorid = $4;';
  await sql.query(q, [moderator.moderatorfname, moderator.moderatorlname, moderator.moderatorslots, moderator.moderatorid]);
}