import Link from "next/link";
import { useRouter } from "next/router";

export default function View() {
    const { asPath } = useRouter();
    
    return asPath.includes('printers') ? 
        (<div className="border-b-[1px] border-b-pnc-grey py-1.5">
            <nav aria-label="secondary-navigation">
                <ul className="flex gap-9">
                    {[
                        { path: "list", label: "List view" },
                        { path: "assign", label: "Assign view" },
                    ].map(({ path, label }) => (
                    <li>
                        <Link href={path}>
                        <a className="text-sm tracking-wide font-bold">
                            {label}
                        </a>
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>
        </div>) : null
}
