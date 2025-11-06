const imageChoose = document.getElementById("choose-img")
const imagePieces = document.getElementById("img-pieces")
const solveImagePieces = document.getElementById("solve-img-pieces")

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
    solveImagePieces.innerHTML=""

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

                piece.setAttribute("draggable" , true)
                pieces.push(piece)
                
          }
      }

      for (let i= 0; i < rowsAndColums* rowsAndColums; i++ ){
        const solvePiece = document.createElement("div")
        solvePiece.classList.add("solve-piece")

        solveImagePieces.appendChild(solvePiece)

      }
      piecesRandPos(pieces)
      pieces.forEach(piece => imagePieces.appendChild(piece))

      piecesDragAndDrop()
}


function piecesRandPos(blocks){
    
    for (let i= blocks.length - 1; i > 0; i--){
        let j= Math.floor(Math.random()* (i + 1));
        [blocks[i] , blocks[j]] = [blocks[j], blocks[i]];
    }

}

function piecesDragAndDrop(){
    const puzzlePieces= document.querySelectorAll(".piece")
    const puzzleBlocks = document.querySelectorAll(".solve-piece")

    puzzlePieces.forEach(piece =>{
        
        piece.addEventListener("dragstart" , () =>{
            piece.classList.add("dragging")
        })

            piece.addEventListener("dragend" , () =>{
                
                piece.classList.remove("dragging")
          })
    })

    puzzleBlocks.forEach(block =>{
        block.addEventListener("dragover", (event) =>{
            event.preventDefault()

        })

            block.addEventListener("drop" , () =>{
                const draggedPiece = document.querySelector(".dragging")

                if (draggedPiece && block.children.length === 0) {
                    
                    block.appendChild(draggedPiece)
                }
            })
    })
}