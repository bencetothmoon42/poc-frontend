import { useRouter } from "next/router";
import de from "./de";
import en from "./en";

export const useRouterTranslation = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : de;

  return { t };
};
