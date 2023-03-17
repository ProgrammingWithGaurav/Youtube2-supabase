import {
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ClipboardIcon,
  EllipsisVerticalIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useChannelState } from "../../../context/ChannelState";
import { useStateContext } from "../../../context/StateContext";
import Tooltip from "../../Tooltip";
import copy from "clipboard-copy";
import { supabase } from "../../../SupabaseClient";

const Header = ({
  uid,
  setEditedDetails,
  videoDetails,
  url,
  editedDetails,
}) => {
  const router = useRouter();
  const { editDialog, setEditDialog, startLoadingBar } = useChannelState();
  const { setLoading, setLoadingProgress } = useStateContext();
  const Delete = async () => {
    await supabase.from("videos").delete().eq("uid", uid);
    setEditDialog(false);
    router.push("/studio?content=true");
  };

  const resetEditedDetails = () => {
    const getPreviousDetails = async () => {
      const { data } = await supabase.from("videos").select().eq("uid", uid);
      console.log(data);
      setEditedDetails(data[0]);
    };
    startLoadingBar(setLoading, setLoadingProgress, () => getPreviousDetails());
  };

  const saveEditedDetails = async () => {
    const updateNewDetails = async () => {
      const { data } = await supabase
        .from("videos")
        .update({ ...editedDetails })
        .select()
        .eq("uid", uid);
      setEditedDetails(data);
    };
    startLoadingBar(setLoading, setLoadingProgress, () => updateNewDetails());
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
        <button
          onClick={() => resetEditedDetails()}
          className="link-btn click-show video-control"
        >
          Undo Changes
        </button>
        <button
          onClick={() => saveEditedDetails()}
          className="bg-blue-500 !text-white rounded-lg cursor-pointer link-btn dark:bg-blue-400 click-show "
        >
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
              <a href={`${url}`} download>
                <span className="lg:block hidden">Download</span>
              </a>
            </p>
            <p
              onClick={() => Delete()}
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

const PlayVideo = ({ url }) => {
  const { setToast, toast } = useStateContext();

  const [key, setKey] = useState("key");

  useEffect(() => {
    setKey(url);
  }, [url]);

  return (
    <div className="col-span-1 flex flex-col h-max ring-gray-400/20 dark:ring-gray-100/20 ring-1 rounded-lg p-2">
      <video className="w-full rounded-md" controls key={key}>
        <source src={url} type="video/mp4" />
      </video>
      <div className="flex flex-col my-4">
        <span className="text-gray">Video Link</span>
        <p className="flex items-center justify-between">
          <span className="text-blue-500 truncate">{url}</span>
          <ClipboardIcon
            className="clickable-icon click-show ml-20"
            onClick={() => {
              copy(url);
              setToast({
                text: "Link copied to clipboard",
                icon: <ClipboardIcon />,
                color: "blue",
                open: true,
              });
              setTimeout(() => {
                setToast({ ...toast, open: false });
              }, 1500);
            }}
          />
        </p>
      </div>
    </div>
  );
};

const EditVideo = ({ uid, videoDetails }) => {
  const { thumbnailDialog, setThumbnailDialog, GetUid } = useChannelState();
  const thumbnailRef = useRef(null);
  const [editedDetails, setEditedDetails] = useState(videoDetails);
  const [key, setKey] = useState("key");

  useEffect(() => {
    const newKey = GetUid();
    setKey(newKey);
  }, [editedDetails]);

  useEffect(() => {
    setEditedDetails(videoDetails);
  }, [videoDetails]);

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    const location = GetUid();
    const { data } = await supabase.storage
      .from("thumbnails")
      .upload(location, file, {
        cacheControl: "3600",
        upsert: false,
      });
    const path = data?.path;
    const newThumbnail = `https://lumsrpmlumtfpbbafpug.supabase.co/storage/v1/object/public/thumbnails/${path}`;
    setEditedDetails({ ...editedDetails, thumbnail: newThumbnail });
    event.target.value = "";
  };
  return (
    <Fragment>
      <Header
        url={editedDetails?.url}
        uid={uid}
        setEditedDetails={setEditedDetails}
        editedDetails={editedDetails}
        videoDetails={videoDetails}
      />
      <div className="grid h-screen overflow-y-auto p-3 sm:mr-4 scrollbar lg:grid-cols-3 sm:grid-cols-1">
        <div className="col-span-2 flex flex-col mr-4">
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
              value={editedDetails?.title}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, title: e.target.value })
              }
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
              spellCheck={false}
              value={editedDetails?.description}
              onChange={(e) =>
                setEditedDetails({
                  ...editedDetails,
                  description: e.target.value,
                })
              }
              id="description"
              className="ring-1 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 bg-transparent  dark:text-white dark:focus:ring-blue-500 outline-none"
              placeholder="Tell viewers about your video"
            />
          </div>

          {/* <div>
            <label
              htmlFor="playlist"
              className="block my-4 text-xl font-medium text-gray-900 dark:text-white"
            >
              Choose a playlist
            </label>
            <select
              onChange={(e) => {
                setVideoPlaylist(e.target.value);
              }}
              id="playlist"
              className="ring-1 bg-transparent text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 text-blue-400 dark:focus:ring-blue-500 outline-none"
            >
              {userPlaylists?.map((playlist) =>
                playlist?.name === videoPlaylist ? (
                  <option value={playlist?.name} selected key={GetUid()}>
                    {playlist?.name}
                  </option>
                ) : (
                  <option value={playlist?.name} key={GetUid()}>
                    {playlist?.name}
                  </option>
                )
              )}
            </select>
          </div> */}

          <div className="mb-6">
            <p className="my-4 flex flex-col text-bold text-lg text-gray-900 dark:text-white">
              Thumbnail
            </p>
            <div className="relative w-80 h-60">
              <img
                key={key}
                src={editedDetails?.thumbnail}
                className="object-cover rounded-xl w-80 h-44"
                alt="thumbnail image"
              />
              <EllipsisVerticalIcon
                onClick={() => setThumbnailDialog(!thumbnailDialog)}
                className="absolute right-2 top-2 clickable-icon click-show video-control"
              />

              <input
                type="file"
                accept="image/*"
                ref={thumbnailRef}
                onChange={(e) => uploadFile(e)}
                className="w-0 h-0"
              />
              {thumbnailDialog && (
                <div className="absolute -right-36 top-2 shadow bg-gray-50 rounded-xl dark:text-white p-2 dark:bg-neutral-900 flex flex-col">
                  <p
                    onClick={() => {
                      setThumbnailDialog(false);
                      thumbnailRef.current.click();
                    }}
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
              value={editedDetails?.type}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, type: e.target.value })
              }
              className=" ring-1 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 px-4 bg-transparent  dark:text-white dark:focus:ring-blue-500 outline-none "
              placeholder="Add your video to a category so viewers can find it more easily"
              required
            />
          </div>

          <button
            type="button"
            className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg w-20 transition px-5 py-2.5 mr-2 mb-2 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>

        <PlayVideo url={videoDetails?.url} />
      </div>
    </Fragment>
  );
};

const Edit = () => {
  const { query } = useRouter();
  const { videos } = useStateContext();
  const { currentChannel, fetchVideoDetails } = useChannelState();

  // Playlist containing video
  const [videoDetails, setVideoDetails] = useState();

  const getVideoDetails = async () => {
    const videoDetails = await fetchVideoDetails(query?.uid);
    setVideoDetails(videoDetails);
  };

  useEffect(() => {
    getVideoDetails();
  }, []);

  return (
    <div className="flex-1 h-screen mt-16 p-4 w-[95vw] ml-[60px] flex flex-col">
      <EditVideo uid={query?.uid} videoDetails={videoDetails} />
    </div>
  );
};

export default Edit;
