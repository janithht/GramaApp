export const getToken = async () => {
  const orgName = "interns";
  const clientID = "UELF2ljCgpL8zRnxdy4c2YnElUAa";
  const clientSecret = "VRePo6hZu3eQYR8fBBrgq1HMJhuPg2frtbhaeNK4ldUa";
  const scope = "openid address email groups phone profile roles";

  const tokenEndpoint = `https://api.asgardeo.io/t/${orgName}/oauth2/token`;
  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
  });

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    scope: scope,
  });

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      console.log(response.statusText);
      throw new Error(
        `Failed to retrieve access token: ${response.statusText}`
      );
    }

    const data = await response.json();
    const accessToken = data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Error:", error.message);
  }
};
