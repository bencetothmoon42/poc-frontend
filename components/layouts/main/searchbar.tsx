import Image from "next/image";
import search from "../../../public/icons/search-white.svg";

export default function Searchbar() {
    return (
        <div className="flex text-sm tracking-wider">
            <input name="search" placeholder="Example text" className="h-[38px] w-[134px] px-4 border border-pnc-blue justify-center"/>
            <button className="flex items-center justify-center w-[134px] h-[38px] gap-1.5 bg-pnc-blue text-pnc-white bold uppercase">
                <Image src={search} alt="search icon" />
                search
            </button>
        </div>
    )
}