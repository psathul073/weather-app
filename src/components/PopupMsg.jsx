import { useEffect } from "react";
import Icons from "../icons/Icons";

const PopupMsg = ({ message, setMessage }) => {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage(null);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [message]);

  return (
    <div className=" absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/6 dark:text-zinc-50 bg-zinc-950 rounded-3xl w-full max-w-72 p-6 shadow-2xl shadow-zinc-600/30 flex flex-col items-center">
      <div className=" text-3xl p-1 rounded-full ring-2 ring-orange-400/50 ring-offset-1 mb-4 bg-orange-500">
        <Icons name={"warning"} />
      </div>
      <h1 className="mb-2 text-lg font-semibold">Message</h1>
      <p className="w-full mb-10 text-base text-center">{message}</p>
    </div>
  );
};

export default PopupMsg;
