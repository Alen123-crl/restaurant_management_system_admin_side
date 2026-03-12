import { redirect } from "next/navigation";

export default function Home() {
  // send visitors straight to the login page when they hit `/`
  redirect("/login");
  // the component itself never renders anything
}