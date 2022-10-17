import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { asPath } = useRouter();
    
  const isActive = (path: string) => {
    return asPath.includes(slicePath(path)) ? " text-white bg-pnc-grey" : "";
  }

  const slicePath = (path: string) => {
    let sliceUntil: number = path.indexOf('/', 2);
    let slicedPath: string;
    sliceUntil !== -1 ? slicedPath = path.slice(0, sliceUntil) : slicedPath = path;
    return slicedPath;
  }

  return (
    <>
      <nav aria-label="primary-navigation">
        <ul className="flex gap-4 ml-2">
          {[
            { path: "/printers/list", label: "Printers" },
            { path: "/destinations", label: "Destinations" },
            { path: "/houses", label: "Houses" },
          ].map(({ path, label }) => (
            <li>
              <Link href={path}>
                <a
                  className={`flex items-center px-4 py-2.5 text-sm uppercase hover:text-white hover:bg-pnc-grey${isActive(path)}`}
                >
                  {label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
