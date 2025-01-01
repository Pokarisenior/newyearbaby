// 画像のリストを定義
const images = [];
for (let i = 1; i <= 15; i++) {
    images.push({ src: `img/saneyuki${String(i).padStart(2, '0')}.png`, type: 'saneyuki' });
    images.push({ src: `img/mahiro${String(i).padStart(2, '0')}.png`, type: 'mahiro' });
}

let currentImageIndex = 0;
let score = 0;
let points = 0;
let questionCount = 0;
let timer;
let timeLeft = 10.00;

// ゲームを開始する関数
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    score = 0;
    points = 0;
    questionCount = 0;
    showNextImage();
}

// 次の画像を表示する関数
function showNextImage() {
    if (questionCount < 10) {
        currentImageIndex = Math.floor(Math.random() * images.length);
        document.getElementById('image').src = images[currentImageIndex].src;
        document.getElementById('message').innerText = '';
        questionCount++;
        startTimer();
    } else {
        showResult();
    }
}

// タイマーを開始する関数
function startTimer() {
    timeLeft = 10.00;
    document.getElementById('timer').innerText = timeLeft.toFixed(2);
    timer = setInterval(() => {
        timeLeft -= 0.01;
        if (timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(timer);
            checkAnswer(null); // タイムアウト時に自動的に次の問題へ
        }
        document.getElementById('timer').innerText = timeLeft.toFixed(2);
    }, 10);
}

// プレイヤーの回答をチェックする関数
function checkAnswer(answer) {
    clearInterval(timer);
    let message = '';
    if (answer && images[currentImageIndex].type === answer) {
        score++;
        const earnedPoints = Math.floor(timeLeft * 100);
        points += earnedPoints;
        message = `正解 ${earnedPoints}pt`;
    } else {
        message = '不正解 0pt';
    }
    document.getElementById('message').innerText = message;
    setTimeout(() => {
        document.getElementById('image').src = '';
        showNextImage();
    }, 500);
}

// 結果を表示する関数
function showResult() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerText = `正解数: ${score} / 10\nポイント: ${points}`;
}
