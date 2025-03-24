// import assert from 'node:assert';
// import { parse } from 'csv-parse/sync';

// const file = fileInput.value;

// const input = `
// "key_1","key_2"
// "value 1","value 2"
// `;
// const records = parse(input, {
//   columns: true,
//   skip_empty_lines: true
// });
// assert.deepStrictEqual(
//   records,
//   [{ key_1: 'value 1', key_2: 'value 2' }]
// );

function submitFile(){
    console.log('a');
    console.log(document.querySelector('#fileInput').files);
}

function init(){
    const fileInput = document.querySelector('#fileInput');
    const inputButton = document.querySelector('#inputButton');
    inputButton.addEventListener('click', submitFile);
}

init();