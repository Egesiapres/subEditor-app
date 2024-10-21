import axios from "axios";
import { config } from "../../config";

const { api } = config;

// Generic Request
const request = async (method, path) => {
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

// Simulate Request Delay
export const fakeRequest = (timeout = 1000) => {
  return new Promise(resolve => {
    // simulate a 1 seconds delay (1000 ms)
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};
