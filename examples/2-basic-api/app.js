const result = document.querySelector('.result');

fetchData();

async function fetchData() {
  try {
    const { data } = await axios.get('/api/2-basic-api');

    result.innerHTML = data
      .map(
        ({ image: { url }, name, price }) => `
        <article class="product">
          <img
            src="${url}"
            alt="${name}"
          />
          <div class="info">
            <h5>${name}</h5>
            <h5 class="price">£${price}</h5>
          </div>
        </article>`
      )
      .join(''); // <-- give join empty string parameter, otherwise it will insert commas
  } catch (error) {
    // console.log(error);
    result.innerText = error.response.data;
  }
}
