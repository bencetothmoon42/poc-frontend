import Brand from "./brand";
import Navbar from "./navbar";

export default function AppHeader() {
  return (
    <header className="flex flex-col">
      <Brand />
      <Navbar />
    </header>
  );
}
