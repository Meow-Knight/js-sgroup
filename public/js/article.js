document.getElementById('create-article-form')
    .addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const response = await fetch('/articles', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content
            })
        });

        if (!response.ok) {
            console.log("error create");
            alert('Error');
        } else {
            console.log("success create");
            location.href = '/';
            return;
        }
    })