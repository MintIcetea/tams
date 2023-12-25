"use client";

import TrueFalseIcon from "@/components/common/TrueFalseIcon";
import ActionSection from "@/components/tams/actions/ActionSection";
import AddAccountButton from "@/components/tams/settings/AddAccountBtn";
import EditSection from "@/components/tams/settings/EditSection";
import { UserTableUtilities } from "@/components/tams/table/UtilityContext";
import { useAccounts } from "@/components/tams/table/useAccounts";
import { AccountMetadata } from "@/utils/app.type";
import * as Accordion from "@radix-ui/react-accordion";
import { useState, useCallback, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { metadata } from "../layout";

interface SearchFormData {
  query: string;
  hasErrorFilter: boolean;
}

const TamsPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const {
    accounts,
    bufferAccounts,
    loadData,
    setBufferAccounts,
    resetBufferData,
  } = useAccounts();

  const { register, handleSubmit } = useForm<SearchFormData>({
    defaultValues: {
      query: "",
      hasErrorFilter: false,
    },
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleRowClick = useCallback(
    (username: string) => () => {
      setActiveUser((currentUser) => {
        if (currentUser === username) {
          return "";
        }
        return username;
      });
    },
    [],
  );

  const handleSearch = (data: SearchFormData) => {
    const { query, hasErrorFilter } = data;

    if (query.trim() === "" && !hasErrorFilter) {
      resetBufferData();
      return;
    }

    let result: AccountMetadata[] = [];
    if (query.trim() === "") {
      result = accounts;
    } else {
      result = accounts.filter(
        (account) =>
          account.username.includes(query) ||
          (account.email && account.email.includes(query)),
      );
    }

    if (!hasErrorFilter) {
      setBufferAccounts(result);
      return;
    }

    result = result.filter((account) => {
      if (account.error_reason) {
        return true;
      }

      return account.endpoints.some((endpoint) => !!endpoint.error_reason);
    });
    setBufferAccounts(result);
  };

  if (!loaded) {
    return null;
  }

  return (
    <div className="container mx-auto mt-24">
      <div className="my-4">
        <AddAccountButton refreshData={loadData} />
      </div>
      <div className="my-4">
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="grid grid-cols-3 gap-4 my-4">
            <div className="flex flex-col items-start space-y-2">
              <input
                placeholder="Username or email"
                {...register("query")}
                className="px-4 py-2 border border-slate-200 w-full rounded-lg"
              />
              <span className="space-x-2">
                <label htmlFor="has-error-filter">Has error?</label>
                <input
                  id="has-error-filter"
                  type="checkbox"
                  {...register("hasErrorFilter")}
                />
              </span>
            </div>
            <div className="space-x-4">
              <button
                className="px-4 py-2 rounded-lg cursor-pointer text-white bg-blue-500 hover:bg-blue-600"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <Accordion.Root type="single" value={activeUser} collapsible>
        <table className="table-auto w-full h-full border-collapseborder border-slate-400">
          <thead className="tams-thead py-2">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Email&apos;s password</th>
              <th>Cookies</th>
              <th>Auto confirm code</th>
              <th>Status</th>
              <th>Error</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tams-tbody">
            {bufferAccounts.map((data) => (
              <Fragment key={data.username}>
                <tr>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td className="center">
                    <TrueFalseIcon check={data.has_password} />
                  </td>
                  <td className="center">
                    <TrueFalseIcon check={data.has_email_password} />
                  </td>
                  <td className="center">
                    <TrueFalseIcon check={data.has_cookies} />
                  </td>
                  <td className="center">
                    <TrueFalseIcon check={data.auto_email_confirmation_code} />
                  </td>
                  <td className="center">{data.status}</td>
                  <td>{data.error_reason || "none"}</td>
                  <td className="center">
                    <a
                      href="#"
                      className="hover:text-blue-500 hover:underline"
                      onClick={handleRowClick(data.username)}
                    >
                      See more
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colSpan={100} style={{ padding: 0 }}>
                    <UserTableUtilities.Provider
                      value={{ refreshData: loadData }}
                    >
                      <Accordion.Item value={data.username}>
                        <Accordion.Header></Accordion.Header>
                        <Accordion.Content>
                          <div className="w-full h-full border border-slate-200 grid grid-cols-2">
                            <div className="border-r border-slate-200 p-4">
                              <div className="font-semibold mb-4">
                                Endpoints
                              </div>
                              {data.endpoints.map((endpoint) => (
                                <div
                                  key={`${data.username}${endpoint.id}`}
                                  className="p-2 mb-2 font-mono bg-gray-200"
                                >
                                  <div className="mr-1 space-x-2">
                                    /{endpoint.id} -{" "}
                                    {endpoint.status.toUpperCase()}
                                  </div>
                                  <div>
                                    - Limit: {endpoint.remaining}/
                                    {endpoint.call_limit}
                                  </div>
                                  <div>- Pending: {endpoint.pending}</div>
                                  <div>
                                    - Errors:{" "}
                                    <span>
                                      {endpoint.error_reason || "none"}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="p-4 border border-slate-200">
                              <div>
                                <EditSection accountMetadata={data} />
                              </div>
                              <div className="mt-4">
                                <ActionSection
                                  username={data.username}
                                  status={data.status}
                                />
                              </div>
                            </div>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    </UserTableUtilities.Provider>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </Accordion.Root>
      <Toaster reverseOrder />
    </div>
  );
};

export default TamsPage;
