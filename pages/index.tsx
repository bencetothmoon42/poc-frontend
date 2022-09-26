import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

interface Hello {
  hello: string;
  resolvedHello: string;
}

const QUERY = gql`
  query {
    getHello {
      hello
      resolvedHello
    }
  }
`;

const Home: NextPage = () => {
  const [helloData, setHelloData] = useState<Hello>();

  const { data, error } = useQuery(QUERY);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (data?.getHello) {
      setHelloData(data.getHello);
    }
  }, [data, error]);

  return (
    <div style={{ padding: "10px" }}>
      <div>
        Graphql magic response base data: <b>{helloData?.hello}</b>
      </div>
      <br />
      <div>
        Graphql magic response <b>resolved</b> field:{" "}
        <b>{helloData?.resolvedHello}</b>
      </div>
    </div>
  );
};

export default Home;
