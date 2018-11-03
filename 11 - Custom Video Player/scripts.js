const video = document.querySelector(".viewer");
const toggle = document.querySelector(".toggle");
const ranges = document.querySelectorAll("input[type='range']");
const skipButtons = document.querySelectorAll("[data-skip]");
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const fullScreen = document.querySelector(".fullscreen");

function togglePlay()
{
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function handleToggle()
{
    const icon = video.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function handleSkip()
{
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress(e)
{
    // console.log(e.offsetX);
    const percent = (video.currentTime / video.duration) * 100;
    // video.currentTime =
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e)
{
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener('play', handleToggle);
video.addEventListener('pause', handleToggle);

video.addEventListener('timeupdate', handleProgress);

document.addEventListener('keydown', (e) => e.code.toLowerCase() == 'space' && togglePlay());

ranges.forEach(range => range.addEventListener("change", (e) => video[e.currentTarget.name] = e.currentTarget.value));

skipButtons.forEach(btn => btn.addEventListener("click", handleSkip));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mouseover", (e) => mousedown && scrub(e));
progress.addEventListener("mouseup", () => mousedown = false);
progress.addEventListener("mousedown", () => mousedown = true);

fullScreen.addEventListener("click", () => video.webkitEnterFullScreen());