let turn = 1
let playerID = ''
let playerOPS = ''
let scoreOne = 0
let scoreTwo = 0
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



async function addPlayerAndScoreOne(){
  let name = document.querySelector('input').value.toLowerCase()
  
  await fetch(`https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${name}'`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.search_player_all.queryResults.row.player_id)
      playerID = data.search_player_all.queryResults.row.player_id
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

    await fetch(`https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${String(playerID)}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.sport_career_hitting.queryResults.row.ops)
      playerOPS = data.sport_career_hitting.queryResults.row.ops
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

  scoreOne = Number(document.querySelector('.teamOneScore').innerText)
  
  document.querySelector('.teamOneScore').innerText = `${+scoreOne + (+playerOPS*1000) + Math.round((Math.random() * 50 - 25))}`

  document.querySelector('.teamOne').innerText += `\r\n${name.toUpperCase()}`
  
  document.querySelector('.playerOne').classList.add('hide')
  document.querySelector('.playerTwo').classList.remove('hide')
}



async function addPlayerAndScoreTwo(){
  const name = document.querySelector('input').value.toLowerCase()
  await fetch(`https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&name_part='${name}'`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.search_player_all.queryResults.row.player_id)
      playerID = data.search_player_all.queryResults.row.player_id
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

    await fetch(`https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${String(playerID)}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.sport_career_hitting.queryResults.row.ops)
      playerOPS = data.sport_career_hitting.queryResults.row.ops
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

  scoreTwo = Number(document.querySelector('.teamTwoScore').innerText)
  
  document.querySelector('.teamTwoScore').innerText = `${+scoreTwo + (+playerOPS*1000) + Math.round((Math.random() * 50 - 25))}`

  document.querySelector('.teamTwo').innerText += `\r\n${name.toUpperCase()}`

  document.querySelector('.playerTwo').classList.add('hide')
  document.querySelector('.playerOne').classList.remove('hide')
}


function checkWin(){
  if(Number(document.querySelector('.teamOneScore').innerText) > Number(document.querySelector('.teamTwoScore').innerText)){
    document.querySelector('.playerOne').innerText = 'PLAYER ONE WINS!!!!!'
  }else if(Number(document.querySelector('.teamOneScore').innerText) < Number(document.querySelector('.teamTwoScore').innerText)){
    document.querySelector('.playerOne').innerText = 'PLAYER TWO WINS!!!!!'
  }else{
    document.querySelector('.playerOne').innerText = 'IT\'S A TIE?!?!?!?!'
  }
}




function playBall(count){
  if(turn > 18){
    document.querySelectorAll('h1').innerText = 'Refresh Page To Play Again :)'
    checkWin()
  }
  else if(turn%2){
    addPlayerAndScoreOne()
    turn += 1
  }else{
    addPlayerAndScoreTwo()
    turn += 1
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
