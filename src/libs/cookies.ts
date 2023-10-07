import Cookie from "js-cookie";

const CookieConfig = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
}

export const setCookie = (name: string, value: string) => {
  return Cookie.set(name, value, CookieConfig)
};

export const getCookie = (name: string) => {
  return Cookie.get(name);
}