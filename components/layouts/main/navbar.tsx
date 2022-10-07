import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { asPath } = useRouter();
  const isActive = (path: string) =>
    asPath.includes(path) ? " text-white bg-pnc-grey" : "";

  return (
    <nav aria-label="primary-navigation">
      <ul className="flex gap-4">
        {[
          { path: "printers", label: "Printers" },
          { path: "destinations", label: "Destinations" },
          { path: "houses", label: "Houses" },
          { path: "jobs", label: "Jobs" },
        ].map(({ path, label }) => (
          <li>
            <Link href={path}>
              <a
                className={`font-light uppercase p-2 hover:text-white 
                hover:bg-pnc-grey${isActive(path)}`}
              >
                {label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
