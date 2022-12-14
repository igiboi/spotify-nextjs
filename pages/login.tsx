import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Login({ providers }: any) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" />

      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            className="bg-[#18d860] text-white p-5 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
