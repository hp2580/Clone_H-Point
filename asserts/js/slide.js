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
  b_cnt = 0;
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
  sec1_cnt = 0;
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
  sec3_cnt = 0;
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

/*Section4*/
let sec4_slide_wrap = document.querySelector(".sec4_slide_wrap");
let sec4_clone_first = document.querySelector(".sec4_slide1").cloneNode(true);
let sec4_clone_first2 = document.querySelector(".sec4_slide2").cloneNode(true);
let sec4_clone_last = document.querySelector(".sec4_slide6").cloneNode(true);
let sec4_clone_last2 = document.querySelector(".sec4_slide5").cloneNode(true);
let sec4_width;
let sec4_index = 2;
let sec4_index_user = 2;
let sec4_control_auto = document.querySelector(".sec4_auto");
let sec4_prevPoint = 0;
let sec4_nextPoint = 0;
let transitionSec4 = true;
let sec4_cnt = 0;
let sec4_interval;
let sec4_autoplay;

if (window.innerWidth > 768) {
  document.documentElement.style.setProperty(
    "--sec4_percent",
    `${(sec4_index_user / 2) * 33.33}%`
  );
  document.querySelector(".sec4_amount").innerHTML = `3`;
} else {
  document.documentElement.style.setProperty(
    "--sec4_percent",
    `${(sec4_index_user - 1) * 16.67}%`
  );
  document.querySelector(".sec4_amount").innerHTML = `6`;
}
document.querySelector(".sec4_current").innerHTML = `${sec4_index_user / 2}`;
sec4_slide_wrap.append(sec4_clone_first);
sec4_slide_wrap.append(sec4_clone_first2);
sec4_slide_wrap.prepend(sec4_clone_last);
sec4_slide_wrap.prepend(sec4_clone_last2);
sec4_width = 100 / sec4_slide_wrap.childElementCount;
sec4_slide_wrap.style.transform = `translateX(-${sec4_width * 2}%)`;
setTimeout(() => {
  sec4_slide_wrap.style.transition = ".6s ease";
  sec4_interval = setInterval(() => {
    autoPlay_Sec4();
  }, 1000);
});

sec4_slide_wrap.addEventListener("transitionend", () => {
  if (sec4_index === 8) {
    sec4_slide_wrap.style.transition = "";
    sec4_index = 2;
    slide_Sec4();
    setTimeout(() => {
      sec4_slide_wrap.style.transition = ".6s ease";
    });
  } else if (sec4_index === 0) {
    sec4_slide_wrap.style.transition = "";
    sec4_index = 6;
    slide_Sec4();
    setTimeout(() => {
      sec4_slide_wrap.style.transition = ".6s ease";
    });
  }
  transitionSec4 = true;
});

sec4_slide_wrap.addEventListener("mousedown", ({ clientX }) => {
  sec4_prevPoint = clientX;
  sec4_cnt = 0;
});

sec4_slide_wrap.addEventListener("mouseup", ({ clientX }) => {
  sec4_nextPoint = clientX;
  let direction = sec4_nextPoint - sec4_prevPoint;
  user_slide_Sec4(direction);
});

sec4_slide_wrap.addEventListener("touchstart", ({ changedTouches }) => {
  sec4_prevPoint = changedTouches[0].clientX;
  sec4_cnt = 0;
});

sec4_slide_wrap.addEventListener("touchend", ({ changedTouches }) => {
  sec4_nextPoint = changedTouches[0].clientX;
  let direction = sec4_nextPoint - sec4_prevPoint;
  user_slide_Sec4(direction);
});

sec4_control_auto.addEventListener("click", () => {
  if (sec4_autoplay) {
    sec4_autoplay = false;
    sec4_cnt = 0;
    clearInterval(sec4_interval);
    sec4_control_auto.classList.add("stop");
  } else {
    sec4_autoplay = true;
    sec4_interval = setInterval(() => {
      autoPlay_Sec4();
    }, 1000);
    sec4_control_auto.classList.remove("stop");
  }
});

for (let link of document.querySelectorAll(".sec4_slide a")) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

function slide_Sec4() {
  transitionSec4 = false;
  if (window.innerWidth > 768) {
    document.documentElement.style.setProperty(
      "--sec4_percent",
      `${Math.floor(sec4_index_user / 2) * 33.33}%`
    );
    document.querySelector(".sec4_current").innerHTML = `${Math.floor(
      sec4_index_user / 2
    )}`;
  } else {
    document.documentElement.style.setProperty(
      "--sec4_percent",
      `${(sec4_index_user - 1) * 16.67}%`
    );
    document.querySelector(".sec4_current").innerHTML = `${
      sec4_index_user - 1
    }`;
  }
  sec4_slide_wrap.style.transform = `translateX(-${sec4_index * sec4_width}%)`;
}

function user_slide_Sec4(direction) {
  if (transitionSec4) {
    if (direction > 20) {
      if (window.innerWidth > 768) {
        sec4_index -= 2;
        sec4_index_user = sec4_index_user > 2 ? sec4_index_user - 2 : 6;
      } else {
        sec4_index -= 1;
        sec4_index_user = sec4_index_user > 2 ? sec4_index_user - 1 : 7;
      }
    } else if (direction < -20) {
      if (window.innerWidth > 768) {
        sec4_index += 2;
        sec4_index_user = sec4_index_user < 6 ? sec4_index_user + 2 : 2;
      } else {
        sec4_index += 1;
        sec4_index_user = sec4_index_user < 7 ? sec4_index_user + 1 : 2;
      }
    }
    slide_Sec4();
  }
}

function autoPlay_Sec4() {
  sec4_autoplay = true;
  if (transitionSec4) {
    sec4_cnt++;
    if (sec4_cnt > 3) {
      sec4_cnt = 0;
      if (window.innerWidth > 768) {
        sec4_index += 2;
        sec4_index_user = sec4_index_user < 6 ? sec4_index_user + 2 : 2;
      } else {
        sec4_index += 1;
        sec4_index_user = sec4_index_user < 7 ? sec4_index_user + 1 : 2;
      }
      slide_Sec4();
    }
  }
}

/*Section5*/
let sec5_slide_active = document.querySelector(".sec5_depth1 > li.active");
let sec5_prevPoint = 0;
let sec5_nextPoint = 0;
let sec5_index;
let sec5_index_user;
let transitionSec5 = true;

sec5_tags[0].classList.add("active");

for (let tag of sec5_tags) {
  tag.addEventListener("click", () => {
    let temp = tag.classList[1][tag.classList[1].length - 1] - 1;
    clearActive(sec5_tags);
    clearActive(sec5_slide);
    tag.classList.add("active");
    if (window.innerWidth > 768) {
      sec5_index = 0;
      sec5_slide[temp].classList.add("active");
    } else {
      sec5_index = temp + 1;
      sec5_index_user = temp + 1;
      slide_Sec5(sec5_slide_wrap);
    }
  });
}

for (let slide of sec5_slide) {
  slide.addEventListener("mousedown", ({ clientX }) => {
    sec5_prevPoint = clientX;
  });

  slide.addEventListener("mouseup", ({ clientX }) => {
    sec5_nextPoint = clientX;
    let direction = sec5_nextPoint - sec5_prevPoint;
    if (window.innerWidth > 768) {
      user_slide_Sec5(direction, slide);
    }
  });

  slide.addEventListener("touchstart", ({ changedTouches }) => {
    sec5_prevPoint = changedTouches[0].clientX;
  });

  slide.addEventListener("touchend", ({ changedTouches }) => {
    sec5_nextPoint = changedTouches[0].clientX;
    let direction = sec5_nextPoint - sec5_prevPoint;
    if (window.innerWidth > 768) {
      user_slide_Sec5(direction, slide);
    }
  });
}

for (let link of document.querySelectorAll(".sec5_depth2 a")) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

sec5_slide_wrap.addEventListener("transitionend", () => {
  if (window.innerWidth <= 768) {
    if (sec5_index === 8) {
      sec5_slide_wrap.style.transition = "";
      sec5_index = 1;
      slide_Sec5(sec5_slide_wrap);
      setTimeout(() => {
        sec5_slide_wrap.style.transition = ".6s ease";
      });
    } else if (sec5_index === 0) {
      sec5_slide_wrap.style.transition = "";
      sec5_index = 7;
      slide_Sec5(sec5_slide_wrap);
      setTimeout(() => {
        sec5_slide_wrap.style.transition = ".6s ease";
      });
    }
    transitionSec5 = true;
  }
});

sec5_slide_wrap.addEventListener("mousedown", ({ clientX }) => {
  sec5_prevPoint = clientX;
});

sec5_slide_wrap.addEventListener("mouseup", ({ clientX }) => {
  sec5_nextPoint = clientX;
  let direction = sec5_nextPoint - sec5_prevPoint;
  if (window.innerWidth <= 768) {
    user_slide_Sec5(direction, sec5_slide_wrap);
  }
});

sec5_slide_wrap.addEventListener("touchstart", ({ changedTouches }) => {
  sec5_prevPoint = changedTouches[0].clientX;
});

sec5_slide_wrap.addEventListener("touchend", ({ changedTouches }) => {
  sec5_nextPoint = changedTouches[0].clientX;
  let direction = sec5_nextPoint - sec5_prevPoint;
  if (window.innerWidth <= 768) {
    user_slide_Sec5(direction, sec5_slide_wrap);
  }
});

function slide_Sec5(obj) {
  let moveWidth;
  if (window.innerWidth > 768) {
    moveWidth = 33.33;
  } else {
    transitionSec5 = false;
    moveWidth = 100 / obj.childElementCount;
    clearActive(sec5_tags);
    sec5_tags[sec5_index_user - 1].classList.add("active");
  }
  obj.style.transform = `translateX(-${sec5_index * moveWidth}%)`;
}

function user_slide_Sec5(direction, obj) {
  if (window.innerWidth > 768) {
    if (direction > 20) {
      sec5_index = sec5_index > 0 ? sec5_index - 1 : 0;
    } else if (direction < -20) {
      sec5_index = sec5_index < 1 ? sec5_index + 1 : 1;
    }
  } else {
    if (transitionSec5) {
      if (direction > 20) {
        sec5_index--;
        sec5_index_user = sec5_index_user > 1 ? sec5_index_user - 1 : 7;
      } else if (direction < -20) {
        sec5_index++;
        sec5_index_user = sec5_index_user < 7 ? sec5_index_user + 1 : 1;
      }
    }
  }
  slide_Sec5(obj);
}

/*Mid_Banner*/
let mid_banner = document.querySelector(".mid_banner ul");
let mid_pages = document.querySelectorAll(".mid_page");
let mid_clone_first = mid_banner.firstElementChild.cloneNode(true);
let mid_clone_last = mid_banner.lastElementChild.cloneNode(true);
let mid_index = 1;
let mid_index_user = 1;
let mid_width = 0;
let mid_prevPoint = 0;
let mid_nextPoint = 0;
let transitionMid = true;
let mid_cnt = 0;
let mid_interval;
let mid_autoplay;

mid_banner.append(mid_clone_first);
mid_banner.prepend(mid_clone_last);
mid_width = 100 / mid_banner.childElementCount;
mid_banner.style.transform = `translateX(-${mid_index * mid_width}%)`;
setTimeout(() => {
  mid_banner.style.transition = ".3s ease";
  mid_interval = setInterval(() => {
    autoPlay_Mid();
  }, 1000);
  document.querySelector(`.mid_page${mid_index_user}`).classList.add("active");
});

mid_banner.addEventListener("transitionend", () => {
  if (mid_index === 4) {
    mid_banner.style.transition = "";
    mid_index = 1;
    slide_Mid();
    setTimeout(() => {
      mid_banner.style.transition = ".3s ease";
    });
  } else if (mid_index === 0) {
    mid_banner.style.transition = "";
    mid_index = 3;
    slide_Mid();
    setTimeout(() => {
      mid_banner.style.transition = ".3s ease";
    });
  }
  transitionMid = true;
});

mid_banner.addEventListener("mousedown", ({ clientX }) => {
  mid_prevPoint = clientX;
  mid_cnt = 0;
});

mid_banner.addEventListener("mouseup", ({ clientX }) => {
  mid_nextPoint = clientX;
  let direction = mid_nextPoint - mid_prevPoint;
  user_slide_Mid(direction);
});

mid_banner.addEventListener("touchstart", ({ changedTouches }) => {
  mid_prevPoint = changedTouches[0].clientX;
  mid_cnt = 0;
});

mid_banner.addEventListener("touchend", ({ changedTouches }) => {
  mid_nextPoint = changedTouches[0].clientX;
  let direction = mid_nextPoint - mid_prevPoint;
  user_slide_Mid(direction);
});

for (let page of mid_pages) {
  page.addEventListener("click", () => {
    let temp = page.classList[1][page.classList[1].length - 1];
    mid_index = temp;
    mid_index_user = parseInt(temp);
    slide_Mid();
  });
}

for (let banner of document.querySelectorAll(".mid_banner a")) {
  banner.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

function slide_Mid() {
  transitionMid = false;
  clearActive(mid_pages);
  document.querySelector(`.mid_page${mid_index_user}`).classList.add("active");
  mid_banner.style.transform = `translateX(-${mid_index * mid_width}%)`;
}

function user_slide_Mid(direction) {
  if (transitionMid) {
    if (direction > 20) {
      mid_index--;
      mid_index_user = mid_index_user > 1 ? mid_index_user - 1 : 3;
    } else if (direction < -20) {
      mid_index++;
      mid_index_user = mid_index_user < 3 ? mid_index_user + 1 : 1;
    }
    slide_Mid();
  }
}

function autoPlay_Mid() {
  mid_autoplay = true;
  if (transitionMid) {
    mid_cnt++;
    if (mid_cnt > 3) {
      mid_cnt = 0;
      mid_index++;
      mid_index_user = mid_index_user < 3 ? mid_index_user + 1 : 1;
      slide_Mid();
    }
  }
}

/*Section6*/
let sec6_slide = document.querySelector(".sec6_slides");
let sec6_clone_first = sec6_slide.firstElementChild.cloneNode(true);
let sec6_clone_first2 =
  sec6_slide.firstElementChild.nextElementSibling.cloneNode(true);
let sec6_clone_last = sec6_slide.lastElementChild.cloneNode(true);
let sec6_clone_last2 =
  sec6_slide.lastElementChild.previousElementSibling.cloneNode(true);
let sec6_width;
let sec6_index = 1;
let sec6_index_user = 1;
let sec6_prevPoint = 0;
let sec6_nextPoint = 0;
let transitionSec6 = true;
let sec6_cnt = 0;
let sec6_interval;
let sec6_autoplay;

sec6_clone_first.classList = "";
sec6_clone_first2.classList = "";
sec6_clone_last.classList = "";
sec6_clone_last2.classList = "";
sec6_slide.append(sec6_clone_first);
sec6_slide.append(sec6_clone_first2);
sec6_slide.prepend(sec6_clone_last);
sec6_slide.prepend(sec6_clone_last2);
sec6_width = 100 / sec6_slide.childElementCount;
sec6_slide.style.transform = `translateX(-${sec6_index * sec6_width}%)`;
document.querySelector(`.sec6_slide${sec6_index_user}`).classList.add("active");
setTimeout(() => {
  sec6_slide.style.transition = ".6s ease";
});

sec6_slide.addEventListener("transitionend", () => {
  if (sec6_index === 6) {
    sec6_slide.style.transition = "";
    sec6_index = 1;
    slide_Sec6();
    setTimeout(() => {
      sec6_slide.style.transition = ".6s ease";
    });
  } else if (sec6_index === 0) {
    sec6_slide.style.transition = "";
    sec6_index = 5;
    slide_Sec6();
    setTimeout(() => {
      sec6_slide.style.transition = ".6s ease";
    });
  }
  transitionSec6 = true;
});

sec6_slide.addEventListener("mousedown", ({ clientX }) => {
  sec6_prevPoint = clientX;
  sec6_cnt = 0;
});

sec6_slide.addEventListener("mouseup", ({ clientX }) => {
  sec6_nextPoint = clientX;
  let direction = sec6_nextPoint - sec6_prevPoint;
  user_slide_Sec6(direction);
});

sec6_slide.addEventListener("touchstart", ({ changedTouches }) => {
  sec6_prevPoint = changedTouches[0].clientX;
  sec6_cnt = 0;
});

sec6_slide.addEventListener("touchend", ({ changedTouches }) => {
  sec6_nextPoint = changedTouches[0].clientX;
  let direction = sec6_nextPoint - sec6_prevPoint;
  user_slide_Sec6(direction);
});

for (let slide of document.querySelectorAll(".sec6_slides li")) {
  slide.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

function slide_Sec6() {
  transitionSec6 = false;
  clearActive(document.querySelectorAll(".sec6_slides li"));
  document
    .querySelector(`.sec6_slide${sec6_index_user}`)
    .classList.add("active");
  sec6_slide.style.transform = `translateX(-${sec6_index * sec6_width}%)`;
}

function user_slide_Sec6(direction) {
  if (transitionSec6) {
    if (direction > 20) {
      sec6_index -= 1;
      sec6_index_user = sec6_index_user > 1 ? sec6_index_user - 1 : 5;
    } else if (direction < -20) {
      sec6_index += 1;
      sec6_index_user = sec6_index_user < 5 ? sec6_index_user + 1 : 1;
    }
    slide_Sec6();
  }
}

function autoPlay_Sec6() {
  sec6_autoplay = true;
  if (transitionSec6) {
    sec6_cnt++;
    if (sec6_cnt > 3) {
      sec6_cnt = 0;
      sec6_index += 1;
      sec6_index_user = sec6_index_user < 5 ? sec6_index_user + 1 : 1;
      slide_Sec6();
    }
  }
}

/*Section7*/
let sec7_slide = document.querySelector(".sec7_slides");
let sec7_control_auto = document.querySelector(".sec7_auto");
let sec7_clone_first = sec7_slide.firstElementChild.cloneNode(true);
let sec7_clone_last = sec7_slide.lastElementChild.cloneNode(true);
let sec7_width;
let sec7_index = 1;
let sec7_index_user = 1;
let sec7_prevPoint = 0;
let sec7_nextPoint = 0;
let transitionSec7 = true;
let sec7_cnt = 0;
let sec7_interval;
let sec7_autoplay;

document.documentElement.style.setProperty(
  "--sec7_percent",
  `${sec7_index_user * 33.33}%`
);
document.querySelector(".sec7_current").innerHTML = sec7_index_user;

sec7_slide.addEventListener("transitionend", () => {
  if (sec7_index === 4) {
    sec7_slide.style.transition = "";
    sec7_index = 1;
    slide_Sec7();
    setTimeout(() => {
      sec7_slide.style.transition = ".6s ease";
    });
  } else if (sec7_index === 0) {
    sec7_slide.style.transition = "";
    sec7_index = 3;
    slide_Sec7();
    setTimeout(() => {
      sec7_slide.style.transition = ".6s ease";
    });
  }
  transitionSec7 = true;
});

sec7_slide.addEventListener("mousedown", ({ clientX }) => {
  if (window.innerWidth <= 768) {
    sec7_prevPoint = clientX;
    sec7_cnt = 0;
  }
});

sec7_slide.addEventListener("mouseup", ({ clientX }) => {
  if (window.innerWidth <= 768) {
    sec7_nextPoint = clientX;
    let direction = sec7_nextPoint - sec7_prevPoint;
    user_slide_Sec7(direction);
  }
});

sec7_slide.addEventListener("touchstart", ({ changedTouches }) => {
  if (window.innerWidth <= 768) {
    sec7_prevPoint = changedTouches[0].clientX;
    sec7_cnt = 0;
  }
});

sec7_slide.addEventListener("touchend", ({ changedTouches }) => {
  if (window.innerWidth <= 768) {
    sec7_nextPoint = changedTouches[0].clientX;
    let direction = sec7_nextPoint - sec7_prevPoint;
    user_slide_Sec7(direction);
  }
});

sec7_control_auto.addEventListener("click", () => {
  if (sec7_autoplay) {
    sec7_autoplay = false;
    sec7_cnt = 0;
    clearInterval(sec7_interval);
    sec7_control_auto.classList.add("stop");
  } else {
    sec7_autoplay = true;
    sec7_interval = setInterval(() => {
      autoPlay_Sec7();
    }, 1000);
    sec7_control_auto.classList.remove("stop");
  }
});

for (let slide of document.querySelectorAll(".sec7_slides li")) {
  slide.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

function slide_Sec7() {
  transitionSec7 = false;
  document.documentElement.style.setProperty(
    "--sec7_percent",
    `${sec7_index_user * 33.33}%`
  );
  document.querySelector(".sec7_current").innerHTML = sec7_index_user;
  clearActive(document.querySelectorAll(".sec7_slide"));
  for (let slide of document.querySelectorAll(
    `.sec7_slide${sec7_index_user}`
  )) {
    slide.classList.add("active");
  }
  sec7_slide.style.transform = `translateX(-${sec7_index * sec7_width}%)`;
}

function user_slide_Sec7(direction) {
  if (transitionSec7) {
    if (direction > 20) {
      sec7_index -= 1;
      sec7_index_user = sec7_index_user > 1 ? sec7_index_user - 1 : 3;
    } else if (direction < -20) {
      sec7_index += 1;
      sec7_index_user = sec7_index_user < 3 ? sec7_index_user + 1 : 1;
    }
    slide_Sec7();
  }
}

function autoPlay_Sec7() {
  sec7_autoplay = true;
  if (transitionSec7) {
    sec7_cnt++;
    if (sec7_cnt > 3) {
      sec7_cnt = 0;
      sec7_index += 1;
      sec7_index_user = sec7_index_user < 3 ? sec7_index_user + 1 : 1;
      slide_Sec7();
    }
  }
}
