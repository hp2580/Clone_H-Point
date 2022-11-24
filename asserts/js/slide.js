let slide_wrap = document.querySelector(".banner_bottom");
let clone_first = slide_wrap.firstElementChild.cloneNode(true);
let clone_last = slide_wrap.lastElementChild.cloneNode(true);
let b_prevPoint = 0;
let b_nextPoint = 0;
let b_index = 1;
let transitionBanner = true;
let b_cnt = 0;
let b_interval;

slide_wrap.append(clone_first);
slide_wrap.prepend(clone_last);
slide_wrap.style.transform = `translateX(-25%)`;
setTimeout(() => {
  slide_wrap.style.transition = `.3s linear`;
  b_interval = setInterval(() => {
    autoPlay_Banner();
  }, 1000);
});

slide_wrap.addEventListener("transitionend", () => {
  if (b_index === 3) {
    slide_wrap.style.transition = "";
    b_index = 1;
    slide_Banner();
    setTimeout(() => {
      slide_wrap.style.transition = ".3s linear";
    });
  } else if (b_index === 0) {
    slide_wrap.style.transition = "";
    b_index = 2;
    slide_Banner();
    setTimeout(() => {
      slide_wrap.style.transition = ".3s linear";
    });
  }
  b_cnt = 0;
  transitionBanner = true;
});

slide_wrap.addEventListener("mousedown", ({ clientX }) => {
  b_prevPoint = clientX;
  b_cnt = 0;
});

slide_wrap.addEventListener("mouseup", ({ clientX }) => {
  b_nextPoint = clientX;
  let direction = b_nextPoint - b_prevPoint;
  user_slide_Banner(direction);
});

slide_wrap.addEventListener("touchstart", ({ changedTouches }) => {
  b_prevPoint = changedTouches[0].clientX;
});

slide_wrap.addEventListener("touchend", ({ changedTouches }) => {
  b_nextPoint = changedTouches[0].clientX;
  let direction = b_nextPoint - b_prevPoint;
  user_slide_Banner(direction);
});

function slide_Banner() {
  transitionBanner = false;
  slide_wrap.style.transform = `translateX(-${b_index * 25}%)`;
}

function user_slide_Banner(direction) {
  if (transitionBanner) {
    if (direction > 20) {
      b_index--;
    } else if (direction < -20) {
      b_index++;
    }
    slide_Banner();
  }
}

function autoPlay_Banner() {
  if (transitionBanner) {
    b_cnt++;
    if (b_cnt > 3) {
      b_cnt = 0;
      b_index++;
      slide_Banner();
    }
  }
}
