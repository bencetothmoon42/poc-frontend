import Image from "next/image";
import pncLogo from "../../../public/pnc-logo.svg";

export default function Brand() {
  return (
    <div className="flex justify-center py-16">
      <Image src={pncLogo} alt="Peek&Cloppenburg logo" />
    </div>
  );
}
