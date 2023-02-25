import {
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useChannelState } from "../../../context/ChannelState";
import { useStateContext } from "../../../context/StateContext";
import Tooltip from "../../Tooltip";

const Header = (uid) => {
  const router = useRouter();
  const { editDialog, setEditDialog, startLoadingBar } = useChannelState();
  const { setLoading, setLoadingProgress } = useStateContext();
  const Delete = () => {
    console.log("deleted the video ...");
    setEditDialog(false);
    router.push("/studio?content=true");
  };

  return (
    <div className="mb-4 relative py-4 px-8 justify-between flex items-center w-full">
      <div className="flex items-center gap-2">
        <ChevronLeftIcon
          onClick={() =>
            startLoadingBar(setLoading, setLoadingProgress, () =>
              router.push("/studio?content=true")
            )
          }
          className="clickable-icon click-show video-control"
        />
        <span className="show-sm text-bold font-semibold">Channel Content</span>
      </div>
      <span className="show-sm text-bold text-xl">Video Details</span>

      <div className="flex items-center gap-2">
        <button className="link-btn click-show video-control">
          Undo Changes
        </button>
        <button className="bg-blue-500 !text-white rounded-lg cursor-pointer link-btn dark:bg-blue-400 click-show ">
          Save
        </button>
        <Tooltip
          element={
            <EllipsisVerticalIcon
              onClick={() => setEditDialog(!editDialog)}
              className="clickable-icon click-show"
            />
          }
          hoverText={"Options"}
        />
        {editDialog && (
          <div className="absolute right-10 -bottom-28 shadow bg-gray-50 rounded-xl dark:text-white p-2 dark:bg-neutral-900 flex flex-col">
            <p
              onClick={() => setEditDialog(false)}
              className="flex items-center gap-4 click-show cursor-pointer hover:bg-gray-100 rounded-xl px-2 py-1 dark:hover:bg-white/10"
            >
              <ArrowDownTrayIcon className="icon" />
              <a download href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>
                <span className="lg:block hidden">Download</span>
              </a>
            </p>
            <p
              onClick={Delete}
              className="flex items-center gap-4 click-show cursor-pointer hover:bg-gray-100 rounded-xl px-2 py-1 dark:hover:bg-white/10"
            >
              <TrashIcon className="icon" />
              <span className="show-sm ">Delete</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const EditVideo = (uid) => {
  const { thumbnailDialog, setThumbnailDialog } = useChannelState();

  return (
    <div className="col-span-2 flex flex-col">
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title <span clasName="text-sm">{`(required)`}</span>
        </label>
        <input
          type="text"
          id="title"
          className=" ring-1 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 bg-transparent  dark:text-white dark:focus:ring-blue-500 outline-none "
          placeholder="Add a Title that describes your video"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          rows={10}
          type="text"
          id="description"
          className="ring-1 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 bg-transparent  dark:text-white dark:focus:ring-blue-500 outline-none"
          placeholder="Tell viewers about your video"
        />
      </div>

      <div>
        <label
          for="playlist"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          id="playlist"
          className="ring-1 bg-transparent text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 text-blue-400 dark:focus:ring-blue-500 outline-none"
        >
          <option selected>Choose a country</option>
          <option value="hhi">hhi</option>
        </select>
      </div>

      <div className="mb-6">
        <p className="my-4 flex flex-col text-bold text-lg text-gray-900 dark:text-white">
          Thumbnail
        </p>
        <div className="relative w-80 h-60">
          <img
            src={
              "https://i.ytimg.com/vi/XIrOM9oP3pA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDiN7R1akv6_cbfMTpTV_lUm1PgaQ"
            }
            className="object-contain rounded-xl"
            alt="thumbnail image"
          />
          <EllipsisVerticalIcon
            onClick={() => setThumbnailDialog(!thumbnailDialog)}
            className="absolute right-2 top-2 clickable-icon click-show video-control"
          />

          {thumbnailDialog && (
            <div className="absolute -right-28 top-2 shadow bg-gray-50 rounded-xl dark:text-white p-2 dark:bg-neutral-900 flex flex-col">
              <p
                onClick={() => setThumbnailDialog(false)}
                className="flex items-center gap-4 click-show cursor-pointer hover:bg-gray-100 rounded-xl px-2 py-1 dark:hover:bg-white/10"
              >
                <PhotoIcon className="icon" />
                <span className="show-sm ">Change</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="title"
          className="my-4 flex flex-col text-bold text-lg text-gray-900 dark:text-white"
        >
          Category
        </label>
        <input
          type="text"
          id="title"
          className=" ring-1 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 bg-transparent  dark:text-white dark:focus:ring-blue-500 outline-none "
          placeholder="Add your video to a category so viewers can find it more easily"
          required
        />
      </div>
    </div>
  );
};

const PlayVideo = () => {
  return <div clasName="col-span-1"></div>;
};

const Edit = () => {
  const { query } = useRouter();
  const { videos } = useStateContext();
  const { fetchChannelDetails, fetchVideoDetails } = useChannelState();

  const [userPlaylists, setUserPlaylists] = useState([]);
  // Playlist containing video
  const [videoPlaytlist, setVideoPlalist] = useState([]);

  const getUserPlaylists = async () => {
    const videoDetails = await fetchVideoDetails(videos, query?.uid);
    const userUid = await videoDetails?.channelRef;
    const userDetails = await fetchChannelDetails(userUid);
    setUserPlaylists(userDetails?.playlists);
    console.log(userDetails?.playlists);
  };

  function findPlaylistByVideoUid(uid, playlists) {
    // loop through all the playlists
    for (let i = 0; i < playlists.length; i++) {
      // check if the current playlist contains the given video uid
      if (playlists[i].videos.includes(uid)) {
        // return the first playlist that contains the given video uid
        console.log(playlists[i]);
      }
    }
    // if no playlist contains the given video uid, return null
    return null;
  }

  useEffect(() => {
    const runFunctions = async () => {
      await getUserPlaylists();
      const playlistContainingVideo = findPlaylistByVideoUid(
        query?.uid,
        userPlaylists
      );
      setVideoPlalist(videoPlaytlist);
    };
    runFunctions();
  }, []);

  return (
    <div className="flex-1 h-screen mt-16 p-4 w-[95vw] ml-[60px] flex flex-col">
      <Header uid={query?.uid} />
      <div className="grid h-screen overflow-y-auto p-3 sm:mr-4 scrollbar lg:grid-cols-3 sm:grid-cols-1">
        <EditVideo uid={query?.uid} userPlaylists={userPlaylists} />
        <PlayVideo />
      </div>
    </div>
  );
};

export default Edit;
