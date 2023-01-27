/* eslint-disable no-useless-escape */
export const setCookie = (
  name: string,
  value: string,
  props: {
      [key: string]: string | number | boolean | Date | undefined;
      path?: string;
      expires?: string| number | Date;
  } = {}
) => {
  props = {
      path: "/",
      ...props,
  };

  let exp = props.expires;
  if (typeof exp == "number" && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
  }
  if (exp && exp instanceof Date) {
      props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
      updatedCookie += "; " + propName;
      const propValue = props[propName];
      if (propValue !== true) {
          updatedCookie += "=" + propValue;
      }
  }
  document.cookie = updatedCookie;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
