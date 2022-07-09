import axios, { AxiosRequestConfig } from "axios";

export const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await axios(config);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
