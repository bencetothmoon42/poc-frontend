import Footer from "./footer";
import Header from "./header";

const updateDate = '2022. 10. 02.';
const versionNumber = '01';

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
      <div className="w-[62rem] mx-auto">
        <Header />
        <main className="pb-32">{props.children}</main>
        <Footer 
          updateDate={updateDate}
          versionNumber={versionNumber}
        />
      </div>
  );
}
