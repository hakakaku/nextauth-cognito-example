export default function ProtectPage() {
  return (
    <div className="bg-gray-100 m-4 p-4">
      <p className="text-2xl text-center">
        This is a page that is protected by middleware. You can only see this
        page if you are signed in.
      </p>
    </div>
  );
}
