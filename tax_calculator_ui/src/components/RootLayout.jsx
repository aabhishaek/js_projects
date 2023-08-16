import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <footer>
        Abhishek
      </footer>
    </>
  );
}

export default RootLayout;
