"use client"

import { useEffect, useState } from "react";
import axios from "axios";

interface IUser {
    id: number,
    name: string,
    username: string,
    email: string
}

export default async function User() {
    // const [loading, setLoading] = useState(true);
    // const [users, setUsers] = useState<IUser[]>();

    // useEffect(() => {
    //     axios.get("https://jsonplaceholder.typicode.com/users")
    //         .then((res) => {
    //             console.log(res.data);
    //             setUsers(res.data);
    //             setLoading(false);
    //         });
    // }, []);

    const users: IUser[] = (await axios.get("https://jsonplaceholder.typicode.com/users")).data;

    await new Promise(r => setTimeout(r, 5000));

    if(users != null && users != undefined) {
    return <>
        <h2>Users</h2>
        {users.map((user:IUser) => {
            return <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
            })
        }
    </>
    }

    return <p>No one</p>
}