type Props = {
  updateDate: string;
  versionNumber: string;
};

export default function Footer({updateDate, versionNumber}: Props) {

  return (
    <footer className="flex justify-center h-[4.25rem] border-t-2 border-pnc-grey mx-[-20%] mb-[24px]">
         <div className="text-base tracking-wide w-[62rem] mx-auto">
             <p className="uppercase underline  mb-1.5 mt-3.5 ">software version {versionNumber}.</p>
             <p>last updated: {updateDate}</p>
         </div>
     </footer> 
  )
}
