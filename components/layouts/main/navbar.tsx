import Link from "next/link";
import { useRouter } from "next/router";

const isActive = (path: string, link: string) => {
  const [firstPathSegment] = path.split('/').filter(Boolean)
  const [firstLinkSegment] = link.split('/').filter(Boolean)

  return firstLinkSegment === firstPathSegment ? " text-white bg-pnc-grey" : "";
}

export default function Navbar() {
  const { asPath } = useRouter();

  return (
    <>
      <nav aria-label="primary-navigation">
        <ul className="flex gap-4 ml-2">
          {[
            { link: "/printers/list", label: "Printers" },
            { link: "/destinations", label: "Destinations" }, 
            { link: "/houses", label: "Houses" },
          ].map(({ link, label }) => (
            <li>
              <Link href={link}>
                <a
                  className={`flex items-center px-4 py-2.5 text-sm uppercase hover:text-white hover:bg-pnc-grey${isActive(asPath, link)}`}
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
