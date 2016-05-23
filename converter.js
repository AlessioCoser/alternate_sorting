module.exports = {
  sort,
};

function sort(list) {
  if (tooMuchDuplicates(list)) {
    throw new Error("Too much duplicates");
  } else {
    return recursiveSort(list).reduce(toString, "");
  }
}

function recursiveSort(list, index = 0) {
  if (list.reduce(isSorted, true)) {
    return list;
  }
  var curr = list[index];
  var next = list[index+1];

  if ((isEven(index) && (curr > next)) || (!isEven(index) && (curr < next))) {
    list[index] = next;
    list[index+1] = curr;
    return recursiveSort(list, 0);
  }

  if (curr == next) {
    var pointer = getNextDifferentNumberIndex(list, next, index+1);
    var nextNext = list[pointer];
    list[pointer] = next;
    list[index+1] = nextNext;
    return recursiveSort(list, 0);
  }

  index++;
  if (index > list.length -1) {
    index = 0;
  }
  return recursiveSort(list, index);
}

function getNextDifferentNumberIndex(list, next, pointer) {
  var nextNext = 0;
  do {
    pointer++;
    if( pointer > list.length -1)
      pointer = 0;

    nextNext = list[pointer];
  } while (next == nextNext);
  return pointer
}

function tooMuchDuplicates(list) {
  var countList = list
  .map((name) => { return {count: 1, name: name} })
  .reduce(groupDuplicates, {});

  var duplicates = Object.keys(countList)
  .filter((a) => countList[a] > Math.floor(list.length/2) );

  return (duplicates.length > 0) && (list.length > 2);
}

function groupDuplicates(acc, item) {
  acc[item.name] = (acc[item.name] || 0) + item.count
  return acc;
}

function isSorted(acc, item, index, array) {
  if (index == 0) {
    return acc;
  }
  var prev = array[index-1];

  if ((isEven(index) && (prev <= item)) || (!isEven(index) && (prev >= item))) {
    return false;
  }
  return acc;
}

function toString(accumulator, item, index) {
  if (accumulator === "") {
    return item.toString();
  }
  return accumulator + ((isEven(index)) ? ">" : "<") + item;
}

function isEven(n) {
  return n % 2 == 0
}
