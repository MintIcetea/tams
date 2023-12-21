"use client";

import TrueFalseIcon from "@/components/common/TrueFalseIcon";
import EditSection from "@/components/tams/settings/EditSection";
import { AccountMetadata } from "@/utils/app.type";
import * as Accordion from "@radix-ui/react-accordion";
import { useState, useCallback, useEffect, Fragment } from "react";

const mockData: AccountMetadata[] = [
  {
    username: "ElbertTete41581",
    email: "sinioritokw@hotmail.com",
    has_password: true,
    has_email_password: true,
    has_cookies: true,
    status: "logged-in",
    error_reason: "",
    auto_email_confirmation_code: true,
    endpoints: [
      {
        id: "following",
        call_limit: 500,
        status: "ok",
        pending: 0,
        remaining: 499,
        reset: 1703127992,
        error_reason: "",
      },
      {
        id: "search-timeline",
        call_limit: 50,
        status: "ok",
        pending: 0,
        remaining: 49,
        reset: 1703127992,
        error_reason: "",
      },
      {
        id: "retweeters",
        call_limit: 500,
        status: "ok",
        pending: 0,
        remaining: 499,
        reset: 1703127992,
        error_reason: "",
      },
      {
        id: "favoriters",
        call_limit: 500,
        status: "ok",
        pending: 0,
        remaining: 499,
        reset: 1703127992,
        error_reason: "",
      },
    ],
  },
  {
    username: "EltonSheek74830",
    email: "ackahauresv@hotmail.com",
    has_password: true,
    has_email_password: true,
    has_cookies: true,
    status: "logged-in",
    error_reason: "",
    auto_email_confirmation_code: true,
    endpoints: [
      {
        id: "search-timeline",
        call_limit: 50,
        status: "ok",
        pending: 0,
        remaining: 49,
        reset: 1703127993,
        error_reason: "",
      },
      {
        id: "retweeters",
        call_limit: 500,
        status: "ok",
        pending: 0,
        remaining: 499,
        reset: 1703127993,
        error_reason: "",
      },
      {
        id: "favoriters",
        call_limit: 500,
        status: "ok",
        pending: 0,
        remaining: 499,
        reset: 1703127993,
        error_reason: "",
      },
      {
        id: "following",
        call_limit: 500,
        status: "forbidden",
        pending: 0,
        remaining: 499,
        reset: 1703127993,
        error_reason: "response status forbidden",
      },
    ],
  },
];

const TamsPage = () => {
  const [loaded, setLoaded] = useState(false);

  const [activeUser, setActiveUser] = useState("");

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

  if (!loaded) {
    return null;
  }

  return (
    <div className="container mx-auto mt-24">
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
            {mockData.map((data) => (
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
                    <Accordion.Item value={data.username}>
                      <Accordion.Header></Accordion.Header>
                      <Accordion.Content>
                        <div className="w-full h-full border border-slate-200 grid grid-cols-2">
                          <div className="border-r border-slate-200 p-4">
                            <div className="font-semibold mb-4">Endpoints</div>
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
                                  <span>{endpoint.error_reason || "none"}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 border border-slate-200">
                            <EditSection accountMetadata={data} />
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </Accordion.Root>
    </div>
  );
};

export default TamsPage;
