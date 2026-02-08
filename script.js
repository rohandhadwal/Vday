let clickCount = 0;

const image = document.getElementById("image");
const noButtonAudio = document.getElementById("noButtonAudio");
const yesButtonAudio = document.getElementById("yesButtonAudio");
const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const gifImage = document.getElementById("image");
const reasonContainer = document.getElementById("reason-container");
const reasonText = document.getElementById("reason-text");
const reasonImg = document.getElementById("reason-img");
const finalImage = document.getElementById("final-image");

// Personal reasons for No clicks
const personalReasons = [
    { text: "Why No? I promise you happiness 🥺..and maybe some shopping too 💸😏", img: "images/shop_sq.jpg" },
    { text: "No again? Fine..but I'll spoil you w your fav treats 🍰🫶🏻", img: "images/food_sq.jpg" },
    { text: "Seriously? Ok, you can always be my passenger princess 👑", img: "images/car_sq.jpg" },
    { text: "Last chance! Unlimited hugs, kisses, and cuddles if you change your mind 🤭💖", img: "images/kiss_sq.jpg" }
];

let reasonIndex = 0;

// NO button click
noButton.addEventListener('click', () => {
    clickCount++;

    const scaleMap = [0.9, 0.7, 0.5, 0.3, 0];
    const fontSizeMap = ["20px", "18px", "16px", "14px", "0px"];

    noButton.style.transform = `scale(${scaleMap[Math.min(clickCount - 1, scaleMap.length - 1)]})`;
    noButton.style.fontSize = fontSizeMap[Math.min(clickCount - 1, fontSizeMap.length - 1)];
    noButtonAudio.play();

    // --- MOBILE: hide main GIF only on first NO click ---
    if (window.innerWidth <= 768 && clickCount === 1) {
        if (!image.classList.contains("hidden")) {
            image.classList.add("hidden");
        }
    }

    if (reasonIndex < personalReasons.length) {
        const reason = personalReasons[reasonIndex];
        reasonText.textContent = reason.text;
        reasonImg.src = reason.img;
        reasonContainer.classList.remove("hidden");

        // --- Desktop floating logic ---
        if (window.innerWidth > 768) {
            const rect = gifImage.getBoundingClientRect();
            const reasonWidth = reasonImg.offsetWidth || 180;
            const offsetX = 250;
            const offsetY = rect.top + rect.height / 2 - (reasonImg.offsetHeight || 180) / 2;

            if (reasonIndex % 2 === 0) {
                reasonContainer.style.left = rect.left - offsetX - reasonWidth + "px";
            } else {
                reasonContainer.style.left = rect.right + offsetX + "px";
            }
            reasonContainer.style.top = offsetY + "px";

            reasonContainer.style.transform = "scale(0.9)";
            setTimeout(() => { reasonContainer.style.transform = "scale(1)"; }, 150);
        }

        reasonIndex++;
    }

    // --- On 5th click: show GIF again ---
    if (clickCount >= 5) {
        noButton.style.display = "none";
        reasonContainer.classList.add("hidden");

        const buttonContainer = document.querySelector('.button');
        buttonContainer.style.justifyContent = 'center';

        if (window.innerWidth <= 768) {
            image.classList.remove("hidden"); // show gif again
        } else {
            image.src = "images/no.gif";
        }

        document.querySelector('.title').textContent = "Chalo bas, say yes now 🐶";
    }
});


// YES button click
function yesFunction() {
    const buttonContainer = document.querySelector('.button');
    buttonContainer.style.display = 'none';
    yesButtonAudio.play();
    noButtonAudio.pause();

    // Hide any last reason
    reasonContainer.classList.add("hidden");

    // Change main GIF
    image.src = "images/yes.gif";
    document.querySelector('.title').textContent = "Happy Happy Happy! I love you my forever valentine <3";

    // Show final image
    finalImage.classList.remove("hidden");

    // Heart-shaped confetti
    const duration = 15 * 1000;
    const end = Date.now() + duration;

    function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ffffff', '#ff69b4', '#ffffff'],
            shapes: ['heart'],
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ffffff', '#ff69b4', '#ffffff'],
            shapes: ['heart'],
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }

    frame();
}
