import Menuitem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

function HomeMenu() {
  return (
    <section className="">
      <SectionHeaders subHeader={"Check Out"} mainHeader={"Menu"} />
      <div className="grid grid-cols-3 gap-4 my-4">
        <Menuitem />
        <Menuitem />
        <Menuitem />
        <Menuitem />
        <Menuitem />
        <Menuitem />
      </div>
    </section>
  );
}

export default HomeMenu;
