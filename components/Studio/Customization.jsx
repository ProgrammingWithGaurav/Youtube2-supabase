import React, { useState, useEffect } from "react";
import { useChannelState } from "../../context/ChannelState";
import { supabase } from "../../SupabaseClient";
import {
  ArrowDownCircleIcon,
  Bars2Icon,
  ClipboardIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import copy from "clipboard-copy";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { uid } from "uid";

const Header = () => {
  return (
    <div className="w-full flex flex-col lg:justify-between justify-around">
      <h2 className="text-bold text-xl">Channel Customization</h2>
      <h3 className="text-bold text-lg my-2 text-gray-700">Basic Info</h3>
    </div>
  );
};

const BasicInfo = () => {
  const [channelDetails, setChannelDetails] = useState();
  const [channelInfo, setChannelInfo] = useState();
  const { currentChannel } = useChannelState();

  useEffect(() => {
    const fetchDetails = async () => {
      const { data: info1 } = await supabase
        .from("channels")
        .select()
        .eq("uid", currentChannel?.uid);
      const { data: info2 } = await supabase
        .from("channelInfo")
        .select()
        .eq("channelRef", currentChannel?.uid);
      setChannelDetails(info1[0]);
      setChannelInfo(info2[0]);
    };
    fetchDetails();
  }, []);

  const Save = async () => {
    const { data: info1 } = await supabase
      .from("channels")
      .update({ ...channelDetails })
      .eq("uid", currentChannel?.uid)
      .select();
    const { data: info2 } = await supabase
      .from("channelInfo")
      .update({ ...channelInfo })
      .eq("channelRef", currentChannel?.uid)
      .select();
    console.log(info1, info2);
  };

  return (
    <div className="flex flex-col space-y-3 my-2">
      <div className="flex flex-col gap-2">
        <lable
          htmlFor="channelName"
          className="text-semibold text-gray-700 dark:text-gray-200 text-lg"
        >
          Name
        </lable>
        <input
          id="channelName"
          className="input dark:text-gray-200"
          value={channelDetails?.channelName}
          onChange={(e) =>
            setChannelDetails({
              ...channelDetails,
              channelName: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <lable
          htmlFor="channelDisplayNme"
          className="text-semibold text-gray-700 dark:text-gray-200 text-lg"
        >
          Display Name
        </lable>
        <input
          id="channelDisplayName"
          className="input dark:text-gray-200"
          value={channelDetails?.channelDisplayName}
          onChange={(e) =>
            setChannelDetails({
              ...channelDetails,
              channelDisplayName: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <lable
          htmlFor="description"
          className="text-semibold text-gray-700 dark:text-gray-200 text-lg"
        >
          Description
        </lable>
        <textarea
          id="description"
          className="input rounded-lg dark:text-gray-200"
          rows={6}
          value={channelInfo?.description}
          spellCheck={false}
          onChange={(e) =>
            setChannelInfo({ ...channelInfo, description: e.target.value })
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <h2
          htmlFor="description"
          className="text-semibold text-gray-700 dark:text-gray-200 text-xl"
        >
          Channel URL
        </h2>
        <input
          className="input dark:text-gray-200 flex-1"
          disabled
          value={`${process.env.NEXT_PUBLIC_BASE_URL}/${channelDetails?.channelName}`}
        />

        <ClipboardIcon
          className="clickable-icon"
          onClick={() =>
            copy(
              `${process.env.NEXT_PUBLIC_BASE_URL}/${channelDetails?.channelName}`
            )
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2
          htmlFor="description"
          className="text-semibold text-gray-700 dark:text-gray-200 text-lg"
        >
          Location
        </h2>
        <CountryDropdown
          className="py-2 px-4 text-lg bg-transparent dark:text-white border border-gray-400/40 dark:border-gray-200/40 p-2 rounded-2xl"
          value={channelInfo?.location}
          onChange={(val) => setChannelInfo({ ...channelInfo, location: val })}
        />
      </div>

      <button
        className="link-btn text-center dark:text-white bg-blue-500 text-white w-28"
        onClick={() => Save()}
      >
        Publish
      </button>
    </div>
  );
};

const AddNew = ({ newLink, links, setShowAddDialog, channelRef, setLinks, setNewLink }) => {
  const Remove = () => {
    setNewLink({ name: "", url: "" });
    setShowAddDialog(false);
  };

  const Add = async () => {
    const { name, url } = newLink;
    const isCorrect = name?.trim() !== '' && url?.trim() !== '';
    console.log(isCorrect)
    if (isCorrect) {
      // adding from the backend
      await supabase.from('socialLinks').insert({
        name: name, 
        url: url,
        channelRef: channelRef
      })
      setLinks([...links, newLink]);
      setNewLink({ name: "", url: "" });
      setShowAddDialog(false);
    }
  };
  return (
    <div className="flex items-center gap-2 w-full">
      <Bars2Icon className="icon" />
      <input
        className="input flex-1 dark:text-gray-200"
        placeholder="Link title (required)"
        value={newLink?.name}
        onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
      />
      <input
        className="input flex-1 dark:text-gray-200"
        placeholder="URL (required)"
        value={newLink?.url}
        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
      />
      <TrashIcon className="clickable-icon" onClick={() => Remove()} />
      <PlusCircleIcon className="clickable-icon" onClick={() => Add()} />
    </div>
  );
};

const Link = ({ name, url, id, setLinks }) => {
  const [newName, setNewName] = useState(name);
  const [newUrl, setNewUrl] = useState(url);
  const Remove = async () => {
    // deleting from the backend
    await supabase.from("socialLinks").delete().eq("id", id);
    const { data } = await supabase.from("socialLinks").select();
    setLinks(data);
  };

  const Update = async () => {
    // updating from the backend
    const { data } = await supabase
      .from("socialLinks")
      .update({ name: newName, url: newUrl })
      .eq("id", id)
      .select();
    const newData = data[0];
    const { name, url } = newData;
    setNewName(name);
    setNewUrl(url);
  };
  return (
    <div className="flex items-center gap-2 w-full">
      <Bars2Icon className="icon" />
      <input
        className="input flex-1 dark:text-gray-200"
        placeholder="Link title (required)"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        className="input flex-1 dark:text-gray-200"
        placeholder="URL (required)"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
      />
      <TrashIcon className="clickable-icon" onClick={() => Remove()} />
      <ArrowDownCircleIcon
        className="clickable-icon"
        onClick={() => Update()}
      />
    </div>
  );
};

const Links = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [links, setLinks] = useState();
  const [newLink, setNewLink] = useState({
    name: "",
    url: "",
  });
  const { currentChannel } = useChannelState();

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await supabase
        .from("socialLinks")
        .select()
        .eq("channelRef", currentChannel?.uid);
      setLinks(data);
    };
    fetchLinks();
  }, []);
  return (
    <div className="flex flex-col space-y-3 my-2">
      <h3 className="text-bold text-lg my-2 text-gray-700">Links</h3>
      <span className="text-sm text-gray-500 dark:text-gray-300">
        Add links to sites you want to share with your viewers
      </span>
      <button
        onClick={() => setShowAddDialog(true)}
        className="link-btn text-left flex items-center w-40"
      >
        <PlusIcon className="icon" /> Add Link
      </button>

      <div className="flex flex-col gap-2 w-[85vw]">
        {showAddDialog && (
          <AddNew
            newLink={newLink}
            setNewLink={setNewLink}
            setLinks={setLinks}
            links={links}
            setShowAddDialog={setShowAddDialog}
            channelRef={currentChannel?.uid}
          />
        )}
        {links?.map((link) => (
          <Link key={uid()} setLinks={setLinks} {...link} />
        ))}
      </div>
    </div>
  );
};

const Customization = () => {
  return (
    <div className="flex-1 h-screen mt-16 p-4 w-[95vw] ml-[60px] flex flex-col">
      <Header />
      <div className="flex flex-col space-y-2">
        <BasicInfo />
        <Links />
      </div>
    </div>
  );
};

export default Customization;
