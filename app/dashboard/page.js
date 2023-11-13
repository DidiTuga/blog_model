import Link from "next/link";

function dashboard() {
  return (
    <main>
      <h1>DashBoard</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">DashBoard</Link>
        </li>
      </ul>
    </main>
  );
}

export default dashboard;
