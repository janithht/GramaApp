export const getToken = async () => {
  const orgName = "interns";
  const clientID = "2SBX8j5UfdjnBqU_ZP88Alrpmv4a";
  const clientSecret = "ptX7EqRN_1TATpY0KytXsw16A_RlNI3sMkd1aT_QwdYa";
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
