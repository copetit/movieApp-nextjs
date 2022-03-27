import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <div>
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : ""}>HOME</a>
        </Link>
        <Link href="/about">
          <a className={router.pathname === "/about" ? "active" : ""}>ABOUT</a>
        </Link>
      </div>
      <style jsx>
        {`
          nav {
            background: black;
            padding: 20px;
          }
          .active {
            color: #fac511;
          }
          nav a {
            font-weight: 600;
            font-size: 18px;
          }
          nav div {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
          }
        `}
      </style>
    </nav>
  );
}
