// import axios from 'axios';

document.getElementById('register-form')
    .addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // await axios.post('/auth/register', {
        //     email,
        //     password
        // }).then((res) => {
        //     if(res.ok){
        //         alert("Register successful");
        //         location.href = '/auth/login';
        //         return;
        //     } else {
        //         alert(res.body);
        //     }
        // })

        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) {
            alert('Error');
        } else {
            alert('Register success')
            location.href = '/auth/login';
            return;
        }
    })