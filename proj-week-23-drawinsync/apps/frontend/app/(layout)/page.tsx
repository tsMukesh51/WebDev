
import { getServerSession } from "next-auth";
import { ClientComp } from "../../components/clientcomp";
import { ClientSession } from "../../components/clientSession"
import { authOptions } from "../../lib/auth";
import Header from "../../components/header";
import { redirect } from "next/navigation";
import UserProfileIcon from "../../icons/userProfile";
import Link from "next/link";
import logo from "../../frontend/public/logo.png";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user != null) {
    redirect('/home');
  }
  return (
    <main className="min-h-screen">
      <section className="h-screen w-screen flex justify-center items-center">
        <div className="">
          <p className="text-6xl">Welcome to DrawInSync</p>
          <p>start by creating an account</p>
        </div>
      </section>
    </main>
  );
}
