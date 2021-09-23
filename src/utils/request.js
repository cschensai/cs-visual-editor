const base_url = 'http://localhost:3000/visual-editor';

async function request({ method = 'GET', data = {}, url = '' }) {
  const requestUrl = `${base_url}${url}`;
  const params = {
    method,
    body: JSON.stringify(data),
    cache: 'no-cache',
    // 预设处理cookie字段
    credentials: 'include',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  };
  if (method?.toLowerCase() === 'get') {
    Reflect.deleteProperty(params, 'body');
  }
  try {
    const res = await fetch(requestUrl, params);
    // parses response to json
    const result = await res.json();
    const { code } = result || {};
    if (code === 0) {
      return result;
    } else {
      Promise.reject(result);
    }
  } catch (error) {
    console.log('error', error);
  }
}

export { request };
