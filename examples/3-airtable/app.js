const result = document.querySelector('.result');

fetchData();

async function fetchData() {
  try {
    const { data } = await axios('/api/3-airtable');
    result.innerHTML = data
      .map(
        ({ id, name, url, price }) => `
        <a href="product.html?id=${id}" class="product">
          <img
            src="${url}"
            alt="${name}"
          />
          <div class="info">
            <h5>${name}</h5>
            <h5 class="price">£${price}</h5>
          </div>
        </a>`
      )
      .join('');
  } catch (error) {
    result.innerHTML = '<h4>There was an error</h4>';
  }
}
