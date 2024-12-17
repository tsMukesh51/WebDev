type sumInp = string | number;

const sum = (a: sumInp, b: sumInp): sumInp => {
    if (typeof a === 'number' && typeof b === 'number')
        return a + b;
    return String(a) + String(b);
}

let x = 1
let b = '4'

// console.log(sum(x, b));

interface User {
    name: string,
    age: number,
    address?: {
        city: string,
        country: string,
        pincode: number
    }
}

const users: User[] = [
    {
        name: 'Mukesh',
        age: 19,
        address: {
            city: 'Bengaluru',
            country: 'Bharath',
            pincode: 560000
        }
    },
    {
        name: 'Mukesh2',
        age: 18,
        address: {
            city: 'Bengaluru',
            country: 'Bharath',
            pincode: 560000
        }
    },
    {
        name: 'Mukesh3',
        age: 9,
        address: {
            city: 'Bengaluru',
            country: 'Bharath',
            pincode: 560000
        }
    },
    {
        name: 'Mukesh4',
        age: 194,
        address: {
            city: 'Bengaluru',
            country: 'Bharath',
            pincode: 560000
        }
    }
]

const isLeagal = (users: User[]): User[] => {
    return users.filter((user: User): boolean => {
        return user.age >= 18 && user.age <= 90;
    });
}

const printUsers = (users: User[]): void => {
    users.forEach((user: User): void => console.log(user.name));
}

printUsers(isLeagal(users));