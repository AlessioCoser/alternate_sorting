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
  if (isSorted(list)) {
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

  return recursiveSort(list, incrementIndex(index, list.length));
}

function swapAtIndex(list, index) {
  var pointer = getNextDifferentNumberIndex(list, index);
  var curr = list[index];
  list[index] = list[pointer];
  list[pointer] = curr;
  return list;
}

function getNextDifferentNumberIndex(list, index) {
  var next_index = incrementIndex(index, list.length);

  if (list[index] !== list[next_index]) {
    return next_index;
  }

  return getNextDifferentNumberIndex(list, next_index);
}

function incrementIndex(index, length) {
  index++;
  if (index > length -1) {
    index = 0;
  }
  return index;
}

function tooMuchDuplicates(list) {
  var tooMuch = list.reduce((acc, item, index, array) => {
    if (acc === true) {
      return acc;
    }

    if (acc[item] >= Math.floor(array.length/2)) {
      return true;
    }

    acc[item] = (acc[item] || 0) + 1
    return acc;
  }, {});

  return (tooMuch === true);
}

function isSorted(list) {
  return list.reduce((acc, item, index, array) => {
    if (index == 0) {
      return acc;
    }
    var prev = array[index-1];

    if ((isEven(index) && (prev > item)) || ( isOdd(index) && (prev < item))) {
      return acc;
    }
    return false;
  }, true);
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
