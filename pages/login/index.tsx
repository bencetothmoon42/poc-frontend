import { NextPage } from "next";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();

  return (
    <a href="https://github.com/login/oauth/authorize?client_id=4ce78ebc409c3e340965&scope=user">
      Login with github
    </a>
  );
};

export default LoginPage;
