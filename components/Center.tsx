import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { playlistsIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState } from "recoil";
import spotifyApi from "../lib/spotify";
import useSpotify from "../hooks/useSpotify";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session }: any = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState<string | undefined>();
  const [playlistsId, setPlaylistId] = useRecoilState(playlistsIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    return setColor(shuffle(colors).pop());
  }, [playlistsId]); // the color changes when the playlist changes as well.

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistsId)
      .then((data) => {
        return setPlaylist(data.body);
      })
      .catch((err) => {
        console.log("something went wrong!!", err);
      });
  }, [spotifyApi, playlistsId]);

  console.log(playlist);

  return (
    <div className=" flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shoadow-2xl"
          src={playlist?.images?.[0].url}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
    </div>
  );
}

export default Center;
