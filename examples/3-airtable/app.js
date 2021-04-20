const result = document.querySelector('.result');

fetchData();

async function fetchData() {
  try {
    const { data } = await axios('/api/3-airtable');
    result.innerHTML = data
      .map(
        ({ name, url, price }) => `
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
      .join('');
  } catch (error) {
    result.innerText = error.response.data;
  }
}
