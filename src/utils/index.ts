export const getType = (data) => {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};

export const isType = (data, type) => {
  return type === getType(data);
};

export const getQueryObject = (url) => {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (rs, $1, $2) {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
};