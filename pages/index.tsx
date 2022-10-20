import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ChangeLanguageButton from "../components/ChangeLanguageButton";
import { useRouterTranslation } from "../localization/useRouterTranslation";

const Home: NextPage = () => {
  const { t } = useRouterTranslation();

  return (
    <div style={{ padding: "10px" }}>
      <div>{t.test}</div>
    </div>
  );
};

export default Home;
