import axios from "axios";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSchema } from "../schema";
import { ZodIssue } from "zod";

export function Signin() {
    const [validnErrors, setValidnErrors] = useState<Record<string, string[]>>({});
    const [postErrors, setPostErrors] = useState<number>(0);
    const navigate = useNavigate();
    const usernameRef = useRef<any>();
    const passwordRef = useRef<any>();
    async function signin() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const { success, error } = userSchema.pick({ username: true, password: true }).safeParse({ username, password });
        if (!success) {
            const validnErr: Record<string, string[]> = {};
            error.issues.forEach((issue) => {
                issue.path.forEach((path) => {
                    if (validnErr[path.toString()] == undefined)
                        validnErr[path.toString()] = [];
                    validnErr[path.toString()].push(issue.message);
                });
            });
            setValidnErrors(validnErr);
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            });
            if (response.status == 200) {
                localStorage.removeItem('token');
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (err: any) {
            console.log(err);
            if (err.status == 400) {
                console.log(err.response.data.msg);
                const validnErr: Record<string, string[]> = {};
                const errors: ZodIssue[] = err.response.data.err;
                errors.forEach((issue) => {
                    issue.path.forEach((path) => {
                        if (validnErr[path.toString()] == undefined)
                            validnErr[path.toString()] = [];
                        validnErr[path.toString()].push(issue.message);
                    });
                });
                setValidnErrors(validnErr);
                setPostErrors(err.status);
            } else if (err.status == 401) {
                setPostErrors(err.status);
            } else if (err.status == 404) {
                setPostErrors(err.status);
            } else {
                alert('No internet or Backend is down');
            }
        }
    }

    return <div className="flex items-center justify-center h-screen w-screen bg-slate-300">
        <div className="flex flex-col gap-4 items-center bg-white rounded-md p-8">
            <h3 className="text-3xl mb-1">Login</h3>
            <div className="bg-purple-300 w-full h-1 rounded-full mb-7"></div>
            <TextInput placeholder="username" reference={usernameRef} errors={validnErrors['username']} />
            <TextInput placeholder="Password" reference={passwordRef} errors={validnErrors['password']} />
            <Button variant="primary" text="SignIn" size="md" OnClick={signin} />
            <p>Don't have an account? <Link to={"/signup"} className="text-blue-500">SignUp</Link></p>
            {postErrors && postErrors == 401 ? <p className="text-red-500 text-sm">Invalid Creadentials</p> :
                postErrors == 404 ? <p className="text-red-500 text-sm" >Account not found</p> : <></>}
        </div>
    </div>
}