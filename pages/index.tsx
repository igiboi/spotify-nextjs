import { getSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}

// this pre render/fetch the user on the server before login in
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
