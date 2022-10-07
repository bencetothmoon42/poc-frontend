type Props = {
  updateDate: string;
  versionNumber: string;
};

export default function Footer({updateDate, versionNumber}: Props) {

  return (
    <div className="absolute bottom-6 right-0 left-0 flex justify-center h-[4.25rem] border-t-2 border-pnc-grey mx-[12.5rem] mt-16">
         <div className="text-base tracking-wide w-60 mr-[46.25rem]">
             <p className="uppercase underline  mb-1.5 mt-3.5 ">software version {versionNumber}.</p>
             <p>last updated: {updateDate}</p>
         </div>
     </div> 
  )
}
