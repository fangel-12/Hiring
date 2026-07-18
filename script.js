const form = document.getElementById('apply-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async function(e){
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    try{
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok){
        form.reset();
        form.style.display = 'none';
        status.textContent = "Thanks — your application has been sent. We'll be in touch.";
        status.classList.add('success');
    } else {
        const data = await response.json().catch(() => null);
        const msg = data && data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong. Please try again or email us directly.';
        status.textContent = msg;
        status.classList.add('error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Apply now';
    }
    } catch(err){
        status.textContent = "Couldn't reach the server. Please check your connection or email us directly.";
        status.classList.add('error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Apply now';
    }
});