import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div>
      <div>Home</div>
      <Button className="nothing" >Submit</Button>
    </div>
  );
}
