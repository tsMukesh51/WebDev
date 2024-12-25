import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";

export function Signin() {
    return <div className="flex items-center justify-center h-screen w-screen bg-slate-300">
        <div className="flex flex-col gap-4 items-center bg-white rounded-md p-8">
            <TextInput placeholder="username" />
            <TextInput placeholder="Password" />
            <Button variant="primary" text="SignIn" size="lg" />
        </div>
    </div>
}