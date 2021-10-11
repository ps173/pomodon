<script>

 let interval
 let completedCounter = 0
 let breakCounter = 0

 // given mins to seconds
const minToSec = (min) => ( min * 60 )
const secondsToMin = (sec) => Math.floor( sec / 60 )
const padWithZero = (num) => (num.toString().padStart(2,"0"))

// The total time to in min to sec
 let POMODORO_S = minToSec(25);
 let LONG_BREAK_S = minToSec(45);
 let SHORT_BREAK_S = minToSec(0.5);

// Cool reactivity
 $: TotalTime = POMODORO_S


function formatTime(timeInSeconds) { 
    const minutes = secondsToMin(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
}

function rest(breaktime){
 clearInterval(interval)
 TotalTime = breaktime
 interval = setInterval(()=>{
   if (TotalTime===0){
    resetTimer()
   }
    TotalTime -= 1
 },1000)

}

function resetTimer(){
 TotalTime = minToSec(25)
 clearInterval(interval)
 }

function completedPomodoro(){
 clearInterval(interval)
 completedCounter++

 if (completedCounter % 4 == 0){
   rest(LONG_BREAK_S)
 }else{
   rest(SHORT_BREAK_S)
 }

 breakCounter++
}


function startTimer () {
 // clear any previous interval and then start 
 clearInterval(interval)
 interval = setInterval(()=>{
   if (TotalTime==0){
    completedPomodoro() 
   }
    TotalTime -= 1
 },1000)
}

function stopTimer (){
 clearInterval(interval)
 interval = null
}

</script>

<main>
 <div class="timer">
   <div class="time">
   {formatTime(TotalTime)}
   </div>
  </div>
 <div class="controls">
  <button on:click={startTimer}>Start</button>
  <button on:click={stopTimer}>Stop</button>
  <button on:click={resetTimer}>Reset</button>
 </div>
 <div class="info">
  <div>Focus Sessions : {completedCounter} </div>
  <div>Breaks : {breakCounter} </div>
 </div>
 <!-- TODO: Add this later -->
 <!-- <input type=number bind:value={POMODORO_S} min=0 max={minToSec(60)}> -->
</main>

<style>
  .timer{
    display: flex;
    justify-content: center;
    align-items: center;
    color: cadetblue;
    font-size: 3em;
    margin: 5%;
  }
  .timer .time{
    background-color: rgba(24, 24, 24,0.5);
    border: 4px groove orangered;
    box-shadow: 15px 15px 5px rgba(7, 7, 7, 0.692);
    text-align: center;
    width: 40%;
    padding: 1%;
  }
  .controls{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .controls button{
    border: 3px groove black;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px; 
    padding-right: 20px;
    margin : 1%;
    box-shadow: 5px 5px 5px rgba(7, 7, 7, 0.692);
    transition: all 0.3s;
  }

  .controls button:hover{
    transform: translateX(5px) translateY(5px);
    box-shadow: 1px 1px 2px rgba(7, 7, 7, 0.692);
    transition: all 0.3s;
  }

  .info {
    color: cadetblue;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    font-size: 1.4em;
    padding: 5%;
  }

  .info div {
    padding: 1%;
    margin: 2%;
    width: 30%;
    background-color: rgba(24, 24, 24,0.5);
    border: 2px groove black;
    text-align: center;
    transition: all 0.3s;
  }
  
  .info div:hover {
    color: orangered;
    transition: all 0.3s;
    background-color: rgba(24, 24, 24,0.8);
  }


</style>

