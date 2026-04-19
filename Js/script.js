//© Prodigi14446x - Código libre no comercial

// Cargar el SVG y animar los corazones
fetch('Img/treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    const allPaths = Array.from(svg.querySelectorAll('path'));
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
        path.style.strokeDashoffset = 0;
        setTimeout(() => {
          path.style.fillOpacity = '1';
        }, 1200 + i * 80);
      });

      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
      setTimeout(() => {
        svg.classList.add('move-and-scale');

        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
        }, 1200);

      }, totalDuration);
    }, 50);

    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });
    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });
  });

// Parámetros URL
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Texto dedicatoria
function showDedicationText() {
  let text = getURLParam('text');
  if (!text) {
    text = `para Marisol:\n\nVi esto y pense que encaja perfecto con tu estilo, es sencillo pero dice mucho, justo como nuestras platicas.\n\nAdemas de que siento que este tipo de detalles alegran el espacio. Me gusta rodearme de cosas que tengan esa escensia tranquila, y por eso me acorde ti.\n\nAdemas de transmitir buena energia cuando nos ponemos a hablar de cualquier tonteria haciendo que el tiempo se pase volando jajaja.`;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }

  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  let i = 0;

  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      setTimeout(showSignature, 600);
    }
  }
  type();
}

// Firma
function showSignature() {
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');

  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }

  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Con cariño, jorge";
  signature.classList.add('visible');
}

// Objetos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;

  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';

    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;

    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;

    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }

  spawn();
}

// 🎵 MÚSICA (COMPATIBLE CON GITHUB)
const songs = [
  "Music/song2.mp3",
  "Music/song1.mp3"
];

let currentIndex = 0;
let audio;
let started = false;

window.addEventListener("DOMContentLoaded", () => {
  audio = document.getElementById("bg-music");
  if (!audio) return;

  audio.volume = 0.1;
  audio.loop = false;

  // Espera un clic del usuario (necesario en web)
  document.body.addEventListener("click", startMusic, { once: true });

  // Cambio automático de canción
  audio.addEventListener("ended", () => {
    currentIndex++;
    if (currentIndex >= songs.length) {
      currentIndex = 0;
    }
    playSong(currentIndex);
  });
});

function startMusic() {
  if (started) return;
  started = true;
  playSong(currentIndex);
}

function playSong(index) {
  audio.src = songs[index];
  audio.play().catch(() => {});
}
