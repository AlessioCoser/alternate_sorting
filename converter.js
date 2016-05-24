module.exports = {
  sort,
};

function sort(list) {
  if (tooMuchDuplicates(list)) {
    throw new Error('Too much duplicates');
  } else {
    return recursiveSort(list).reduce(toString, '');
  }
}

function recursiveSort(list, index = 0) {
  if (isAlternateSorted(list)) {
    return list;
  }
  var curr = list[index];
  var next = list[index+1];

  if (curr == next) {
    return recursiveSort(swapAtIndex(list, index+1), 0);
  }

  if (isCorrectCouple(curr, next, index)) {
    return recursiveSort(swapAtIndex(list, index), 0);
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
  var nextIndex = incrementIndex(index, list.length);

  if (list[index] !== list[nextIndex]) {
    return nextIndex;
  }

  return getNextDifferentNumberIndex(list, nextIndex);
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

  return tooMuch === true;
}

function isAlternateSorted(list) {
  return list.reduce((acc, item, index, array) => {
    if (index == 0) {
      return acc;
    }
    var prev = array[index-1];

    if (isCorrectCouple(prev, item, index)) {
      return acc;
    }
    return false;
  }, true);
}

function toString(acc, item, index) {
  if (acc == '') {
    return item.toString();
  }
  return acc + ((isEven(index)) ? '>' : '<') + item;
}

function isCorrectCouple(prev, next, index) {
  return (isEven(index) && (prev > next)) || ( isOdd(index) && (prev < next));
}

function isEven(n) {
  return n % 2 == 0
}

function isOdd(number) {
  return !isEven(number);
}
