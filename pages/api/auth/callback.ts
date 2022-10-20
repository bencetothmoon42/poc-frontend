import { NextApiRequest, NextApiResponse } from "next";
import needle from "needle";
import { Octokit } from "octokit";

type AccessType = {
  access_token: string;
  token_type: string;
  scope: string;
};

type UserData = {
  userId: number;
  nodeId: string;
  username: string;
};

const getUserData = async (access: AccessType): Promise<UserData> => {
  const octokit = new Octokit({
    auth: access.access_token,
  });

  const response = await octokit.request("GET /user", {});

  return {
    userId: response.data.id,
    nodeId: response.data.node_id,
    username: response.data.login,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  needle.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: "4ce78ebc409c3e340965",
      client_secret: "8e73a88b2232d38dc40b8bd91cdb39acdb80d241",
      code: req.query.code,
    },
    { json: true },
    async (_err, response) => {
      const result: string = JSON.stringify(await getUserData(response.body));
      console.log(result);
      return result;
    }
  );
}
