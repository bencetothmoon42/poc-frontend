import Link from "next/link";
import { useRouter } from "next/router";

export default function View() {
    const { asPath } = useRouter();

    if (!asPath.includes('printers')) {
        return null;
    }
    
    return (
        <div className="border-y border-y-pnc-grey pt-1.5 mt-[13px]">
            <nav aria-label="secondary-navigation">
                <ul className="flex gap-9">
                    {[
                        { path: "list", label: "List view" },
                        { path: "assign", label: "Assign view" },
                    ].map(({ path, label }) => (
                    <li>
                        <Link href={path}>
                        <a className={`flex flex-col items-center pt-2 text-sm tracking-wide font-bold 
                            ${asPath.includes(path) ? `after:h-0 after:w-0 after:border-[6px] after:border-transparent after:border-b-pnc-grey` : ''}`}
                        >
                            {label}
                        </a>
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
