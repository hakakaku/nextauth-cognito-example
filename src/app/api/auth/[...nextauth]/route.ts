import {
  AdminInitiateAuthCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Cognito",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "バスワード",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        if (
          !process.env.COGNITO_USER_POOL_ID ||
          !process.env.COGNITO_CLIENT_ID ||
          !process.env.COGNITO_REGION
        )
          return null;

        const client = new CognitoIdentityProviderClient({
          region: process.env.COGNITO_REGION,
        });

        const command = new AdminInitiateAuthCommand({
          AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
          ClientId: process.env.COGNITO_CLIENT_ID,
          UserPoolId: process.env.COGNITO_USER_POOL_ID,
          AuthParameters: {
            USERNAME: credentials.username,
            PASSWORD: credentials.password,
          },
        });

        const response = await client.send(command);

        if (!response.AuthenticationResult) return null;

        return {
          id: credentials.username,
          idToken: response.AuthenticationResult.IdToken,
          accessToken: response.AuthenticationResult.AccessToken,
          refreshToken: response.AuthenticationResult.RefreshToken,
          expires: response.AuthenticationResult.ExpiresIn,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
