const { log } = console

function generate(numRows) {
  if(numRows == 0) return
  let result = [];
  for(let i = 0; i < numRows; i++){
    let row = [];
    row[0] = 1;
    row[i] = 1;
    if(i > 1){
      for( let j = 1; j < i; j++){
        row[j] = result[i - 1][j - 1] + result[i - 1][j];
      }
    }
    result.push(row)
  }
  return result
}

log(generate(10))