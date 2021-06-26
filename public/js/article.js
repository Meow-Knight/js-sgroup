let imgUpload = document.getElementById('img-imgload');
const CLOUDINARY_API_UPLOAD_PRESET_NAME = 'ndtyayh0';
const CLOUDINARY_API_BASE_URL='https://api.cloudinary.com/v1_1/ddqzgiilu/upload';
let imageInput = null;


imgUpload.addEventListener('change', async (event) => {
    imageInput = event.target.files[0];
});

document.getElementById('create-article-form')
    .addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        // save img to cloudinary first and get img id then send it to BE and save into db
        if (imageInput === null){
            alert("You didn't choose any image for this article");
            return;
        }

        document.getElementById('button-create').classList.add('d-none');
        document.getElementById('spinner').classList.remove('d-none');

        let img = imageInput;
        let formData = new FormData();

        formData.append('file', img);
        formData.append('upload_preset', CLOUDINARY_API_UPLOAD_PRESET_NAME);

        axios({
            url: CLOUDINARY_API_BASE_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: formData
        }).then(async (res) => {
            const imgUrl = res.data.url;

            const response = await fetch('/articles', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    content,
                    imgUrl,
                })
            });  
            
            if (!response.ok) {
                alert('Error');

                document.getElementById('button-create').classList.remove('d-none');
                document.getElementById('spinner').classList.add('d-none');
            } else {
                imageInput = document.getElementById('img-imgload');
                location.href = '/';
                return;
            }
        }).catch((err) => {
            alert(err);
            document.getElementById('button-create').classList.remove('d-none');
            document.getElementById('spinner').classList.add('d-none');
        })
    })