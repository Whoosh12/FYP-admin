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
  const q = 'SELECT supervisorID, supervisorFName, supervisorLName, supervisorSlots FROM supervisor;'
  const r = await sql.query(q);
  return r.rows;
}

export async function findAllmoderators(){
  const q = 'SELECT moderatorID, moderatorFName, moderatorLName, moderatorSlots FROM supervisor;'
  const r = await sql.query(q);
  return r.rows;
}