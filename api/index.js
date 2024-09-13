import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
  let url = `${apiUrl}&per_page=20&safesearch=true&editors_choice=true`;

  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });

  console.log("Formatted URL:", url); // Log the URL to ensure correctness
  return url;
};

export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;

    console.log("API Response Data:", data); // Log the response data before returning

    return { success: true, data };
  } catch (error) {
    // Log the error with more detailed information
    if (error.response) {
      console.log("API Error Response:", error.response.data);
      console.log("API Error Status:", error.response.status);
    } else if (error.request) {
      console.log("API Error Request:", error.request);
    } else {
      console.log("API Error Message:", error.message);
    }

    return { success: false, error };
  }
};
