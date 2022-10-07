import Footer from "./footer";
import Header from "./header";

const updateDate = '2022. 10. 02.';
const versionNumber = '01';

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-full relative">
      <div className="w-[62rem] mx-auto min-h-screen">
        <Header />
        <main className="pb-16">{props.children}</main>
      </div>
      <Footer 
        updateDate={updateDate}
        versionNumber={versionNumber}
      />
    </div>
  );
}
