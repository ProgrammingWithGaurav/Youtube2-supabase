import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useStateContext } from "../../context/StateContext";
import { supabase } from "../../SupabaseClient";

const Item = ({ productImage, productPage, price, name, sponsor }) => {
  return (
    <div className="flex flex-col items-start p-4 space-y-1 justify-center">
      <a href={productPage} rel="noopener noreferrer" target="_blank">
        <img
          src={productImage}
          alt="product"
          className="cursor-pointer rounded-xl w-60 h-60"
        />
      </a>
      <p className="text-center">{name}</p>
      <p className="font-bold">
        $
        <NumericFormat
          value={price}
          allowLeadingZeros
          className="bg-transparent"
          thousandSeparator=","
          disabled={true}
        />
      </p>

      <a className='text-blue-500 text-xs flex items-center gap-1' href={productPage} rel="noopener noreferrer" target="_blank">
        <p>From {sponsor}</p>
        <ArrowTopRightOnSquareIcon className="icon text-blue-500 w-4 h-4 p-0 dark:text-blue-500" />
      </a>
    </div>
  );
};

const ChannelStore = () => {
  const {
    activeChannel: { uid },
  } = useStateContext();

  const [store, setStore] = useState([]);

  useEffect(() => {
    const myFunction = async () => {
      const {data} = await supabase.from('store').select().eq('channelRef', uid);
      setStore(data);
      console.log(data);
      console.log(uid);
    }
    myFunction();
  }, [])
  return (
    <div className="w-full flex flex-col items-start p-4 mt-10 dark:text-white h-screen">
      <p className="font-semibold text-lg mb-8">Featured</p>
      {store?.map((item) => (
        <Item key={item?.name} {...item} />
      ))}
    </div>
  );
};

export default ChannelStore;
