import "./styles/Navbar.scss";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Page({
  to,
  children,
  ...props
}: {
  to: string;
  children: any;
}): JSX.Element {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default function Navbar(): JSX.Element {
  return (
    <>
      <div id="navbar">
        <Link to="/" className="site-title">
          Cafe Games
        </Link>
        <ul>
          <Page to="/games">Games</Page>
          <Page to="/about">About</Page>
        </ul>
      </div>
    </>
  );
}
