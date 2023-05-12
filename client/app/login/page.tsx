"use Client";

import AuthContainer from "@/components/AuthContainer";
import Image from "next/image";
import Bg from "public/images/bg.svg";

export default function Login() {
  return (
    <AuthContainer>
      <h1 className="text-red-800">Login</h1>
      <Image src={Bg} alt="bg" />
    </AuthContainer>
  );
}
