const fileFormDom = document.querySelector('.file-form')

const nameInput = document.querySelector('#name');
const priceInput = document.querySelector('#price')
const imageInput = document.querySelector('#image')

const container = document.querySelector('.container')
let imageValue;

const resetButton = document.querySelector('#reset')

imageInput.addEventListener('change', async (e) => {
  const imageFile = e.target.files[0]
  const formData = new FormData();
  formData.append('image', imageFile)

  try{
    const {
      data: { 
        image: {
          src
        }
      }
    } = await axios.post(`/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    imageValue = src;
  } catch (err) {
    imageValue = null;
    console.error(err);
  }
})

resetButton.addEventListener('click', async (e) => {
  try{
    await axios.get(`/reset`)
  } catch (err) {
    console.error(err);
  }
})