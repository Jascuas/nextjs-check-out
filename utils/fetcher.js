const axios = require('axios').default;

const headers = {
  'X-Merchant-Id': '296052cb-6af8-4736-9814-a6a011654ccf',
  "Access-Control-Allow-Methods": "*",
}

export const fetcher = async (url, method, data) => {
  if (method === "GET") {
    return axios.get("https://payments.smsdata.com/api/v1" + url,
    {
      headers: headers
    })
    .then(res => {
      console.log(res)
       return res.data}
       )
    .catch(err => console.log(err))
  }
  if (method === "POST") {
    return axios.post("https://payments.smsdata.com/api/v1" + url,
    data,
    { method: "POST",
      headers: headers
    })
    .then(res => {
      console.log(res)
       return res.data}
       )
    .catch(err => console.log(err.response))
  }

  }
  