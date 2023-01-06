import React, { useEffect, useState } from "react";
import { Spinner, Input } from "components/ui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Charts from "./Charts";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

/** Example purpose only */
const CollapseMenuItemView2 = () => {
  const [loading, setLoading] = useState(true);
  const [requestData, setRequestData] = useState([]);
  console.log("🚀 ~ requestData", requestData);
  const [oldRequestData, setOldRequestData] = useState([]);
  console.log("🚀 ~ oldRequestData", oldRequestData);

  const getdataInternal = async () => {
    await axios
      .get(`${baseUrl}/normalTransaction`)
      .then((data) => {
        console.log("data", data);
        setRequestData(data);
        setOldRequestData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getdataInternal();
    // Daggfgcjhxg();
  }, []);

  const dataChangeHandler = (e) => {
    if (e.target.value) {
      const searchData = oldRequestData.filter((i) => {
        return (
          i?.blockNumber
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          i?.contractAddress
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          i?.from?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          i?.to?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          new Date(i?.createdAt)
            ?.toLocaleDateString([], {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
      });
      setRequestData(searchData);
    } else {
      setRequestData(oldRequestData);
    }
  };
  const notify = () => toast.success("Address Copied!");

  return (
    <>
    <ToastContainer />
    <Charts apiCallof="normalTransaction" />
      {loading ? (
        <div className="flex items-center">
          <Spinner className="absolute top-1/2 left-1/2" size="40px" />
        </div>
      ) : (
        <div className="overflow-x-auto relative">
          <Input
            type="text"
            placeholder="search"
            onChange={dataChangeHandler}
          />
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Block Number
                </th>
                <th scope="col" className="py-3 px-6">
                  Contract Address
                </th>
                <th scope="col" className="py-3 px-6">
                  From
                </th>
                <th scope="col" className="py-3 px-6">
                  To
                </th>
                <th scope="col" className="py-3 px-6">
                  Created Time
                </th>
              </tr>
            </thead>
            <tbody>
              {requestData?.map((item) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item._id}
                >
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.blockNumber}
                  </td>
                  <td className="py-4 px-6">
                    {item.contractAddress?.slice(0, 3)}...
                    {item.contractAddress?.slice(-3)}
                    <i
                      className="fa-solid fa-copy pl-2 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(item.contractAddress);
                        notify()
                      }}
                    ></i>
                  </td>
                  <td className="py-4 px-6">
                    <span>
                      {item?.from?.slice(0, 3)}...{item?.from?.slice(-3)}
                    </span>
                    <i
                      className="fa-solid fa-copy pl-2 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(item.from);
                        notify()
                      }}
                    ></i>
                  </td>
                  <td className="py-4 px-6">
                    <span>
                      {item?.to?.slice(0, 3)}...{item?.to?.slice(-3)}
                    </span>
                    <i
                      className="fa-solid fa-copy pl-2 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(item.to);
                        notify()
                      }}
                    ></i>
                  </td>
                  <td className="py-4 px-6">
                    {new Date(item?.createdAt)?.toLocaleDateString([], {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CollapseMenuItemView2;
