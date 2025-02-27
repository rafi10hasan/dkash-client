import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  console.log(session)
  if (!session) {
    redirect("/login"); // Execution stops here
  }

  if (session?.user.role === "agent") {
    redirect("/agent");
  }

  if (session?.user.role === "user") {
    redirect("/user");
  }

  redirect("/dashboard/overview")
}
