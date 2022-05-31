let turn = 1
let playerID = 0
let playerOPS = 0
let scoreOne = 0
let scoreTwo = 0
let playerScore = 0
let multipleMessUps = false
let gameContinues = true
//test
let bonds = String(111188)
fetch(`https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${bonds}`)
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data.sport_career_hitting.queryResults.row.ops)
})
.catch(err => {
    console.log(`error ${err}`)
});
fetch(`https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='adam dunn'`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.search_player_all.queryResults.row.player_id)
    })
    .catch(err => {
        console.log(`error ${err}`)
    });


//PLAYER ONE'S TURN!!!!!
//----------------------
async function addPlayerAndScoreOne(){
  let name = document.querySelector('input').value.toLowerCase()

  //Get Player ID From Name In Input
  await fetch(`https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${name}'`)
    .then(res => res.json()) // parse response as JSON
    .then(async (data) => {
      console.log(data)
      console.log(data.search_player_all.queryResults.row.player_id)
      playerID = data.search_player_all.queryResults.row.player_id

      //If There Are Multiple Players With That Name
      if(playerID === undefined){
        let highestOPS = 0
        let row = data.search_player_all.queryResults.row
        for(let i = 0; i < data.search_player_all.queryResults.row.length; i++){
          await fetch(`https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${String(row[i].player_id)}`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if(data.sport_career_hitting.queryResults.row.ops > highestOPS){
              highestOPS = data.sport_career_hitting.queryResults.row.ops
              playerID = row[i].player_id
            }
          })
          .catch(err => {
            console.log(`error ${err}, there was a problem getting a multiple player name's ops`)
          })
        }
        playerOPS = highestOPS
      }
    })
    .catch(err => {
        console.log(`error ${err}`)
        document.querySelector('.error').classList.remove('hide')
        turn -= 1
        multipleMessUps = true
        playerID = 0
        console.log(turn)
    });
  
  //If OPS Not Already Found, Find OPS
  if(playerOPS === 0){  
    await fetch(`https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${String(playerID)}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.sport_career_hitting.queryResults.row.ops)
      playerOPS = data.sport_career_hitting.queryResults.row.ops
    })
    .catch(err => {
        console.log(`error ${err}`)
        document.querySelector('.error').classList.remove('hide')
        if(!multipleMessUps){ 
          turn -= 1
        }
        playerOPS = 0
        console.log(turn)
    });
  }

  //Put Score On DOM
  scoreOne = Number(document.querySelector('.teamOneScore').innerText)
  playerScore = (+playerOPS*1000) + Math.round((Math.random() * 50 - 25))
  
  if(playerID && playerOPS){
    document.querySelector('.teamOneScore').innerText = `${+scoreOne + playerScore}`

    document.querySelector('.teamOne').innerText += `\r\n${name.toUpperCase()}: ${playerScore}`
    
    document.querySelector('.playerOne').classList.add('hide')
    document.querySelector('.playerTwo').classList.remove('hide')
    document.querySelector('.error').classList.add('hide')
    playerOPS = 0
    playerID = 0 
    multipleMessUps = false
  } 
}


//PLAYER TWO'S TURN!!!!!
//----------------------
async function addPlayerAndScoreTwo(){
  const name = document.querySelector('input').value.toLowerCase()

  //Get Player ID From Name In Input
  await fetch(`https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${name}'`)
    .then(res => res.json()) // parse response as JSON
    .then(async (data) => {
      console.log(data.search_player_all.queryResults.row.player_id)
      playerID = data.search_player_all.queryResults.row.player_id

      //If There Are Multiple Players Of The Same name
      if(playerID === undefined){
        let highestOPS = 0
        let row = data.search_player_all.queryResults.row
        for(let i = 0; i < data.search_player_all.queryResults.row.length; i++){
          await fetch(`https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${String(row[i].player_id)}`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if(data.sport_career_hitting.queryResults.row.ops > highestOPS){
              highestOPS = data.sport_career_hitting.queryResults.row.ops
              playerID = row[i].player_id
            }
          })
          .catch(err => {
            console.log(`error ${err}, there was a problem getting a multiple player name's ops`)
          })
        }
        playerOPS = highestOPS
      }
    })
    .catch(err => {
        console.log(`error ${err}`)
        document.querySelector('.error').classList.remove('hide')
        turn -= 1
        multipleMessUps = true
        playerID = 0
        return 1
    });

  //If OPS Not Already Found, Find OPS
  if(playerOPS === 0){  
    await fetch(`https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${String(playerID)}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.sport_career_hitting.queryResults.row.ops)
      playerOPS = data.sport_career_hitting.queryResults.row.ops
    })
    .catch(err => {
        console.log(`error ${err}`)
        document.querySelector('.error').classList.remove('hide')
        if(!multipleMessUps){ 
          turn -= 1
          multipleMessUps = true
        }
        playerOPS = 0
        console.log(turn)
    });
  }
  scoreTwo = Number(document.querySelector('.teamTwoScore').innerText)
  playerScore = (+playerOPS*1000) + Math.round((Math.random() * 50 - 25))
  
  if(playerID && playerOPS){
    document.querySelector('.teamTwoScore').innerText = `${+scoreTwo + playerScore}`

    document.querySelector('.teamTwo').innerText += `\r\n${name.toUpperCase()}: ${playerScore}`

    document.querySelector('.playerTwo').classList.add('hide')
    document.querySelector('.playerOne').classList.remove('hide')
    document.querySelector('.error').classList.add('hide')
    playerOPS = 0
    playerID = 0
    multipleMessUps = false
  }
}


function checkWin(){
  if(turn > 18){
    if(Number(document.querySelector('.teamOneScore').innerText) > Number(document.querySelector('.teamTwoScore').innerText)){
      document.querySelector('.playerOne').innerText = 'PLAYER ONE WINS!!!!!'
    }else if(Number(document.querySelector('.teamOneScore').innerText) < Number(document.querySelector('.teamTwoScore').innerText)){
      document.querySelector('.playerOne').innerText = 'PLAYER TWO WINS!!!!!'
    }else{
      document.querySelector('.playerOne').innerText = 'IT\'S A TIE?!?!?!?!'
    }
    document.querySelector('.error').innerText = 'Refresh Page To Play Again :)'
    document.querySelector('.error').classList.remove('hide')
  }
}




async function playBall(count){
  if(turn > 18){
    document.querySelectorAll('.error').innerText = 'Refresh Page To Play Again :)'
    checkWin()
  }
  else if(turn%2){
    await addPlayerAndScoreOne()
    if(playerID !== undefined){
      turn += 1
    }
    checkWin()
    console.log(turn)
  }else{
    await addPlayerAndScoreTwo()
    if(playerID !== undefined){
      turn += 1
    }
    checkWin()
    console.log(turn)
  }
}

document.querySelector('.addPlayerButt').addEventListener('click', playBall)





// fetch(`http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${playerID}`)
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//       return(data.sport_career_hitting.queryResults.row.ops)
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     });
