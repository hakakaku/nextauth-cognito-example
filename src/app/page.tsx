import Link from "next/link";

export default async function Page() {
  return (
    <>
      <h1 className="text-4xl text-center">
        Next Auth V4 + AWS Cognito Example
      </h1>
      <ul className="flex justify-center space-x-4">
        <Link
          href="/login"
          className="text-blue-500 hover:underline text-lg p-4"
        >
          Login Page
        </Link>
        <Link
          href="/protected"
          className="text-blue-500 hover:underline text-lg p-4"
        >
          Middleware-Protected Page
        </Link>
        <Link
          href="/orders"
          className="text-blue-500 hover:underline text-lg p-4"
        >
          Orders Page
        </Link>
      </ul>
    </>
  );
}
