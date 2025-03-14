import { createHmac } from "crypto";
import {
  AdminInitiateAuthCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Cognito",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        if (
          !process.env.COGNITO_USER_POOL_ID ||
          !process.env.COGNITO_CLIENT_ID ||
          !process.env.COGNITO_CLIENT_SECRET ||
          !process.env.COGNITO_REGION
        )
          return null;

        const client = new CognitoIdentityProviderClient({
          region: process.env.COGNITO_REGION,
        });

        const hasher = createHmac("sha256", process.env.COGNITO_CLIENT_SECRET);
        hasher.update(
          `${credentials.username}${process.env.COGNITO_CLIENT_ID}`
        );

        const secretHash = hasher.digest("base64");

        const command = new AdminInitiateAuthCommand({
          AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
          ClientId: process.env.COGNITO_CLIENT_ID,
          UserPoolId: process.env.COGNITO_USER_POOL_ID,
          AuthParameters: {
            USERNAME: credentials.username,
            PASSWORD: credentials.password,
            SECRET_HASH: secretHash,
          },
        });

        try {
          const response = await client.send(command);

          if (!response.AuthenticationResult) return null;

          return {
            id: credentials.username,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler, signIn, signOut, getServerSession };
