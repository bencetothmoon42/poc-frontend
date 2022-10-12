import Brand from "./brand";
import Menu from "./menu";
import Navbar from "./navbar";
import View from "./view";
import Searchbar from "./searchbar";

export default function AppHeader() {
  return (
    <header className="flex flex-col">
      <Brand />
      <Menu />
      <Searchbar />
      <Navbar />
      <View />
    </header>
  );
}
