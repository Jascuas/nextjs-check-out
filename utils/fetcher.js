const axios = require('axios').default;


export const fetcher = async (url, method) => {
  return axios.get("https://payments.smsdata.com/api/v1" + url,
  {
    method: method,
    headers: {
      'X-Merchant-Id': '296052cb-6af8-4736-9814-a6a011654ccf',
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  })
  .then(res => res.data)
  .catch(err => console.log(err))
  }
  