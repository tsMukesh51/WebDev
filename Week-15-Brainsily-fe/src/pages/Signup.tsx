import { useRef } from "react";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function Signup() {
    const navigate = useNavigate();
    const fullnameRef = useRef<any>();
    const usernameRef = useRef<any>();
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();
    async function signup() {
        const fullName = fullnameRef.current.value;
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            fullName,
            username,
            email,
            password
        });
        if (response.status == 200) {
            alert('Account created successfull, Please log in');
            navigate('/signin');
        } else {
            alert('Something went wrong');
        }
    }

    return <div className="flex items-center justify-center h-screen w-screen bg-slate-300">
        <div className="flex flex-col gap-4 items-center bg-white rounded-md p-8">
            <TextInput placeholder="Full Name" reference={fullnameRef} />
            <TextInput placeholder="username" reference={usernameRef} />
            <TextInput placeholder="Email" reference={emailRef} />
            <TextInput placeholder="Password" reference={passwordRef} />
            <Button variant="secondary" text="SignUp" size="md" OnClick={signup} />
        </div>
    </div>
}