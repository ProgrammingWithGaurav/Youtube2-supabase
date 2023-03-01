import { useContext, createContext, useState } from "react";
import UIDGenerator from "uid-generator";
import { supabase } from "../SupabaseClient";
export const ChannelState = createContext();

export const ChannelStateProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState();

  const [channelSearch, setChannelSearch] = useState("");
  const [commentOption, setCommentOption] = useState("");
  const [likedVideos, setLikedVideos] = useState([]);

  // deffault channel
  /* 
    {
      channelName: "Gaurav",
      channelImage: "https://avatars.githubusercontent.com/u/88154142?v=4",
      channelBannerImage:
        "https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159__480.jpg",
      subscribers: 1301310301,
      uid: "a00c3e26-aa9b-11fa-afa1-0242ac120003",
      channelDisplayName: "Gaurav",
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
      views: 23242323232323,
      joinedDate: new Date(),
      description: `This is my brand new Channel`,
      location: "United States",
      subscriptions: [
        "a20c3a26-aa9b-11wa-afa1-0442ac120009",
        "a00c3e26-aa9b-11ed-afa1-0242ac120002",
      ],
      email: "gaurav@gmail.com",
      playlists: [
        {
          name: "MyPlaylist",
          videos: [],
        },  {
          name: "My Playlist 2 ",
          videos: ["449112141"],
        },
      ],
    }*/

  const [News, setNews] = useState([
    {
      image: "https://avatars.githubusercontent.com/u/88154142?v=4",
      title: "Make your videos more impressive by this tool",
      description: `sLorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae animi aliquam est ratione cum ducimus suscipit necessitatibus? Quia, corporis architecto.`,
      url: "https://yotuube-nextjs.netlify.app/news/helloworld",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/01/31/05/59/zebra-7757193_640.jpg",
      title: "Make your videos more ✅",
      description: `sLorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae animi aliquam est ratione cum ducimus suscipit necessitatibus? Quia, corporis architecto.`,
      url: "https://yotuube-nextjs.netlify.app/news/helloworld",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/01/05/22/35/flower-7700011_640.jpg",
      title: "Make your videos more impressive 🌟🌟🙂",
      description: `Check out this powerful tool for the Youtube SEO`,
      url: "https://yotuube-nextjs.netlify.app/news/helloworld",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/02/13/05/58/doodle-7786568__340.png",
      title: "Make your videos more impressive by this tool",
      description: `sLorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae animi aliquam est ratione cum ducimus suscipit necessitatibus? Quia, corporis architecto.`,
      url: "https://yotuube-nextjs.netlify.app/news/helloworld",
    },
  ]);

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
        }, {
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
  
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  const fetchChannelVideos = (videos) => {
    return videos.filter((video) => currentChannel?.uid === video?.channelRef);
  };

  const channelSearches = [
    "hello world",
    "programming",
    "coding",
    "learning javascript",
    "ReactJs",
  ];

  const UnSubscribe = (setSubscribed) => {
    setTimeout(() => {
      setSubscribed(false);
    }, 500);
  };

  const Subscribe = (setSubscribed) => {
    setTimeout(() => {
      setSubscribed(true);
    }, 500);
  };

  const Like = (like, setLike, type) => {
    if (type === "video") {
      like.like
        ? setLike({ like: false, dislike: false })
        : setLike({ like: true, dislike: false });
    } else if (type === "comment") {
      like.like
        ? setLike({ like: false, dislike: false })
        : setLike({ like: true, dislike: false });
    } else if (type === "reply") {
      like.like
        ? setLike({ like: false, dislike: false })
        : setLike({ like: true, dislike: false });
    }
  };

  const Dislike = (like, setLike, type) => {
    if (type === "video") {
      like.dislike
        ? setLike({ like: false, dislike: false })
        : setLike({ like: false, dislike: true });
    } else if (type === "comment") {
      like.dislike
        ? setLike({ like: false, dislike: false })
        : setLike({ like: false, dislike: true });
    } else if (type === "reply") {
      like.dislike
        ? setLike({ like: false, dislike: false })
        : setLike({ like: false, dislike: true });
    }
  };

  const fetchChannelDetails = (channelRef) => {
    return channels.filter((channel) => channel?.uid === channelRef)[0];
  };

  const fetchVideoDetails = (videos, uid) => {
    return videos.filter((video) => video?.uid === uid)[0];
  };

  const fetchLikedVideos = (videos) => {
    const data = videos.filter((video) =>
      video.likes.includes(currentChannel.uid)
    );
    setLikedVideos(data);
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
        handleLogin
      }}
    >
      {children}
    </ChannelState.Provider>
  );
};

export default ChannelStateProvider;
export const useChannelState = () => useContext(ChannelState);
