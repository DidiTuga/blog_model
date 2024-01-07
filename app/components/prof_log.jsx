"use  client";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Prof_log() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div className="d-flex align-items-center">
        <div className="me-2">
          <Image
            src={session?.user.image}
            width={35} height={35}
            className="rounded-circle"
            alt="profile image"
          />
        </div>
        <div>
          <button 
          className="border-0 p-0 cursor-pointer bg-transparent"
          onClick={() => signOut()}
          style={{ filter: "invert(95%)" }}>
            <Image width={35} height={35} src={"/logout.svg"} />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
    <button 
      className="border-0 p-0 cursor-pointer bg-transparent"
      onClick={() => signIn("github")}
      style={{ filter: "invert(95%)" }}>
      <Image width={35} height={35} src={"/login.svg"} />
    </button>
  </div>
  );
}
