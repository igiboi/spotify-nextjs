import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";

function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="text-white">
      {playlist?.tracks.items.map((track: any) => (
        <div>
          <p>{track.track.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Songs;
