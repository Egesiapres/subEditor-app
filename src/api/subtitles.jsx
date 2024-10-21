import { get } from "./api.jsx";

/**
 * get info
 *
 * @param {string} // name
 * @returns {object} // data
 */

export const getSampleData = sampleData => get(`path/${sampleData}`);
