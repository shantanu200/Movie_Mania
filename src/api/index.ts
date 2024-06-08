import axios, { AxiosError } from "axios";

type Action = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const ServerAction = async (
  action: Action,
  url: string,
  payload?: any,
  headers?: any
) => {
  const serverHeaders = {
    headers: {
      ...headers,
    },
  };

  switch (action) {
    case "GET":
      return await axios.get(url, serverHeaders);

    case "POST":
      return await axios.post(url, payload, serverHeaders);

    case "PUT":
      return await axios.put(url, payload, serverHeaders);

    case "DELETE":
      return await axios.delete(url, serverHeaders);

    case "PATCH":
      return await axios.patch(url, payload, headers);

    default:
      return null;
  }
};

const APIHandler = async (
  action: Action,
  url: string,
  payload?: any,
  headers?: any
) => {
  try {
    const actionResponse = await ServerAction(action, url, payload, headers);

    if (actionResponse === null) {
      return {
        error: true,
        data: "Invalid Action passed",
      };
    }

    if (actionResponse?.status >= 200 && actionResponse?.status <= 299) {
      return {
        error: false,
        data: actionResponse?.data,
      };
    }
    return {
      error: true,
      data: actionResponse?.data,
    };
  } catch (e) {
    const { response } = e as AxiosError;

    console.error("Error Response :: ", JSON.stringify(response));

    return {
      error: true,
      data: response,
    };
  }
};

export default APIHandler;
