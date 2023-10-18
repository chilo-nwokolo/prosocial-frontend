import Cookie from "js-cookie";

const CookieConfig: typeof Cookie.attributes = {
  path: '/',
  expires: 1,
  secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
}

export const setCookie = (name: string, value: string) => {
  return Cookie.set(name, value, CookieConfig)
};

export const getCookie = (name: string) => {
  return Cookie.get(name);
}

export const deleteCookie = (name: string) => {
  Cookie.remove(name);
}