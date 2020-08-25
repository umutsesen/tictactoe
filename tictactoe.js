document.addEventListener('DOMContentLoaded', function() {

    document.querySelector("#choosegame").style.display = "block"

})



const GameBoard = (function(){
    const WinArrays = [
        [0, 1, 2],
        [6, 7, 8],
        [3, 4, 5],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [6, 4, 2],
        [0, 4, 8]

    ]
    const Players =  []
    let roundCounter = 0 // ingame round (1 click 1 roundCt++)
    let PlayerCounter = 0 // which player is going to play
    let GameRealRound = 0 // actual rounds
    CreateGameBoard()
    // cachedom özellikleri
    const firstscreen = document.getElementById("choosegame")
    const pvp = document.getElementById("playervsplayer")
    const pve = document.getElementById("playervscomputer")
    const gamescreen = document.getElementById("game")
    const popup = document.getElementById("popup")
    let cells = document.querySelectorAll(".cell")
    cells = Array.from(cells)
    //binding
    document.addEventListener("click", ShowDiv)

    function ResetRound() {
        popup.style.display = "none"
        document.querySelector(".grid").remove()
        CreateGameBoard()
        cells = document.querySelectorAll(".cell")
        roundCounter = 0
        Players[0].ticked = []
        Players[1].ticked = []
        GameRealRound++

    }
    function ShowDiv() {
        if (event.target.id == "close") {
            ResetRound()
        }
        if (event.target.id == "pvp") {
            firstscreen.style.display = "none"
            pvp.style.display = "block"
        }
        if (event.target.id == "pve") {
            firstscreen.style.display = "none"
            pve.style.display = "block"
            
        }
        if (event.target.id == "startpvp") {
            pvp.style.display = "none"
            let p1 = document.getElementById("player1").value
            let p2 = document.getElementById("player2").value
            AddPlayer(p1, "X")
            AddPlayer(p2, "O")
            gamescreen.style.display = "block"
        }
        if (event.target.id == "startpve") {
            pve.style.display = "none"
            gamescreen.style.display = "block"
        }
        
        
        if (event.target.className == "cell") {
            roundCounter++
            let key = +event.target.dataset.key
            let playerpiece = Players[PlayerCounter].piece
            cells[key].textContent = playerpiece
            Players[PlayerCounter].ticked.push(key)
            event.target.dataset.key = "used"
            if (PlayerCounter == 0) {
                PlayerCounter++
                }
            else PlayerCounter -= 1
            if (roundCounter >= 5) CheckResults(Players[0].ticked, Players[1].ticked)
        }
                 
        
    }
    function CreateGameBoard() {
        let element = document.createElement("div")
        element.className = "grid"
        for (i = 0; i < 9; i++) {
            let cell = document.createElement("div")
            cell.className = "cell"
            cell.dataset.key = i
            cell.style.fontSize = "125px"
            cell.style.textAlign = "center"
            element.appendChild(cell)
            }
        document.querySelector("#game").appendChild(element)
        
        }

    function AddPlayer(name, piece) {
        let score = 0
        let ticked = []
        return Players.push({name, piece, score, ticked})
    }
    function FinishGame(player) {
        popup.firstChild.textContent = `You have won the Game ${player.name}`
        popup.childNodes[3].style.display = 'inline-flex'
        popup.childNodes[3].onclick = function() {
            ResetRound()
            GameRealRound = 0
        }
        popup.childNodes[5].remove()
        
        
        

    }
    function AddScore(player){
        player.score++

    }
    // o arrayin icindekilerden olusturulanherhangi bir array o arraylardan birine karsilik geliyo mu
    function CheckResults(result1, result2) {
        console.log(roundCounter)
        console.log(GameRealRound)
        console.log(Players[0].ticked)
        console.log(Players[1].ticked)
        if (WinArrays.some(solution => {
            for(var i = 0; i < solution.length; i++){
                if(result1.indexOf(solution[i]) === -1)
                   return false;
              }
              return true;

        })) {
            popup.style.display = "flex"
            if (GameRealRound < 5) {
                popup.firstChild.textContent = `You Have Won this round ${Players[0].name}`
                AddScore(Players[0])
            }
            else FinishGame(Players[0])
            

        }
        if (WinArrays.some(solution => {
            for(var i = 0; i < solution.length; i++){
                if(result2.indexOf(solution[i]) === -1)
                   return false;
              }
              return true;

        })) {
            popup.style.display = "flex"
            if (GameRealRound < 5) {
                popup.firstChild.textContent = `You Have Won this round ${Players[1].name}`
                AddScore(Players[1])
            } 
            else FinishGame(Players[1])
            
        }
        else {
            if (roundCounter == 9 ) {
                popup.style.display = "flex"
                popup.firstChild.textContent = `Draw!`

            }
        }
        
    }


})()



const arr = [
    [0, 1, 2],
    [6, 7, 8],
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 4, 2],
    [0, 4, 8]

]
const myarr = [0, 1, 2]

function arrayContainsAnotherArray(needle, haystack){
    for(var i = 0; i < needle.length; i++){
      if(haystack.indexOf(needle[i]) === -1)
         return false;
    }
    return true;
  }

arr.some(element => {
    arrayContainsAnotherArray(myarr, element)
})
