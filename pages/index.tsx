import { getSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
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
