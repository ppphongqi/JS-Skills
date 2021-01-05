const { log } = console

function searchInsert(nums,target){
  let array = new Array();
  array = [...nums]
  if(array.includes(target)){
    return array.indexOf(target)
  }
  let flag = false
  array.forEach( (item, index) => {
    if( target < item  && !flag){
      flag = true
      array.splice(index, 0 , target)
      return array
    }
  })
  if(flag){
    return array.indexOf(target)
  }else{
    return array.length 
  }
}

log(searchInsert([1,3,5,6], 4))