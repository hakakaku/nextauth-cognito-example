import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  } else {
    redirect("/orders");
  }
}
