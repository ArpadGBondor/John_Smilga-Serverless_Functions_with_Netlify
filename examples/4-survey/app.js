const title = document.querySelector('.title h2');
const result = document.querySelector('.result');

window.addEventListener('load', () => fetchData());

async function fetchData() {
  result.innerHTML = `<h2>Loading...</h2>`;
  const { data } = await axios('/api/4-survey');
  showData(data);
}

function showData(data) {
  result.innerHTML = data
    .map(
      ({ id, room, votes }) => `
        <li>
            <div class="key"> ${room.substring(0, 2).toUpperCase()}</div>
            <div>
                <h4>${room}</h4> 
                <p class="vote-${id}" data-votes="${votes}">${votes} votes</p> 
            </div>
            <button data-id="${id}">
                <i class="fas fa-vote-yea"></i>
            </button>
        </li>
        `
    )
    .join('');
}

result.addEventListener('click', async function (e) {
  if (e.target.classList.contains('fa-vote-yea')) {
    e.target.classList.remove('fa-vote-yea');
    e.target.classList.add('fa-spinner');
    const btn = e.target.parentElement;
    const id = btn.dataset.id;
    const voteNode = result.querySelector(`.vote-${id}`);
    const votes = parseInt(voteNode.dataset.votes);

    const newVotes = await modifyData(id, votes);
    if (newVotes) {
      voteNode.dataset.votes = `${newVotes}`;
      voteNode.innerText = `${newVotes} votes`;
    }
    e.target.classList.remove('fa-spinner');
    e.target.classList.add('fa-vote-yea');
  }
});

async function modifyData(id, old_votes) {
  try {
    const {
      data: { votes },
    } = await axios.put(`/api/4-survey`, { increase_id: id });
    return votes;
  } catch (error) {
    return null;
  }
}
