import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { asPath } = useRouter();
    
  const isActive = (path: string) => {
    if (asPath.includes(slicePath(path))) return path === '/jobs' ? " text-white bg-pnc-orange" : " text-white bg-pnc-grey";
    if (!asPath.includes(slicePath(path))) return path === '/jobs' ? " text-pnc-orange" : "";
  }

  const slicePath = (path: string) => {
    let sliceUntil: number = path.indexOf('/', 2);
    let slicedPath: string;
    sliceUntil !== -1 ? slicedPath = path.slice(0, sliceUntil) : slicedPath = path;
    return slicedPath;
  }

  return (
    <>
      <div className="flex items-top h-[54px] border-b-[1px] border-b-pnc-grey ">
        <nav aria-label="primary-navigation">
          <ul className="flex gap-4 ml-2">
            {[
              { path: "/printers/list", label: "Printers" },
              { path: "/destinations", label: "Destinations" },
              { path: "/houses", label: "Houses" },
              { path: "/jobs", label: "Print jobs" },
            ].map(({ path, label }) => (
              <li>
                <Link href={path}>
                  <a
                    className={`flex items-center h-10 px-4 py-2 text-sm uppercase hover:text-white ${path === '/jobs' ? `hover:bg-pnc-orange${isActive(path)}` 
                    : `hover:bg-pnc-grey${isActive(path)}`}`}
                  >
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      </>
  );
}
