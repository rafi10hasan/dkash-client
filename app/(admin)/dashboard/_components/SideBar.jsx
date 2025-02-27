
import AccountMenu from "./account-menu";
import SideBarMenu from "./Side-bar-menu";
import {data} from './menu-data'
// This is sample data.

export default async function SideBar() {

  return (
    <div className="p-4 max-h-screen h-[100vh] bg-slate-50 hidden xl:block">
      <AccountMenu/>

      <SideBarMenu items={data.navMain} />
      {/* /* <NavProjects projects={data.projects} /> */}
    </div>
  );
}
