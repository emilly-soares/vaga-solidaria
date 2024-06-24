import { Outlet } from "react-router-dom";
import { Header } from "../header";
import Footer from "../footer/footer";
import SocialSection from "../footer/socialSection";

export function Layout(){
  return(
    <>
      <Header/>
      <Outlet/>
      <SocialSection/>
      <Footer/>
    </>
  )
}