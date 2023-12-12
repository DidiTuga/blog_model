"use  client";
import {signIn, useSession, signOut} from "next-auth/react"
import Image from "next/image";

export default function Prof_log() {
    const {data: session, status} = useSession();
    if (status ==="authenticated"){
        return (
            <div>
                <Image src={session.user.image} width={35} height={35} className="radius-50" alt="profile image" />
            <button onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    }
    return (
        <div>
        <button  onClick={() => signIn("github")}>Sign In</button>
        </div>
    )
    }

