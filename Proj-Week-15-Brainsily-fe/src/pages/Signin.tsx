import axios from "axios";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const navigate = useNavigate();
    const usernameRef = useRef<any>();
    const passwordRef = useRef<any>();
    async function signup() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        });
        if (response.status == 200) {
            localStorage.removeItem('token');
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } else {
            alert('Something went wrong');
        }
    }

    return <div className="flex items-center justify-center h-screen w-screen bg-slate-300">
        <div className="flex flex-col gap-4 items-center bg-white rounded-md p-8">
            <TextInput placeholder="username" reference={usernameRef} />
            <TextInput placeholder="Password" reference={passwordRef} />
            <Button variant="primary" text="SignIn" size="md" OnClick={signup} />
        </div>
    </div>
}