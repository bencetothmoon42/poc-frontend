type Props = {
  updateDate: string;
  versionNumber: string;
};

export default function Footer({updateDate, versionNumber}: Props) {

  return (
    <footer className="fixed bottom-0 bg-white w-[62rem] px-2 pb-6 border-t-2 border-pnc-grey">
         <div className="text-base tracking-wide">
             <p className="uppercase underline  mb-1.5 mt-3.5 ">software version {versionNumber}.</p>
             <p>last updated: {updateDate}</p>
         </div>
     </footer> 
  )
}
