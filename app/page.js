"use client"
import "bootstrap/dist/css/bootstrap.css";
import { useSession } from "next-auth/react";
export default function log() {
    const { data: session, status } = useSession();
    if (status ==="authenticated"){
        window.location.href = "/home";
    }
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="mt-5">Log</h1>
                        <p className="description mb-4">
                            This is the log page. You can access this page only after
                            authentication.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}