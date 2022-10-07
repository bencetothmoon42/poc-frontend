type Props = {
  updateDate: string;
  versionNumber: string;
};

export default function Footer({updateDate, versionNumber}: Props) {

  return (
    <div className="flex justify-center h-[4.25rem] border-t-2 border-pnc-grey mb-6 mx-[12.5rem]">
         <div className="text-base tracking-wide w-60 mr-[46.25rem]">
             <p className="uppercase underline  mb-1.5 mt-3.5 ">software version {versionNumber}.</p>
             <p>last updated: {updateDate}</p>
         </div>
     </div> 
  )
}
