import {
  HomeIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/24/outline";

import { signOut, useSession } from "next-auth/react";
import { Key, ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { playlistsIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlistsId, setPlaylistsId] = useRecoilState(playlistsIdState);
  const [playlists, setPlaylist] = useState<
    {
      name: ReactNode;
      id: Key | null | undefined;
    }[]
  >([]);

  console.log("you picked this playlist", playlistsId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div
      className="text-gray-500 p-5 text-xs 
    lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide
    h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex "
    >
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-green-600 "
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <p>Log out</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-600 ">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-600">
          <MagnifyingGlassIcon className="h-5 w-5 " />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-600">
          <BuildingLibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-green-600">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-600">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-600">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistsId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
