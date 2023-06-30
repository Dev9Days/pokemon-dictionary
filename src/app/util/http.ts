import axios, { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POKEMON_API_ENDPOINT,
  timeout: 10 * 1000,
});

// API Request interceptor
http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// API response interceptor
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // const { code, body } = response.data;
    return response;
  },
  (error) => {
    console.log('http interceptor response error');
    return Promise.reject(error);
  }
);

const HttpService = {
  get: async <T>(_url = '', _params = {}, _ctx?: GetServerSidePropsContext) => {
    const { data }: AxiosResponse<T> = await http.get(_url, { params: _params });
    return data;
  },
};

export default HttpService;
