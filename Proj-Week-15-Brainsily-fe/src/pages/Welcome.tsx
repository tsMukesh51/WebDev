import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Welcome() {
    const navigate = useNavigate();
    return <div className="bg-blue-100">
        <div className="h-screen flex flex-0 items-center justify-center">
            <div className="w-6/12 h-3/4 flex flex-col items-center justify-center bg-gradient-to-r from-purple-300 to-purple-400 rounded-2xl">
                <h2 className="text-2xl mb-8 mx-10"><span className="text-6xl pr-4">Brainsily</span>
                    Your Second Brain for Organizing and Accessing Your Favorite Content</h2>
                <p className="text-lg text-center px-6 mb-10">Save and access your favorite Tweets, YouTube videos, articles, and more with ease. Your curated knowledge hub is just a click away!</p>
            </div>
            <div className="w-4/12 h-1/2 px-4 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-300 rounded-r-2xl">
                <p className="text-2xl mx-10 text-center">Get started by adding your first item or exploring your saved collection.</p>
                <div className="h-36 flex flex-col justify-center items-center">
                    <Button variant={"secondary"} size={"lg"} text={"Create account"} OnClick={() => navigate('/signup')} />
                    <p>Have an account? <Link to={"/signin"} className="text-blue-500">Login</Link></p>
                </div>
            </div>
        </div>

    </div>
}