// Format code via Prettier
export function mapTo(array, mapValue) {
    if (typeof array[0] === 'number') {
        return array.map((_, index) => index);
    }
    //return array.filter(arr => arr.hasOwnProperty(mapValue)).map((value) => value.name);
    // or this
    return array.reduce((previousValue, currentValue) => {
        // TODO: No mutation, create a new list instead 
        if (currentValue.hasOwnProperty(mapValue)) {
            previousValue.push(currentValue.name);
        }
        return previousValue;
    }, []);
}

export function mapToProfile(array) {
    return array.map((arr) => {
        return Object.defineProperties({
            // TODO: Create a helper function for || null 
                name: arr.name || null,
                surname: arr.surname || null,
                // TODO: Move into separate function for ?? "_"
                fullname: arr.name || arr.surname
                    ? `${arr.name ?? "_"} ${arr.surname ?? "_"}`
                    : null,
                age: arr.age || null,
            },
            // Check if we can move this into default getter
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
    // TODO: Check if we can decide way to handle by filterValue
    if (typeof array[0] === 'number') {
        // TODO: Specify more meaningful name for arr 
        return array.filter(arr => arr >= filterValue);
    } else if (typeof filterValue === 'string') {
        return array.filter(arr => arr.hasOwnProperty(filterValue));
    }
    return array.filter(arr => arr.hasOwnProperty(filterValue.property)
        && filterValue.filterCb(arr.age));
}

export function reduceTo(array, reduceValue) {
    // TODO: Check if we can decide way to handle by reduceValue
    // TODO: Move outputArray to place of usage, also check if we really to allocate this value
    let outputArray = [];
    if (typeof array[0] === 'number') {
        // TODO: Provide default value
        return array.reduce((previousValue, currentValue) => previousValue + currentValue);
    } else if (typeof reduceValue === 'string') {
        return array.reduce((previousValue, currentValue) => (previousValue + currentValue[reduceValue]), 0);
    }
    // TODO: Check const instead
    let total = array.reduce((previousValue, currentValue) => (previousValue + currentValue[reduceValue[0]]), 0);
    let difference = array.reduce((previousValue, currentValue) => (previousValue + currentValue[reduceValue[1]]), 0);
    return outputArray.concat(total, difference);
}

export function sort(array, sortValue) {
     // TODO: Check if we can decide way to handle by sortValue
    //  Note: Sort mutates original array, this could made things not easy to get 
    if (typeof array[0] === 'number') {
      return array.sort();
    } else if (typeof sortValue === 'string') {
      return array.sort((firstEl, secondEl) => (firstEl[sortValue] - secondEl[sortValue]));
    // TODO: Move sortValue[0] and sortValue[1] into separate variables
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
    // TODO: No data mutation
    complexValue.forEach(index => {
        // TODO: Move operation values into enum 
        if (index.operation === 'filter') {
            array = array.filter(arr => index.callback(arr[index.property]));
            return array;
        } else if (index.operation === 'map') {
            array = array.map(arr => arr[index.property]);
            return array;
        } else if (index.operation === 'reduce') {
            array = array
            // TODO: Use only reduce here
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