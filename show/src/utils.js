export const fetchApi = async (url, params) => {
  const response = await fetch(
    `http://127.0.0.1:8000/currency_id_list/?symbols=afn`
  );
  const resJson = await response.json();
  return resJson;
  // setResp(JSON.stringify(resJson));
};
