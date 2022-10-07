import Footer from "./footer";
import Header from "./header";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div className="w-[62rem] mx-auto">
      <Header />
      <main className="pb-16">{props.children}</main>
      <Footer />
    </div>
  );
}
