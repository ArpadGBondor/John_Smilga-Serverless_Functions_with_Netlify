const form = document.querySelector('.form');
const emailInput = document.querySelector('.email-input');
const alert = document.querySelector('.alert');

// Show/Hide alert message
// alert.style.display = 'block'
// alert.style.display = 'none'

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  alert.style.display = 'none';
  form.classList.add('loading');

  const email = emailInput.value;
  const success = await subscribe(email);
  if (success) {
    form.innerHTML = `<h4 class="success">Success! Please check your e-mail.</h4>`;
  } else {
    alert.style.display = 'block';
  }
  form.classList.remove('loading');
});

async function subscribe(email) {
  try {
    await axios.post('/api/6-newsletter', { email });
    return true;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert.innerText = 'Invalid e-mail address, or already subscribed.';
    } else if (error.response && error.response.status === 500) {
      alert.innerText = 'Server error. Please try again later.';
    } else {
      alert.innerText = 'Something went wrong. Please try again later.';
    }

    return false;
  }
}
