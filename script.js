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
        createImgPieces(imgSrc)
    }

    fileReader.readAsDataURL(selectedFile)
})

function createImgPieces(imgSrc) {
    imagePieces.innerHTML=""

    const rowsAndColums= 4
    const imgSize = 500
    const imgPieceSize = imgSize / rowsAndColums

    const pieces = []

      for (let row = 0; row < rowsAndColums; row++){
          for (let col= 0; col < rowsAndColums; col++ ){
                const piece = document.createElement("div")
                piece.classList.add("piece")
                piece.style.backgroundImage= `url(${imgSrc})`
                piece.style.backgroundPosition = `-${col* imgPieceSize}px -${row* imgPieceSize}px`

                // imagePieces.appendChild(piece)
                pieces.push(piece)
                
          }
      }

      piecesRandPos(pieces)
      pieces.forEach(piece => imagePieces.appendChild(piece))
}


function piecesRandPos(blocks){
    
    for (let i= blocks.length - 1; i > 0; i--){
        let j= Math.floor(Math.random()* (i + 1))
        [blocks[i] , blocks[j]] = [blocks[j], blocks[i]]
    }

}