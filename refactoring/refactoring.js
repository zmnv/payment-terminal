const func = require('./refactoring-original');
const funcNew = require('./refactoring-new');

function Main() {
  const inputString = ',1404567.';
  const inputA = ',';
  const inputB = '.';

  console.log('------------------------');

  console.log(`\
s: ${inputString}
a: ${inputA}
b: ${inputB}\
`);

  showDifference(
    func(inputString, inputA, inputB),
    funcNew(inputString, inputA, inputB)
  );

  console.log('------------------------');
}

function showDifference(oldResult, newResult) {
  console.log(`result func: ${oldResult}`);
  console.log(`result funcNew: ${newResult}`);
  if (oldResult == newResult) console.log('\x1b[92mSuccess!\x1b[0m')
}

Main();
