export function mapTo(array, mapValue) {
  if (typeof array[0] === 'number') {
    return array.map((_, index) => index);
  }
  const result = array.reduce((prevValue, currValue) => {
    if (currValue.hasOwnProperty(mapValue)) {
      prevValue.push(currValue.name);
    }
    return prevValue;
  }, []);

  return result;
}

function isValueNull(value) {
  if (value) {
    return value;
  }
  return null;
}

function createName(name, surname) {
  if (name || surname) {
    return `${name ?? "_"} ${surname ?? "_"}`;
  }
  return null;
}

export function mapToProfile(array) {
  return array.map((elem) => {
    return Object.defineProperties({
        name: isValueNull(elem.name),
        surname: isValueNull(elem.surname),
        fullname: createName(elem.name, elem.surname),
        age: isValueNull(elem.age),
      },

      {
        isOld: {
          get: function () {
            return this.age >= 18;
          },
        },
        isAnonymous: {
          get: function () {
            return this.name === null;
          },
        },
      }
    );
  });
}

export function filterBy(array, filterValue) {
  let filteredArray = [];
  filteredArray = array.filter(arrElement => {
    if (typeof filterValue === 'string') {
      return arrElement.hasOwnProperty(filterValue);
    } else if (typeof filterValue === 'object') {
      return arrElement.hasOwnProperty(filterValue.property)
        && filterValue.filterCb(arrElement.age);
    }
    return arrElement >= filterValue;
  });

  return filteredArray;
}

export function reduceTo(array, reduceValue) {
  let outputArray = [];
  if (!reduceValue) {
    outputArray = array.reduce((prevValue, currValue) => prevValue + currValue)
    return outputArray;
  } else if (typeof reduceValue === 'string') {
    outputArray = array.reduce((prevValue, currValue) => (prevValue + currValue[reduceValue]), 0);
    return outputArray;
  }

  const total = array.reduce((prevValue, currValue) => (prevValue + currValue[reduceValue[0]]), 0);
  const difference = array.reduce((prevValue, currValue) => (prevValue + currValue[reduceValue[1]]), 0);
  return outputArray.concat(total, difference);
}

export function sort(array, sortValue) {
  const outputArray = array.sort((firstEl, secondEl) => {
    if (!sortValue) {
      return firstEl - secondEl;
    } else if (typeof sortValue === 'string') {
      return firstEl[sortValue] - secondEl[sortValue];
    }
    for (let i = 0; i < sortValue.length; i++) {
      const value = sortValue[i];

      const field = value.field ?? value;
      const order = value.order ?? "asc";

      if (firstEl[field] > secondEl[field]) {
        return order === "asc" ? 1 : -1;
      }
      if (firstEl[field] < secondEl[field]) {
        return order === "asc" ? -1 : 1;
      }
    }
  });

  return outputArray;
}

export function complex(array, complexValue) {
  const Operations = { FILTER: 'filter', MAP: 'map', REDUCE: 'reduce', SORT: 'sort' };

  let modifiedArray = array;
  complexValue.forEach(index => {
    switch (index.operation) {
      case Operations.FILTER:
        modifiedArray = modifiedArray.filter(arr => index.callback(arr[index.property]));
        break;
      case Operations.MAP:
        modifiedArray = modifiedArray.map(arr => arr[index.property]);
        break;
      case Operations.REDUCE:
        modifiedArray = modifiedArray
          .reduce((prevValue, currValue) => prevValue + currValue.total, 0);
        break;
      case Operations.SORT:
        modifiedArray = modifiedArray.sort((firstEl, secondEl) => secondEl - firstEl);
        break;
    }
  });

  return modifiedArray;
}