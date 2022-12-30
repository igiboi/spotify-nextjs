import useSpotify from "../hooks/useSpotify";

function Song({ order, track }: any) {
  const spotify = useSpotify();

  return (
    <div>
      <div>
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.track.album.images[0].url} />
      </div>
    </div>
  );
}

export default Song;
