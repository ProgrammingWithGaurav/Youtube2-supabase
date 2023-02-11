import { useContext, createContext, useState } from "react";
export const ChannelState = createContext();

export const ChannelStateProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState({
    channelName: "Gaurav",
    channelImage: "https://avatars.githubusercontent.com/u/88154142?v=4",
    channelBannerImage:
      "https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159__480.jpg",
    subscribers: 1301310301,
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
      {
        channelName: "MyChannel",
        channelDisplayName: "My Channel",
        subscribers: 3777,
        channelImage:
          "https://yt3.googleusercontent.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s176-c-k-c0x00ffffff-no-rj",
      },
      {
        channelName: "CleverProgrammer",
        channelDisplayName: "Clever Programmer",
        subscribers: 1222000,
        channelImage:
          "https://yt3.googleusercontent.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s176-c-k-c0x00ffffff-no-rj",
      },
    ],
    email: "gaurav@gmail.com",
  });

  const [channelSearch, setChannelSearch] = useState("");
  const [commentOption, setCommentOption] = useState('');

  const [channels, setChannels] = useState([
    {
      channelName: "CleverProgrammer",
      channelImage:
        "https://yt3.googleusercontent.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s176-c-k-c0x00ffffff-no-rj",
      channelBannerImage:
        "https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159__480.jpg",
      subscribers: 1222000,
      channelDisplayName: "CleverProgrammer",
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
      subscriptions: [
        {
          channelName: "MyChannel",
          channelDisplayName: "My Channel",
          subscribers: 3777,
          channelImage:
            "https://yt3.googleusercontent.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s176-c-k-c0x00ffffff-no-rj",
        },
      ],
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
    },

    {
      channelName: "Gaurav",
      channelImage: "https://avatars.githubusercontent.com/u/88154142?v=4",
      channelBannerImage:
        "https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159__480.jpg",
      subscribers: 122233232000,
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
      views: 243144111,
      joinedDate: new Date(),
      description: `You can find awesome programming lessons here! Also, expect programming tips and tricks that will take your coding skills to the next level.`,
      location: "United States",
      subscriptions: [
        {
          channelName: "MyChannel",
          channelDisplayName: "My Channel",
          subscribers: 3777,
          channelImage:
            "https://yt3.googleusercontent.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s176-c-k-c0x00ffffff-no-rj",
        },
      ],
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
    },
  ]);

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
        setCommentOption
      }}
    >
      {children}
    </ChannelState.Provider>
  );
};

export default ChannelStateProvider;
export const useChannelState = () => useContext(ChannelState);
