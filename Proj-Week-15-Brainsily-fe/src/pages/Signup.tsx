import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { userSchema } from "../schema";
import { ZodIssue } from "zod";

export function Signup() {
    const [validnErrors, setValidnErrors] = useState<Record<string, string[]>>({});
    const [postErrors, setPostErrors] = useState<number>(0);
    const navigate = useNavigate();
    const fullNameRef = useRef<any>();
    const usernameRef = useRef<any>();
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();
    async function signup() {
        const fullName = fullNameRef.current.value;
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const { success, error } = userSchema.omit({ isShared: true }).safeParse({ fullName, username, email, password });
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

            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                fullName,
                username,
                email,
                password
            });
            if (response.status == 200) {
                alert('Account created successfull, Please log in');
                navigate('/signin');
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
            } else if (err.status == 409) {
                setPostErrors(err.status);
            } else {
                alert('No internet or Backend is down');
            }
        }
    }

    return <div className="flex items-center justify-center h-screen w-screen bg-slate-300">
        <div className="flex flex-col gap-4 items-center bg-white rounded-md p-8">
            <h3 className="text-3xl mb-1">SignUp</h3>
            <div className="bg-purple-300 w-full h-1 rounded-full mb-7"></div>
            <TextInput placeholder="Full Name" reference={fullNameRef} errors={validnErrors['fullName']} />
            <TextInput placeholder="username" reference={usernameRef} errors={validnErrors['username']} />
            <TextInput placeholder="Email" reference={emailRef} errors={validnErrors['email']} />
            <TextInput placeholder="Password" reference={passwordRef} errors={validnErrors['password']} />
            <Button variant="secondary" text="SignUp" size="md" OnClick={signup} />
            <p>Have an account? <Link to={"/signin"} className="text-blue-500">Login</Link></p>
            {postErrors == 409 ? <p className="text-red-500 text-sm">Email or username already in use</p> : <></>}
        </div>
    </div>
}