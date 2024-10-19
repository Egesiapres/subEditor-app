import axios from "axios";
import { config } from "../../config";

const { api } = config;

// generic request
const request = async (method, path) => {
  // if (!path) {
  //   throw new Error("API error: path is missing");
  // }

  try {
    const baseUrl = api.pokemon;

    const url = `${baseUrl}/${path}`;

    const config = {
      url,
      method,
    };

    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw new Error(`API error: ${error}`);
  }
};

// HTTP methods
export const get = async endpoint => request("GET", endpoint);
