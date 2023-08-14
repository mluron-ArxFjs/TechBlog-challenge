const addComment = async (e) => {
  e.preventDefault();

  const text = document.querySelector('#comment').value.trim();
  const endpoint = window.location.pathname.split('/');
  const id = endpoint[endpoint.length - 1];

  if (text) {
    console.log(text);
    const res = await fetch(`/api/comment/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      document.location.replace(window.location.href);
    } else {
      alert('You cannot comment this!');
    }
  }
};

document.querySelector('#comment-btn').addEventListener('click', addComment);