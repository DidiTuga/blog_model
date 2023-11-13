import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/dashboard">DashBoard</Link>
      </li>
      <li>
        <Link href="/api?name=didi">API</Link>
      </li>
    </ul>
    </main>
  );
}
