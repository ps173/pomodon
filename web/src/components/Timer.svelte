<script lang="ts">
	let interval;
	let completedCounter = 0;
	let breakCounter = 0;
	const minToSec = (min: number) => min * 60;
	const secondsToMin = (sec: number) => Math.floor(sec / 60);
	const padWithZero = (num: number) => num.toString().padStart(2, '0');
	let POMODORO_S = minToSec(25);
	let LONG_BREAK_S = minToSec(30);
	let SHORT_BREAK_S = minToSec(5);
	$: TotalTime = POMODORO_S;

	const formatTime = (timeInSeconds: number) => {
		const minutes = secondsToMin(timeInSeconds);
		const remainingSeconds = timeInSeconds % 60;
		return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
	};

	const rest = (breaktime: number) => {
		clearInterval(interval);
		TotalTime = breaktime;
		interval = setInterval(() => {
			if (TotalTime === 0) {
				resetTimer();
			}
			TotalTime -= 1;
		}, 1000);
	};

	const resetTimer = () => {
		TotalTime = minToSec(25);
		clearInterval(interval);
	};

	const completedPomodoro = () => {
		clearInterval(interval);
		completedCounter++;
		if (completedCounter % 4 == 0) {
			rest(LONG_BREAK_S);
		} else {
			rest(SHORT_BREAK_S);
		}
		breakCounter++;
	};

	const startTimer = () => {
		clearInterval(interval);
		interval = setInterval(() => {
			if (TotalTime == 0) {
				completedPomodoro();
			}
			TotalTime -= 1;
		}, 1000);
	};

	const stopTimer = () => {
		clearInterval(interval);
		interval = null;
	};
</script>

<main>
	<div class="card">
		<!-- FIXME: TEMPORARY LABEL -->
		<div class="label">
			<div class="label-border">
				<button><span>+</span></button>
				<div class="label-name">focus</div>
			</div>
		</div>
		<div class="timer-container">
			<div class="time">
				{formatTime(TotalTime)}
			</div>
		</div>
		<!-- TODO: ADD SOME KIND OF INDICATION TO THE IMAGES -->
		<div class="controls">
			<button class="stop-button" on:click={stopTimer}>
				<img src="./pause.png" alt="pause" />
			</button>
			<button class="start-button" on:click={startTimer}>&#9658;</button>
			<button class="restart-button" on:click={resetTimer}>
				<img src="./refresh.svg" alt="restart" />
			</button>
		</div>
	</div>
</main>

<style>
	main {
		display: grid;
		place-items: center;
		height: 70vh;
	}
	.card {
		align-self: center;
		background-color: #2d2d2d;
		min-width: 45%;
		min-height: 40%;
		border-radius: 20px;
	}
	.label {
		display: flex;
		width: 100%;
		min-height: 20%;
		align-items: center;
		justify-content: center;
		padding-top: 4%;
	}
	.label-border {
		width: 20%;
		height: 30px;
		display: flex;
		border-radius: 50px;
		align-items: center;
		justify-content: center;
		background-color: #2d2d2d;
		border: 1px solid #da0037;
	}
	.label-border button {
		background: transparent;
		border: none;
		margin-top: 4%;
		margin-bottom: 4%;
	}
	.label-border button span {
		display: block;
		font-size: 2em;
	}
	.timer-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 5%;
	}
	.timer-container .time {
		color: #ededed;
		font-size: 4em;
		font-weight: 500;
		text-align: center;
		padding: 1%;
	}
	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.controls .start-button {
		font-size: 3em;
		color: black;
	}
	.controls .stop-button img {
		color: black;
		width: 35px;
		height: 35px;
	}
	.controls .start-button {
		font-size: 3em;
		color: black;
	}
	.controls button {
		color: #ededed;
		background-color: transparent;
		outline: none;
		border: none;
		margin: 1%;
		transition: all 0.3s;
	}
	.controls button:hover {
		color: #da0037;
	}
</style>
