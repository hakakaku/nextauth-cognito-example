import LoginForm from "@/components/Form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const { error } = await searchParams;

  return (
    <LoginForm>
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="rounded border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-2 w-60"
        name="username"
        type="text"
        placeholder="Username"
        minLength={8}
        maxLength={50}
        pattern="[0-9]*"
      />
      <input
        className="rounded border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-2 w-60"
        name="password"
        type="password"
        placeholder="Password"
        minLength={8}
        maxLength={50}
        pattern="[a-zA-Z0-9]*"
      />
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        type="submit"
      >
        Login
      </button>
    </LoginForm>
  );
}
