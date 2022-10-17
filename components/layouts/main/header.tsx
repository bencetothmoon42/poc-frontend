import Brand from "./brand";
import Menu from "./menu";
import Navbar from "./navbar";
import View from "./view";
import Searchbar from "./searchbar";

export default function AppHeader() {
  return (
    <header className="relative flex flex-col">
      <Brand/>
      <div className="absolute top-16 right-[-26rem]">
        <Menu />
      </div>
      <div className="flex place-content-between">
        <Navbar />
        <Searchbar />
      </div>
      <View />
    </header>
  );
}
