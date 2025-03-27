import config from './config.js';
import Postgres from 'pg';

const sql = new Postgres.Client(config);
sql.connect();

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

export async function saveStudent(student){
  const q = 'INSERT INTO student (studentID, firstName, lastName, course) VAlUES ($1, $2, $3, $4)';
  await sql.query(q, student.studentID, student.firstName, student.lastName, student.course);
}

export async function findAllStudents(){
  const q =  'SELECT * FROM students';
  const r = await sql.query(q);
  return r.rows;
}