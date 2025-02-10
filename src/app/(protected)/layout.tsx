import LogoutButton from "@/components/logout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex justify-end p-4">
        <LogoutButton />
      </div>
      {children}
    </>
  );
}
