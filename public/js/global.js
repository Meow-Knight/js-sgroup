document.getElementById('logout').addEventListener('click', async function(event) {
    event.preventDefault();
    const url = '/auth/logout';
    try {
        await (await fetch('/auth/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })).json();
    } catch (error) {
        alert(error);
    }
    location.href = '/auth/login';
})