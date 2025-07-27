const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const tileSize = 40;
const maze = [
    "WWWWWWWWWW",
    "W   W    W",
    "W W W WW W",
    "W W      W",
    "W WWWWW  W",
    "W     W  W",
    "W WWW W WW",
    "W W      W",
    "W NO W   W",
    "WWWWWW  YES"
];

let player = { x: 1, y: 1 };
let reachedForever = false;

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === "W") {
                ctx.fillStyle = "pink";
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else if (maze[row][col] === "N") {
                ctx.fillStyle = "red";
                ctx.font = "20px Arial";
                ctx.fillText("NO", col * tileSize + 10, row * tileSize + 30);
            } else if (maze[row][col] === "Y") {
                ctx.fillStyle = "green";
                ctx.font = "20px Arial";
                ctx.fillText("YES", col * tileSize + 5, row * tileSize + 30);
            }
        }
    }

    // Dessiner le joueur (Carré Noir)
    ctx.fillStyle = "black";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);

    if (reachedForever) {
        showLoveEffect();
    }
}

function move(direction) {
    if (reachedForever) return; // Stopper les mouvements après la victoire

    let newX = player.x;
    let newY = player.y;
    if (direction === "up") newY--;
    if (direction === "down") newY++;
    if (direction === "left") newX--;
    if (direction === "right") newX++;

    if (maze[newY][newX] === " ") {
        player.x = newX;
        player.y = newY;
    } else if (maze[newY][newX] === "N") {
        alert("GAME OVER! DIS OUI.");
        player.x = 1;
        player.y = 1;
    } else if (maze[newY][newX] === "Y") {
        if (document.getElementById("question").innerText === "Will you be my husband?") {
            document.getElementById("question").innerText = "POUR TOUJOURS BABY?";
            player.x = 1;
            player.y = 1;
        } else {
            reachedForever = true;
            startLoveEffect();
        }
    }
    drawMaze();
}

// 💖✨ Effet d'amour : Paillettes + Mots bien répartis ✨💖
function startLoveEffect() {
    document.body.style.background = "pink"; 
    document.getElementById("question").innerText = "FOREVER LOVE! 💖";

    // Cacher le labyrinthe
    document.getElementById("mazeCanvas").style.display = "none";

    // Créer une div pour afficher les effets sans toucher le labyrinthe
    let loveContainer = document.createElement("div");
    loveContainer.id = "loveEffects";
    document.body.appendChild(loveContainer);

    for (let i = 0; i < 50; i++) {
        let sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.style.left = Math.random() * window.innerWidth + "px";
        sparkle.style.top = Math.random() * window.innerHeight + "px";
        loveContainer.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 5000);
    }

    const words = [
        "si tu n'acceptes pas je t'ensorcelle",
        "je t'aime",
        "madly in love with you",
        "baby",
        "je te force à accepter"
    ];

    for (let i = 0; i < 20; i++) {
        let word = document.createElement("div");
        word.classList.add("love-word");
        word.innerText = words[Math.floor(Math.random() * words.length)];

        word.style.left = Math.random() * (window.innerWidth - 150) + "px";
        word.style.top = Math.random() * (window.innerHeight - 80) + "px";

        loveContainer.appendChild(word);
    }
}

drawMaze();


