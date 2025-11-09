const imageChoose = document.getElementById("choose-img")
const imagePieces = document.getElementById("img-pieces")
const solveImagePieces = document.getElementById("solve-img-pieces")
const levelBtns = document.querySelectorAll(".level-btn")
const levelBtnsDiv = document.getElementById("level-buttons")
const grids = document.getElementById("grids")
const previewDiv =document.getElementById("preview-container")
const previewImg = document.getElementById("preview-img")
const timer = document.getElementById("timer")
const time = document.getElementById("time")

const backgroundMusic =new Audio("sounds/backgroundmusic.mp3")
backgroundMusic.loop= true
backgroundMusic.volume = 0.5

let selectedImg= null
let rowsAndColums = 3
let timerLoop
let timeLeft = 0

imageChoose.addEventListener("change", (e) =>{
    const selectedFile = e.target.files[0]
    
    if (!selectedFile) {
         return
    }

    const fileReader = new FileReader()
    fileReader.onload = (event) =>{
        selectedImg= event.target.result
        previewImg.src = selectedImg
        previewDiv.classList.remove("hide")
        levelBtnsDiv.classList.remove("hide")
    
        backgroundMusic.play()
    }

    fileReader.readAsDataURL(selectedFile)
})

levelBtns.forEach(btn =>{
    btn.addEventListener("click", () =>{

        levelBtns.forEach(button => button.classList.remove("active"))
        btn.classList.add("active")
    
        rowsAndColums = parseInt(btn.dataset.size)
        grids.classList.remove("hide")
        
        document.querySelector(".choose-image").classList.add("hide")
        levelBtnsDiv.classList.add("hide")

        previewDiv.classList.add("fixed")

        createImgPieces(selectedImg, rowsAndColums)
        levelTimer(btn.dataset.size)
    })
})

function createImgPieces(imgSrc, rowsAndColums) {
    imagePieces.innerHTML=""
    solveImagePieces.innerHTML=""

    const imgSize = 500
    const imgPieceSize = imgSize / rowsAndColums

    const pieces = []

    let pieceNum = 0

      for (let row = 0; row < rowsAndColums; row++){
          for (let col= 0; col < rowsAndColums; col++ ){
                const piece = document.createElement("div")
                piece.classList.add("piece")
                piece.style.backgroundImage= `url(${imgSrc})`
                piece.style.backgroundPosition = `-${col* imgPieceSize}px -${row* imgPieceSize}px`

                piece.setAttribute("draggable" , true)
                piece.dataset.pieceNum = pieceNum++

                pieces.push(piece)
                
          }
      }

      for (let i= 0; i < rowsAndColums* rowsAndColums; i++ ){
        const solvePiece = document.createElement("div")
        solvePiece.classList.add("solve-piece")

        solvePiece.dataset.pieceNum =i
        solveImagePieces.appendChild(solvePiece)

      }
      piecesRandPos(pieces)
      pieces.forEach(piece => imagePieces.appendChild(piece))

      imagePieces.style.gridTemplateColumns = `repeat(${rowsAndColums}, 1fr)`
      imagePieces.style.gridTemplateRows = `repeat(${rowsAndColums}, 1fr)`

      solveImagePieces.style.gridTemplateColumns = `repeat(${rowsAndColums}, 1fr)`
      solveImagePieces.style.gridTemplateRows = `repeat(${rowsAndColums}, 1fr)`

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

            piece.addEventListener("click", () =>{
                const pieceBox = piece.parentElement
                if(pieceBox.classList.contains("solve-piece")){
                        
                        imagePieces.appendChild(piece)
                    }
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
                    checkPuzzleComplete()
                }
            })
    })
}

function levelTimer(level){
    if(level == 3) timeLeft = 60
    else if (level == 4) timeLeft = 90
    else if (level == 5) timeLeft= 150

    timer.classList.remove("hide")

    updateTimeDisplay()

    timerLoop = setInterval(() =>{

        timeLeft--
        updateTimeDisplay()

        if(timeLeft <= 0){

            clearInterval(timerLoop)
            showTimeOverMsg()

        }

    }, 1000)


}

function updateTimeDisplay(){

    let minutes = Math.floor(timeLeft / 60)
    let seconds= timeLeft % 60
    time.textContent= `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`


}


function showTimeOverMsg(){

    
}

function checkPuzzleComplete(){
    
    const puzzleBlocks = document.querySelectorAll(".solve-piece")
    for (let block of puzzleBlocks){
        const piece = block.querySelector(".piece")

        if (!piece || piece.dataset.pieceNum !== block.dataset.pieceNum) {
            
            return
        }
            
        }

    showSuccessMsg()
}

function showSuccessMsg() {
    const successMsg= document.createElement("div")
    successMsg.classList.add("success-message")
    successMsg.innerHTML = "Puzzle Solved"

    document.body.appendChild(successMsg)

}

previewImg.addEventListener("click", () =>{

    previewImg.classList.toggle("zoom")
})
