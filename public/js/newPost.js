const newPost = async (e) => {
  e.preventDefault();

  const titleValue = document.querySelector('#title').value;
  const textValue = document.querySelector('#content').value;

  const payload = {
    title: titleValue,
    text: textValue,
  }
  const res = await fetch('/api/post', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('You failed to create a new post!');

  }
}

document.querySelector('#new-post-btn').addEventListener('click', newPost);