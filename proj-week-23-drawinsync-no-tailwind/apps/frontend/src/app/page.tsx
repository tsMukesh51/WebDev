import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <div>Home</div>
        <Button className="bg-red-100" >Submit</Button>
      </div>
      <h1 className="text-4xl font-bold text-blue-500">
        Hello Tailwind!
      </h1>
    </main>
  );
}
