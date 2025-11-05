const imageChoose = document.getElementById("choose-img")
const imagePieces = document.getElementById("img-pieces")

imageChoose.addEventListener("change", (e) =>{
    const selectedFile = e.target.files[0]
    
    if (!selectedFile) {
         return
    }

    const fileReader = new FileReader()
    fileReader.onload = (event) =>{
        const imgSrc= event.target.result
        imagePieces.innerHTML= `<img src="${imgSrc}" style="width: 100%">`
    }

    fileReader.readAsDataURL(selectedFile)
})