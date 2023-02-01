import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { constSelector, useRecoilState } from "recoil";
import {
  HiSwitchHorizontal,
  HiRewind,
  HiFastForward,
  HiReply,
  HiVolumeUp,
} from "react-icons/hi";
import {
  BsPauseCircleFill,
  BsFillPlayCircleFill,
  BsVolumeDownFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { debounce } from "lodash";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

function Player({ track }: any) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo: any = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
        console.log("Now Playing: ", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [track.track.uri] });
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const handleRewind = () => {
    spotifyApi.seek(200).then((data: any) => {
      spotifyApi.skipToPrevious();
    });
  };

  const handleFastFoward = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
      spotifyApi.skipToNext();
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch the song info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 200),
    []
  );

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className=" md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-evenly">
        <HiSwitchHorizontal className="button" />
        <HiRewind onClick={handleRewind} className="button" />

        {isPlaying ? (
          <BsPauseCircleFill
            onClick={handlePlayPause}
            className="button w-10 h-10"
          />
        ) : (
          <BsFillPlayCircleFill
            onClick={handlePlayPause}
            className="button w-10 h-10"
          />
        )}

        <HiFastForward onClick={handleFastFoward} className="button" />

        <HiReply className="button" />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        {volume == 0 ? (
          <BsFillVolumeMuteFill
            className="button"
            onClick={() => volume === 0 && setVolume(volume)}
          />
        ) : (
          <BsVolumeDownFill
            className="button"
            onClick={() => volume > 0 && setVolume(volume - 10)}
          />
        )}
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <BsFillVolumeUpFill
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default Player;
