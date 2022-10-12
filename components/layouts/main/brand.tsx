import Image from "next/image";
import pncLogo from "../../../public/pnc-logo.svg";

export default function Brand() {
  return (
    <div className="flex flex-col text-center justify-center mt-16 mb-8">
      <Image src={pncLogo} alt="Peek&Cloppenburg logo" />
      <h1 className="uppercase text-[14px] leading-[19px] tracking-wider mt-1">Label printing 4.1.0</h1>
    </div>
  );
}
