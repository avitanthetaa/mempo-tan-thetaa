import React, { useEffect, useState } from "react";
import { Input, Button, Tooltip, FormItem, FormContainer } from "components/ui";
import { Formik, Field, Form } from "formik";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import axios from "axios";
import { head } from "lodash";
import { Tabs } from "components/ui";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const { TabNav, TabList, TabContent } = Tabs;
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const tip = (
  <Tooltip title="Field info">
    <HiOutlineQuestionMarkCircle className="text-lg cursor-pointer ml-1" />
  </Tooltip>
);

const optional = <span className="ml-1 opacity-60">(optional)</span>;
/** Example purpose only */
const SingleMenuView = () => {
  const [loading, setLoading] = useState(true);

  const [inputData, setInputData] = useState("");

  const [blackListInputData, setBlackListInputData] = useState("");
  console.log("🚀 ~ blackListInputData", blackListInputData);

  const [storeData, setStoreData] = useState("");

  const [blackListStoreData, setBlackListStoreData] = useState("");

  const [backendData, setBackendData] = useState([]);

  const [blackListDataShow, setBlackListDataShow] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/getContract`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ listType: true }),
    })
      .then((res) => res.json())
      .then(function(res) {
        setBackendData(res);
      })
      .catch((err) => console.log(err));

    fetch(`${baseUrl}/getContract`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ listType: false }),
    })
      .then((res) => res.json())
      .then(function(res) {
        setBlackListDataShow(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const changeHandler = (event) => {
    setInputData(event.target.value);
  };

  const blackListChangeHandler = (event) => {
    setBlackListInputData(event.target.value);
  };

  const submitHandler = () => {
    fetch(`${baseUrl}/addContract`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ contract: inputData, listType: true }),
    })
      .then((res) => res.json())
      .then(function(res) {
        setStoreData(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    submitNotify();
  };

  const blackListSubmitHandler = () => {
    fetch(`${baseUrl}/addContract`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ contract: blackListInputData, listType: false }),
    })
      .then((res) => res.json())
      .then(function(res) {
        console.log("🚀 ~ res", res);
        // setStoreData(res);
      })
      .catch((err) => console.log(err));

    blackListSubmitNotify();
  };

  const notify = () => toast.success("Contract Address Copied!");
  const submitNotify = () => toast.success("Whitelisted!");
  const blackListSubmitNotify = () => toast.success("Black Listed!");

  return (
    <>
      <ToastContainer />

      <div>
        <Tabs defaultValue="tab1">
          <TabList>
            <TabNav value="tab1">Whitelist Contract</TabNav>
            <TabNav value="tab2">Blacklist Contract</TabNav>
          </TabList>
          <div className="p-4">
            <TabContent value="tab1">
              <div>
                <Formik
                  initialValues={{
                    fieldA: "",
                  }}
                  onSubmit={submitHandler}
                >
                  <Form>
                    <FormContainer>
                      <FormItem label="Polygon Contract Address">
                        <Field
                          type="text"
                          name="fieldA"
                          placeholder="Please Input contract address"
                          component={Input}
                          value={inputData}
                          onChange={changeHandler}
                          minLength="42"
                          maxLength="42"
                        />
                      </FormItem>

                      <FormItem>
                        <Button type="submit">Submit</Button>
                      </FormItem>
                    </FormContainer>
                  </Form>
                </Formik>
              </div>

              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Sr. No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Contract Address
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Created Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {backendData.map((item, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <td
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {console.info(item)}
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">
                        {item.contract}{" "}
                        <i
                          className="fa-solid fa-copy pl-2 cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(item.contract);
                            notify();
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
            </TabContent>
            <TabContent value="tab2">
              <div>
                <Formik
                  initialValues={{
                    fieldB: "",
                  }}
                  onSubmit={blackListSubmitHandler}
                >
                  <Form>
                    <FormContainer>
                      <FormItem label="Polygon Contract Address">
                        <Field
                          type="text"
                          name="fieldB"
                          placeholder="Please Input contract address"
                          component={Input}
                          value={blackListInputData}
                          onChange={blackListChangeHandler}
                          minLength="42"
                          maxLength="42"
                        />
                      </FormItem>

                      <FormItem>
                        <Button type="submit">Submit</Button>
                      </FormItem>
                    </FormContainer>
                  </Form>
                </Formik>
              </div>

              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Sr. No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Contract Address
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Created Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blackListDataShow.map((item, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <td
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">
                        {item.contract}
                        <i
                          className="fa-solid fa-copy pl-2 cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(item.contract);
                            notify();
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
            </TabContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default SingleMenuView;
