import axios from "axios";

/*https://archive.org/wayback/available?url=example.com&timestamp=20060102*/

const baseURL = "http://archive.org/wayback";
const base = axios.create({ baseURL });

const services = {
  searchByUrlAndTime(url, timestamp) {
    console.log(url, timestamp);
    return base.get(`/available?url=${url}&timestamp=${timestamp}`).then((res) => res.data);
  },
};

export default services;
