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
                            STARTING PAGE OF THE APPLICATION
                            U NEED TO LOGIN TO ACCESS THE OTHER PAGES
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}