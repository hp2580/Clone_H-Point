/*side_menu Banner*/
let slide_wrap = document.querySelector(".banner_bottom");
let b_clone_first = slide_wrap.firstElementChild.cloneNode(true);
let b_clone_last = slide_wrap.lastElementChild.cloneNode(true);
let b_prevPoint = 0;
let b_nextPoint = 0;
let b_index = 1;
let transitionBanner = true;
let b_cnt = 0;
let b_interval;

slide_wrap.append(b_clone_first);
slide_wrap.prepend(b_clone_last);
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

/*Section1 slide*/
let sec1_slide_wrap = document.querySelector(".sec1_slide_wrap");
let sec1_clone_first = document.querySelector(".sec1_slide1").cloneNode(true);
let sec1_clone_last = document.querySelector(".sec1_slide4").cloneNode(true);
let sec1_control_auto = document.querySelector(".sec1_auto");
let sec1_width;
let sec1_prevPoint = 0;
let sec1_nextPoint = 0;
let sec1_index = 1;
let sec1_index_user = 1;
let transitionSec1 = true;
let sec1_cnt = 0;
let sec1_interval;
let sec1_autoplay;

document.documentElement.style.setProperty(
  "--sec1_percent",
  `${sec1_index_user * 25}%`
);
document.querySelector(".sec1_current").innerHTML = `${sec1_index_user}`;
sec1_slide_wrap.append(sec1_clone_first);
sec1_slide_wrap.prepend(sec1_clone_last);
sec1_width = 100 / sec1_slide_wrap.childElementCount;
sec1_slide_wrap.style.transform = `translateX(-${sec1_width}%)`;
document.querySelector(".sec1_slide1").classList.add("active");
setTimeout(() => {
  sec1_slide_wrap.style.transition = "1s ease";
  sec1_interval = setInterval(() => {
    autoPlay_Sec1();
  }, 1000);
});

sec1_slide_wrap.addEventListener("transitionend", () => {
  if (sec1_index === 5) {
    sec1_slide_wrap.style.transition = "";
    sec1_index = 1;
    slide_Sec1();
    setTimeout(() => {
      sec1_slide_wrap.style.transition = "1s ease";
    });
  } else if (sec1_index === 0) {
    sec1_slide_wrap.style.transition = "";
    sec1_index = 4;
    slide_Sec1();
    setTimeout(() => {
      sec1_slide_wrap.style.transition = "1s ease";
    });
  }
  sec1_cnt = 0;
  transitionSec1 = true;
});

sec1_slide_wrap.addEventListener("mousedown", ({ clientX }) => {
  sec1_prevPoint = clientX;
  sec1_cnt = 0;
});

sec1_slide_wrap.addEventListener("mouseup", ({ clientX }) => {
  sec1_nextPoint = clientX;
  let direction = sec1_nextPoint - sec1_prevPoint;
  user_slide_Sec1(direction);
});

sec1_slide_wrap.addEventListener("touchstart", ({ changedTouches }) => {
  sec1_prevPoint = changedTouches[0].clientX;
});

sec1_slide_wrap.addEventListener("touchend", ({ changedTouches }) => {
  sec1_nextPoint = changedTouches[0].clientX;
  let direction = sec1_nextPoint - sec1_prevPoint;
  user_slide_Sec1(direction);
});

sec1_control_auto.addEventListener("click", () => {
  if (sec1_autoplay) {
    sec1_autoplay = false;
    sec1_cnt = 0;
    clearInterval(sec1_interval);
    sec1_control_auto.classList.add("stop");
  } else {
    sec1_autoplay = true;
    sec1_interval = setInterval(() => {
      autoPlay_Sec1();
    }, 1000);
    sec1_control_auto.classList.remove("stop");
  }
});

function slide_Sec1() {
  transitionSec1 = false;
  clearActive(document.querySelectorAll(".sec1_slide"));
  let sec1_actives = document.querySelectorAll(`.sec1_slide${sec1_index_user}`);
  document.documentElement.style.setProperty(
    "--sec1_percent",
    `${sec1_index_user * 25}%`
  );
  document.querySelector(".sec1_current").innerHTML = `${sec1_index_user}`;
  for (let sec1_active of sec1_actives) {
    sec1_active.classList.add("active");
  }
  sec1_slide_wrap.style.transform = `translateX(-${sec1_index * sec1_width}%)`;
}

function user_slide_Sec1(direction) {
  if (transitionSec1) {
    if (direction > 20) {
      sec1_index--;
      sec1_index_user = sec1_index_user > 1 ? sec1_index_user - 1 : 4;
    } else if (direction < -20) {
      sec1_index++;
      sec1_index_user = sec1_index_user < 4 ? sec1_index_user + 1 : 1;
    }
    slide_Sec1();
  }
}

function autoPlay_Sec1() {
  sec1_autoplay = true;
  if (transitionSec1) {
    sec1_cnt++;
    if (sec1_cnt > 3) {
      sec1_cnt = 0;
      sec1_index++;
      sec1_index_user = sec1_index_user < 4 ? sec1_index_user + 1 : 1;
      slide_Sec1();
    }
  }
}

/*Sectoin3*/
let sec3_text_slide = document.querySelector(".sec3_text_wrap");
let sec3_img_slide = document.querySelector(".sec3_slide_wrap");
let sec3_clone_first;
let sec3_clone_last;
let sec3_width;
let sec3_control_auto = document.querySelector(".sec3_auto");
let sec3_prevPoint = 0;
let sec3_nextPoint = 0;
let transitionSec3 = true;
let sec3_cnt = 0;
let sec3_interval;
let sec3_autoplay;

document.documentElement.style.setProperty(
  "--sec3_percent",
  `${sec3_index_user * 12.5}%`
);
document.querySelector(".sec3_current").innerHTML = `${sec3_index_user}`;
sec3_tags[0].classList.add("active");
sec3_text_slide.firstElementChild.classList.add("active");
sec3_img_slide.firstElementChild.classList.add("active");
sec3_clone_first = sec3_img_slide.firstElementChild.cloneNode(true);
sec3_clone_last = sec3_img_slide.lastElementChild.cloneNode(true);
sec3_img_slide.append(sec3_clone_first);
sec3_img_slide.prepend(sec3_clone_last);
sec3_width = 100 / sec3_img_slide.childElementCount;
sec3_img_slide.style.transform = `translateX(-${sec3_width}%)`;
setTimeout(() => {
  sec3_img_slide.style.transition = ".3s ease";
  sec3_interval = setInterval(() => {
    autoPlay_Sec3();
  }, 1000);
});

sec3_img_slide.addEventListener("transitionend", () => {
  if (sec3_index === 9) {
    sec3_img_slide.style.transition = "";
    sec3_index = 1;
    slide_Sec3();
    setTimeout(() => {
      sec3_img_slide.style.transition = ".3s ease";
    });
  } else if (sec3_index === 0) {
    sec3_img_slide.style.transition = "";
    sec3_index = 8;
    slide_Sec3();
    setTimeout(() => {
      sec3_img_slide.style.transition = ".3s ease";
    });
  }
  // sec3_cnt = 0;
  transitionSec3 = true;
});

sec3_img_slide.addEventListener("mousedown", ({ clientX }) => {
  sec3_prevPoint = clientX;
  sec3_cnt = 0;
});

sec3_img_slide.addEventListener("mouseup", ({ clientX }) => {
  sec3_nextPoint = clientX;
  let direction = sec3_nextPoint - sec3_prevPoint;
  user_slide_Sec3(direction);
});

sec3_img_slide.addEventListener("touchstart", ({ changedTouches }) => {
  sec3_prevPoint = changedTouches[0].clientX;
});

sec3_img_slide.addEventListener("touchend", ({ changedTouches }) => {
  sec3_nextPoint = changedTouches[0].clientX;
  let direction = sec3_nextPoint - sec3_prevPoint;
  user_slide_Sec3(direction);
});

sec3_control_auto.addEventListener("click", () => {
  if (sec3_autoplay) {
    sec3_autoplay = false;
    sec3_cnt = 0;
    clearInterval(sec3_interval);
    sec3_control_auto.classList.add("stop");
  } else {
    sec3_autoplay = true;
    sec3_interval = setInterval(() => {
      autoPlay_Sec3();
    }, 1000);
    sec3_control_auto.classList.remove("stop");
  }
});

function slide_Sec3() {
  transitionSec3 = false;
  clearActive(sec3_tags);
  clearActive(document.querySelectorAll(".sec3_text_wrap li"));
  clearActive(document.querySelectorAll(".sec3_slide_wrap li"));
  let sec3_actives = document.querySelectorAll(`.sec3_slide${sec3_index_user}`);
  document.documentElement.style.setProperty(
    "--sec3_percent",
    `${sec3_index_user * 12.5}%`
  );
  document.querySelector(".sec3_current").innerHTML = `${sec3_index_user}`;
  document.querySelector(`.sec3_tag${sec3_index_user}`).classList.add("active");
  document
    .querySelector(`.sec3_text${sec3_index_user}`)
    .classList.add("active");
  for (let sec3_active of sec3_actives) {
    sec3_active.classList.add("active");
  }
  console.log(sec3_index_user, sec3_index);
  sec3_img_slide.style.transform = `translateX(-${sec3_index * sec3_width}%)`;
}

function user_slide_Sec3(direction) {
  if (transitionSec3) {
    if (direction > 20) {
      sec3_index--;
      sec3_index_user = sec3_index_user > 1 ? sec3_index_user - 1 : 8;
    } else if (direction < -20) {
      sec3_index++;
      sec3_index_user = sec3_index_user < 8 ? sec3_index_user + 1 : 1;
    }
    slide_Sec3();
  }
}

function autoPlay_Sec3() {
  sec3_autoplay = true;
  if (transitionSec3) {
    sec3_cnt++;
    if (sec3_cnt > 3) {
      sec3_cnt = 0;
      sec3_index++;
      sec3_index_user = sec3_index_user < 8 ? sec3_index_user + 1 : 1;
      slide_Sec3();
    }
  }
}
