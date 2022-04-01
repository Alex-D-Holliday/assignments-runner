export function mapTo(array, mapValue) {
    if (typeof array[0] === 'number') {
        return array.map((_, index) => index);
    }
    //return array.filter(arr => arr.hasOwnProperty(mapValue)).map((value) => value.name);
    // or this
    return array.reduce((previousValue, currentValue) => {
        if (currentValue.hasOwnProperty(mapValue)) {
            previousValue.push(currentValue.name);
        }
        return previousValue;
    }, []);
}

export function mapToProfile(array) {
    return array.map((arr) => {
        return Object.defineProperties({
                name: arr.name || null,
                surname: arr.surname || null,
                fullname: arr.name || arr.surname
                    ? `${arr.name ?? "_"} ${arr.surname ?? "_"}`
                    : null,
                age: arr.age || null,
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
    if (typeof array[0] === 'number') {
        return array.filter(arr => arr >= filterValue);
    } else if (typeof filterValue === 'string') {
        return array.filter(arr => arr.hasOwnProperty(filterValue));
    }
    return array.filter(arr => arr.hasOwnProperty(filterValue.property)
        && filterValue.filterCb(arr.age));
}

export function reduceTo(array, reduceValue) {
    let outputArray = [];
    if (typeof array[0] === 'number') {
        return array.reduce((previousValue, currentValue) => previousValue + currentValue);
    } else if (typeof reduceValue === 'string') {
        return array.reduce((previousValue, currentValue) => (previousValue + currentValue[reduceValue]), 0);
    }
    let total = array.reduce((previousValue, currentValue) => (previousValue + currentValue[reduceValue[0]]), 0);
    let difference = array.reduce((previousValue, currentValue) => (previousValue + currentValue[reduceValue[1]]), 0);
    return outputArray.concat(total, difference);
}

export function sort(array, sortValue) {
    if (typeof array[0] === 'number') {
      return array.sort();
    } else if (typeof sortValue === 'string') {
      return array.sort((firstEl, secondEl) => (firstEl[sortValue] - secondEl[sortValue]));
    } else if (typeof sortValue[1] === 'string') {
      return array.sort((firstEl, secondEl) => firstEl[sortValue[0]] === secondEl[sortValue[0]]
        ? firstEl[sortValue[1]] - secondEl[sortValue[1]]
        : firstEl[sortValue[0]] - secondEl[sortValue[0]]);
    } else {
        return array.sort((firstEl, secondEl) => {
            if (sortValue[1].order === 'desc') {
                return firstEl[sortValue[0]] === secondEl[sortValue[0]]
                    ? secondEl[sortValue[1].field] - firstEl[sortValue[1].field]
                    : firstEl[sortValue[0]] - secondEl[sortValue[0]];
            }
        });
    }
}

export function complex(array, complexValue) {
    complexValue.forEach(index => {
        if (index.operation === 'filter') {
            array = array.filter(arr => index.callback(arr[index.property]));
            return array;
        } else if (index.operation === 'map') {
            array = array.map(arr => arr[index.property]);
            return array;
        } else if (index.operation === 'reduce') {
            array = array
                .map(arr => arr[index.property])
                .reduce((previousValue, currentValue) => previousValue + currentValue);
            return array;
        } else if (index.operation === 'sort') {
            array = array.sort((firstEl, secondEl) => secondEl - firstEl);
            return array;
        }
    });
    return array;
}