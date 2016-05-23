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

  if (curr == next) {
    return recursiveSort(swapAtIndex(list,index+1), 0);
  }

  if ((isEven(index) && (curr > next)) || ( isOdd(index) && (curr < next))) {
    return recursiveSort(swapAtIndex(list,index), 0);
  }

  return recursiveSort(list, getNextIndex(index, list.length));
}

function swapAtIndex(list, index) {
  var pointer = getNextDifferentNumberIndex(list, index);
  var curr = list[index];
  list[index] = list[pointer];
  list[pointer] = curr;
  return list;
}

function getNextDifferentNumberIndex(list, index) {
  var next_index = getNextIndex(index, list.length);

  if (list[index] !== list[next_index]) {
    return next_index;
  }

  return getNextDifferentNumberIndex(list, next_index);
}

function getNextIndex(index, length) {
  index++;
  if (index > length -1) {
    index = 0;
  }
  return index;
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

  if ((isEven(index) && (prev > item)) || ( isOdd(index) && (prev < item))) {
    return acc;
  }
  return false;
}

function toString(acc, item, index) {
  if (acc == "") {
    return item.toString();
  }
  return acc + ((isEven(index)) ? ">" : "<") + item;
}

function isEven(n) {
  return n % 2 == 0
}

function isOdd(number) {
  return !isEven(number);
}
