import { redirect } from "next/navigation";

export type ToggleFetchingType = "route-handler" | "server-component";

export function Toggler({ type }: { type: ToggleFetchingType }) {
  const toggleFetchingTypeAction = async (type: ToggleFetchingType) => {
    "use server";

    redirect("/orders?fetchingType=" + type);
  };

  return (
    <form>
      <button
        type="submit"
        formAction={toggleFetchingTypeAction.bind(null, "route-handler")}
        className={`mr-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 ${
          type === "route-handler" ? "bg-gray-100" : ""
        }`}
      >
        Route Handler
      </button>
      <button
        type="submit"
        formAction={toggleFetchingTypeAction.bind(null, "server-component")}
        className={`border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 ${
          type === "server-component" ? "bg-gray-100" : ""
        }`}
      >
        Server Component
      </button>
    </form>
  );
}
