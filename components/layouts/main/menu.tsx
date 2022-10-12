import Image from "next/image";
import languageChanger from "../../../public/icons/language-changer.svg";
import profile from "../../../public/icons/profile.svg";


export default function Menu() {
    return (
      <div className="flex absolute top-16 right-16 justify-between">
        <div className="text-sm tracking-wide uppercase font-bold mx-2">
            <p>Destination</p>
            <p>Shop place</p>
        </div>
        <span className="p-2 h-10 mx-2">
          <Image src={profile} alt="profile icon" />
        </span>
        <span className="p-2 h-10 mx-2">
          <Image src={languageChanger} alt="language changer icon" />
        </span>
      </div>
    );
}