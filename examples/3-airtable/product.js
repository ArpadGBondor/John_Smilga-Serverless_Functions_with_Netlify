const result = document.querySelector('.result');

fetchData();

async function fetchData() {
  try {
    const {
      data: { name, url, price, description },
    } = await axios(`/api/3-airtable${window.location.search}`);

    result.innerHTML = `
         <article class="product">
           <img class="product-img"
           src="${url}"
           alt="${name}"
           />
           <div class="product-info">
             <h5 class="title">${name}</h5>
             <h5 class="price">£${price}</h5>
             <p class="desc">${description}</p>
           </div>
         </article>`;
  } catch (error) {
    result.innerHTML = `<h4>${error.response.data}</h4>`;
  }
}
