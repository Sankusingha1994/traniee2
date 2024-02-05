import axiosinstance from "../axiosinstance/axiosinstance";
import { endpoint } from "../endpoint/endpoint";


export const fetchAssets = async () => {
    const res = await axiosinstance.get(endpoint.assets.getassets);
    return res;
  };