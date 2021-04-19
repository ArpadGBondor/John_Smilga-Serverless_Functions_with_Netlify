const result = document.querySelector('.result');

fetchData();

async function fetchData() {
  try {
    console.log('fetchData called');
    // original url: '/.netlify/functions/1-hello' redirected to: '/api/1-hello'
    const res = await axios.get('/api/1-hello');

    result.innerText = res.data;
    console.log(res);
  } catch (error) {
    console.log(error.response);
    result.innerText = error.response.data;
  }
}
