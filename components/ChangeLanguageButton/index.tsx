import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";

const ChangeLanguageButton = () => {
  const router = useRouter();

  const onLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;

    router.push(router.route, router.asPath, { locale });
  };
  return (
    <select
      className="absolute top-3 right-3"
      onChange={(e) => onLangChange(e)}
      defaultValue={router.locale}
    >
      <option value="en">EN</option>
      <option value="de">DE</option>
    </select>
  );
};

export default ChangeLanguageButton;
