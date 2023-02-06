import { useContext, createContext, useState } from "react";
export const ChannelState = createContext();

export const ChannelStateProvider = ({ children }) => {

  
  const [currentChannel, setCurrentChannel] = useState({
    channelName: "Gaurav",
    channelImage:
      "https://avatars.githubusercontent.com/u/88154142?v=4",
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
});

  return (
    <ChannelState.Provider
      value={{
        currentChannel, setCurrentChannel
      }}
    >
      {children}
    </ChannelState.Provider>
  );
};

export default ChannelStateProvider;
export const useChannelState = () => useContext(ChannelState);
