import { useRouter } from "next/router";
import { useContext, createContext, useState, useEffect } from "react";
import { async } from "regenerator-runtime";
import { uid } from "uid";
import UIDGenerator from "uid-generator";
import { supabase } from "../SupabaseClient";
export const ChannelState = createContext();

export const ChannelStateProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState();

  const [channelSearch, setChannelSearch] = useState("");
  const [commentOption, setCommentOption] = useState("");
  const [likedVideos, setLikedVideos] = useState([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);

  const [News, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase.from("news").select();
      setNews(data);
    };
    fetchNews();
  }, []);

  const [Ideas, setIdeas] = useState([
    {
      image:
        "https://www.gstatic.com/youtube/img/promos/growth/3dcbeefeab5e82687817c0c8499fee91836836f78d8e5b978790b979a8308b92_160x160.png",
      title: "Make a channel trailer",
      description: `First impressions matter. You can win the hearts of unsubscribed viewers with a captivating trailer`,
      url: "https://yotuube-nextjs.netlify.app/news/helloworld",
      channelRef: "a00c3e26-aa9b-11fa-afa1-0242ac120003",
      dismiss: false,
    },
  ]);

  const [channels, setChannels] = useState([
    {
      channelName: "CleverProgrammer",
      channelImage:
        "https://yt3.googleusercontent.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s176-c-k-c0x00ffffff-no-rj",
      channelBannerImage:
        "https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159__480.jpg",
      subscribers: 1222000,
      channelDisplayName: "Clever Programmer",
      uid: "a00c3e26-aa9b-11ed-afa1-0242ac120002",
      socialLinks: [
        {
          name: "facebook",
          logo: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
          url: "http://www.facebook.com",
        },
        {
          name: "instagram",
          logo: "https://cdn-icons-png.flaticon.com/128/174/174855.png",
          url: "http://www.instagram.com",
        },
        {
          name: "twitter",
          logo: "https://cdn-icons-png.flaticon.com/128/733/733579.png",
          url: "http://www.twitter.com",
        },
      ],
      views: 243144111,
      joinedDate: new Date(),
      description: `You can find awesome programming lessons here! Also, expect programming tips and tricks that will take your coding skills to the next level.`,
      location: "United States",
      subscriptions: ["a20c3a26-aa9b-11wa-afa1-0442ac120009"],
      store: [
        {
          name: "Premium Programmer's Shirt",
          price: 1000,
          productPage: "https://unsplash.com/photos/Wr0TpKqf26s",
          productImage:
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          sponsor: "Unsplash",
        },
      ],
      email: "cleverpgorammer@gmail.com",
      playlists: [
        {
          name: "MyPlaylist",
          videos: ["449112141"],
        },
      ],
    },

    {
      channelName: "Gaurav",
      channelImage: "https://avatars.githubusercontent.com/u/88154142?v=4",
      channelBannerImage:
        "https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159__480.jpg",
      subscribers: 122233232000,
      channelDisplayName: "Gaurav",
      uid: "a00c3e26-aa9b-11fa-afa1-0242ac120003",
      socialLinks: [
        {
          name: "facebook",
          logo: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
          url: "http://www.facebook.com",
        },
        {
          name: "instagram",
          logo: "https://cdn-icons-png.flaticon.com/128/174/174855.png",
          url: "http://www.instagram.com",
        },
        {
          name: "twitter",
          logo: "https://cdn-icons-png.flaticon.com/128/733/733579.png",
          url: "http://www.twitter.com",
        },
      ],
      views: 243144111,
      joinedDate: new Date(),
      description: `You can find awesome programming lessons here! Also, expect programming tips and tricks that will take your coding skills to the next level.`,
      location: "United States",
      subscriptions: ["a20c3a26-aa9b-11wa-afa1-0442ac120009"],
      store: [
        {
          name: "Premium Programmer's Shirt",
          price: 1000,
          productPage: "https://unsplash.com/photos/Wr0TpKqf26s",
          productImage:
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          sponsor: "Unsplash",
        },
      ],
      email: "gaurav@gmail.com",
      playlists: [
        {
          name: "hi",
          videos: ["44242142"],
        },
        {
          name: "MyPlaylist",
          videos: ["44242141"],
        },
      ],
    },

    {
      channelName: "HiGuys",
      channelImage: "https://avatars.githubusercontent.com/u/88154142?v=4",
      channelBannerImage:
        "https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159__480.jpg",
      subscribers: 122233232000,
      channelDisplayName: "My Channel",
      uid: "a20c3a26-aa9b-11wa-afa1-0442ac120009",
      socialLinks: [
        {
          name: "facebook",
          logo: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
          url: "http://www.facebook.com",
        },
        {
          name: "instagram",
          logo: "https://cdn-icons-png.flaticon.com/128/174/174855.png",
          url: "http://www.instagram.com",
        },
        {
          name: "twitter",
          logo: "https://cdn-icons-png.flaticon.com/128/733/733579.png",
          url: "http://www.twitter.com",
        },
      ],
      views: 243144111,
      joinedDate: new Date(),
      description: `You can find awesome programming lessons here! Also, expect programming tips and tricks that will take your coding skills to the next level.`,
      location: "United States",
      subscriptions: ["a20c3a26-aa9b-11wa-afa1-0442ac120009"],
      store: [
        {
          name: "Premium Programmer's Shirt",
          price: 1000,
          productPage: "https://unsplash.com/photos/Wr0TpKqf26s",
          productImage:
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          sponsor: "Unsplash",
        },
      ],
      email: "mychannel@gmail.com",
    },
  ]);

  const [showUpload, setShowUpload] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("Dashboard");
  const [bottomActiveSidebar, setBottomActiveSidebar] = useState("");
  const [videoDetailSidebar, setVideoDetailSidebar] = useState("Edit");
  const [editDialog, setEditDialog] = useState(false);
  const [thumbnailDialog, setThumbnailDialog] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const fetchChannelVideos = async (uid) => {
    const { data } = await supabase
      .from("videos")
      .select()
      .eq("channelRef", uid ? uid : currentChannel?.uid);
    return data;
  };

  const getVideoThumbnail = async (url, callback) => {
    var video = document.createElement("video");
    video.addEventListener("loadeddata", function () {
      var canvas = document.createElement("canvas");
      canvas.width = this.videoWidth;
      canvas.height = this.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(this, 0, 0, canvas.width, canvas.height);
      var dataURL = canvas.toDataURL();
      callback(dataURL);
      URL.revokeObjectURL(this.src);
    });
    video.src = url;
    video.setAttribute("crossorigin", "anonymous");
    video.setAttribute("autoplay", "true");
    video.setAttribute("loop", "true");
    video.setAttribute("muted", "true");
  };

  const changeChannelImage = async (e, setNewChannelImage) => {
    const avatarImage = e.target.files[0];
    const location = uid();
    const { data, error } = await supabase.storage
      .from("channel-images")
      .upload(location, avatarImage, {
        cacheControl: "3600",
        upsert: false,
      });
    const path = data?.path;
    const channelImage = `https://lumsrpmlumtfpbbafpug.supabase.co/storage/v1/object/public/channel-images/${path}`;
    setNewChannelImage(channelImage);
    await supabase
      .from("channels")
      .update({ channelImage: channelImage })
      .eq("uid", currentChannel?.uid);
    setCurrentChannel({ ...currentChannel, channelImage: channelImage });
    e.target.value = "";
  };

  const changeChannelBannerImage = async (e, setNewBannerImage) => {
    console.log("uploading....");
    const avatarImage = e.target.files[0];
    const location = uid();
    const { data, error } = await supabase.storage
      .from("channel-banner-images")
      .upload(location, avatarImage, {
        cacheControl: "3600",
        upsert: false,
      });
    const path = data?.path;
    const bannerImage = `https://lumsrpmlumtfpbbafpug.supabase.co/storage/v1/object/public/channel-banner-images/${path}`;
    setNewBannerImage(bannerImage);
    await supabase
      .from("channels")
      .update({ channelBannerImage: bannerImage })
      .eq("uid", currentChannel?.uid);
    setCurrentChannel({ ...currentChannel, channelBannerImage: bannerImage });
    e.target.value = "";
  };

  const channelSearches = [
    "hello world",
    "programming",
    "coding",
    "learning javascript",
    "ReactJs",
  ];

  const UnSubscribe = (setUpdatedSubscribers, setIsSubscribed, uid) => {
    if (!currentChannel) return;
    setTimeout(async () => {
      const { data } = await supabase
        .from("channelInfo")
        .select()
        .eq("channelRef", uid);
      let newSubscribers = data[0]?.subscribers;
      const index = newSubscribers.indexOf(currentChannel.uid);
      newSubscribers.splice(index, 1);
      await supabase
        .from("channelInfo")
        .update({ subscribers: newSubscribers })
        .eq("channelRef", uid);
      setUpdatedSubscribers(newSubscribers?.length);
      setIsSubscribed(false);
    }, 500);
  };

  const Subscribe = (setUpdatedSubscribers, setIsSubscribed, uid) => {
    if (!currentChannel || currentChannel?.uid === uid) return;
    setTimeout(async () => {
      const { data } = await supabase
        .from("channelInfo")
        .select()
        .eq("channelRef", uid);
      const newSubscribers = [...data[0]?.subscribers, currentChannel?.uid];
      await supabase
        .from("channelInfo")
        .update({ subscribers: newSubscribers })
        .eq("channelRef", uid);
      setUpdatedSubscribers(newSubscribers?.length);
      setIsSubscribed(true);
    }, 500);
  };

  const fetchCommentDetails = async (uid) => {
    const { data } = await supabase.from("comments").select().eq("uid", uid);
    return data[0];
  };

  const fetchReplyDetails = async (uid) => {
    const { data } = await supabase.from("replies").select().eq("uid", uid);
    return data[0];
  };

  const Like = async (like, setLike, type, uid, setUpdatedLikes) => {
    if (!currentChannel) return;
    if (like.like) {
      const details =
        type === "video"
          ? await fetchVideoDetails(uid)
          : type === "comment"
          ? await fetchCommentDetails(uid)
          : type === "reply"
          ? await fetchReplyDetails(uid)
          : null;
      console.log(details);
      let likes = details?.likes;
      const userLikeIndex = details?.likes.indexOf(currentChannel?.uid);
      likes.splice(userLikeIndex, 1);
      await supabase
        .from(
          type === "video"
            ? "videos"
            : type === "comment"
            ? "comments"
            : type === "reply"
            ? "replies"
            : null
        )
        .update({ likes: likes })
        .eq("uid", uid);
      setUpdatedLikes((likes) => --likes);
      setLike({ like: false, dislike: false });
    } else {
      // add a like
      const details =
        type === "video"
          ? await fetchVideoDetails(uid)
          : type === "comment"
          ? await fetchCommentDetails(uid)
          : type === "reply"
          ? await fetchReplyDetails(uid)
          : null;

      console.log(details);
      let dislikes = details?.dislikes;

      const removeDislike = () => {
        const userLikeIndex = dislikes?.indexOf(currentChannel?.uid);
        dislikes.splice(userLikeIndex, 1);
      };
      // remove the uid of the user from the dislike array if existed
      details?.dislikes?.includes(currentChannel?.uid) && removeDislike();
      await supabase
        .from(
          type === "video"
            ? "videos"
            : type === "comment"
            ? "comments"
            : type === "reply"
            ? "replies"
            : null
        )
        .update({
          likes: [...details?.likes, currentChannel?.uid],
          dislikes: dislikes,
        })
        .eq("uid", uid);
      setLike({ like: true, dislike: false });
      setUpdatedLikes((likes) => ++likes);
    }
  };

  const Dislike = async (like, setLike, type, uid, setUpdatedLikes) => {
    if (!currentChannel) return;
    if (like.dislike) {
      const details =
        type === "video"
          ? await fetchVideoDetails(uid)
          : type === "comment"
          ? await fetchCommentDetails(uid)
          : type === "reply"
          ? await fetchReplyDetails(uid)
          : null;
      console.log(details);
      let dislikes = details?.dislikes;
      const userDislikeIndex = details?.dislikes.indexOf(currentChannel?.uid);
      dislikes.splice(userDislikeIndex, 1);
      await supabase
        .from(
          type === "video"
            ? "videos"
            : type === "comment"
            ? "comments"
            : type === "reply"
            ? "replies"
            : null
        )
        .update({ dislikes: dislikes })
        .eq("uid", uid);
      setLike({ like: false, dislike: false });
    } else {
      // add a like
      const details =
        type === "video"
          ? await fetchVideoDetails(uid)
          : type === "comment"
          ? await fetchCommentDetails(uid)
          : type === "reply"
          ? await fetchReplyDetails(uid)
          : null;
      console.log(details);
      let likes = details?.likes;

      const removeLike = () => {
        const userDisLikeIndex = likes?.indexOf(currentChannel?.uid);
        likes.splice(userDisLikeIndex, 1);
      };
      // remove the uid of the user from the dislike array if existed
      details?.likes?.includes(currentChannel?.uid) && removeLike();
      await supabase
        .from(
          type === "video"
            ? "videos"
            : type === "comment"
            ? "comments"
            : type === "reply"
            ? "replies"
            : null
        )
        .update({
          dislikes: [...details?.dislikes, currentChannel?.uid],
          likes: likes,
        })
        .eq("uid", uid);
      setLike({ like: false, dislike: true });
      setUpdatedLikes((likes) => likes >= 1 && likes - 1);
    }
  };

  const fetchChannelDetails = async (channelRef) => {
    try {
    const { data } = await supabase
      .from("channels")
      .select()
      .eq("uid", channelRef);
    return data[0];
    } catch{err => console.log(err)}
  };

  const fetchVideoDetails = async (uid) => {
    const { data: videoDetails } = await supabase
      .from("videos")
      .select()
      .eq("uid", uid);
    return videoDetails[0];
  };

  const deleteVideo = async (uid) => {
    await supabase.from("videos").delete().eq("uid", uid);
    router.push("/");
    window.location.reload();
    return;
  };

  const fetchLikedVideos = async () => {
    const { data: videos } = await supabase.from("videos").select();
    const likedVideos = videos?.filter((video) =>
      video?.likes?.includes(currentChannel?.uid)
    );
    setLikedVideos(likedVideos);
  };

  const fetchWatchLaterVideos = async () => {
    const { data } = await supabase
      .from("channelInfo")
      .select()
      .eq("channelRef", currentChannel?.uid);
    if (data[0]?.watchLater?.length === 0) return;
    const videosUid = data[0]?.watchLater;
    if (videosUid?.length > 0) {
      const { data: videos } = await supabase.from("videos").select();
      const watchLaterVideos = videos?.filter((video) =>
        videosUid.includes(video?.uid)
      );
      setWatchLaterVideos(watchLaterVideos);
    }
  };

  const GetUid = () => {
    const uidgen = new UIDGenerator();
    return uidgen.generateSync();
  };

  function addCommas(num) {
    // Convert the number to a string and split it into an array of characters
    const numStr = num.toString().split("");

    // Determine the position of the first comma by taking the length of the string modulo 3
    const firstCommaPos = numStr.length % 3;

    // Initialize the result string with the characters before the first comma
    let result =
      firstCommaPos > 0 ? numStr.slice(0, firstCommaPos).join("") + "," : "";

    // Loop over the remaining characters, adding commas every three characters
    for (let i = firstCommaPos; i < numStr.length; i += 3) {
      result +=
        numStr.slice(i, i + 3).join("") + (i + 3 < numStr.length ? "," : "");
    }

    return result;
  }

  const startLoadingBar = (
    setLoading,
    setLoadingProgress,
    function1,
    function2
  ) => {
    setLoading(true);
    setLoadingProgress(90);
    setTimeout(() => {
      setLoadingProgress(100);
    }, 500);

    setTimeout(() => {
      setLoadingProgress(100);
      try {
        function1();
        function2();
      } catch (e) {
        console.log(e);
      }
    }, 700);
  };
  return (
    <ChannelState.Provider
      value={{
        currentChannel,
        setCurrentChannel,
        channelSearch,
        setChannelSearch,
        channels,
        setChannels,
        Subscribe,
        UnSubscribe,
        Like,
        Dislike,
        commentOption,
        setCommentOption,
        fetchChannelDetails,
        fetchLikedVideos,
        likedVideos,
        GetUid,
        channelSearches,
        fetchChannelVideos,
        showUpload,
        setShowUpload,
        activeSidebar,
        setActiveSidebar,
        addCommas,
        News,
        setNews,
        Ideas,
        setIdeas,
        bottomActiveSidebar,
        setBottomActiveSidebar,
        startLoadingBar,
        fetchVideoDetails,
        videoDetailSidebar,
        setVideoDetailSidebar,
        setEditDialog,
        editDialog,
        thumbnailDialog,
        setThumbnailDialog,
        handleLogin,
        getVideoThumbnail,
        changeChannelImage,
        changeChannelBannerImage,
        fetchWatchLaterVideos,
        watchLaterVideos,
      }}
    >
      {children}
    </ChannelState.Provider>
  );
};

export default ChannelStateProvider;
export const useChannelState = () => useContext(ChannelState);
