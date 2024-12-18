interface User {
    id: string,
    name: string,
    age: number,
    password: string,
    country: string,
    email: string
}

type updateUserProp = Pick<User, 'age' | 'address' | 'country' | 'email' | 'name'>;

