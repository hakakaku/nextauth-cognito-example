import OrdersRouteHandler from "./_component/OrdersRouteHandler";
import OrdersServerComponent from "./_component/OrdersServerComponent";
import { ToggleFetchingType, Toggler } from "./_component/Toggler";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ fetchingType: ToggleFetchingType }>;
}) {
  const { fetchingType } = await searchParams;

  return (
    <main className="m-4">
      <Toggler type={fetchingType} />
      {fetchingType === "route-handler" ? (
        <OrdersRouteHandler />
      ) : (
        <OrdersServerComponent />
      )}
    </main>
  );
}
