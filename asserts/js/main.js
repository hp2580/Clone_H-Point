const nav_wrap = document.querySelector(".depth2_wrap");
const nav = document.querySelector(".depth2");
const btn_sides = document.querySelectorAll(".btn_side");
const side_menu_wrap = document.querySelector(".side_menu_wrap");
const s_depth2_lists = document.querySelectorAll(".s_depth2 > li");
const s_depth2_titles = document.querySelectorAll(".s_depth2_title");
const btn_quick = document.querySelector(".btn_quick");
const sec1 = document.querySelector(".section1");
const sec2 = document.querySelector(".section2");
const goTop = document.querySelector(".goTop");
const sec3_tags = document.querySelectorAll(".sec3_tags");
const sec5_tags = document.querySelectorAll(".sec5_tags");
const sec5_slide_wrap = document.querySelector(".sec5_depth1");
const sec5_slide = document.querySelectorAll(".sec5_depth1 > li");
const sec5_clone_first = sec5_slide_wrap.firstElementChild.cloneNode(true);
const sec5_clone_last = sec5_slide_wrap.lastElementChild.cloneNode(true);

let upper768;
let lower768;

window.onload = () => {
  if (window.innerWidth > 768) {
    upper768 = true;
    lower768 = false;
    document.querySelector(".sec4_amount").innerHTML = `3`;
    sec5_index = 0;
    sec5_index_user = 0;
    setTimeout(() => {
      sec6_interval = setInterval(() => {
        autoPlay_Sec6();
      }, 1000);
    });
  } else {
    upper768 = false;
    lower768 = true;
    document.querySelector(".sec4_amount").innerHTML = `6`;
    sec5_index = 1;
    sec5_index_user = 1;
    sec5_slide_wrap.append(sec5_clone_first);
    sec5_slide_wrap.prepend(sec5_clone_last);
    sec5_slide_wrap.style.transform = `translateX(-${
      100 / sec5_slide_wrap.childElementCount
    }%)`;
    setTimeout(() => {
      sec5_slide_wrap.style.transition = ".6s ease";
    });
    sec7_slide.append(sec7_clone_first);
    sec7_slide.prepend(sec7_clone_last);
    sec7_width = 100 / sec7_slide.childElementCount;
    sec7_slide.style.transform = `translateX(-${sec7_width}%)`;
    document
      .querySelector(`.sec7_slide${sec7_index_user}`)
      .classList.add("active");
    setTimeout(() => {
      sec7_slide.style.transition = ".6s ease";
      document.querySelectorAll(".sec7_slide a").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
        });
      });
      sec7_interval = setInterval(() => {
        sec7_autoplay = true;
        autoPlay_Sec7();
      }, 1000);
    });
  }
};

window.onresize = () => {
  if (window.innerWidth > 1024) {
    clearActive(btn_sides);
    side_menu_wrap.style.left = `100%`;
  } else if (window.innerWidth > 768) {
    if (!sec3_autoplay) {
      sec3_autoplay = true;
      sec3_interval = setInterval(() => {
        autoPlay_Sec3();
      }, 1000);
      sec3_control_auto.classList.remove("stop");
    }
    if (upper768 == false) {
      upper768 = true;
      lower768 = false;
      sec4_index = Math.floor(sec4_index / 2) * 2;
      sec4_index_user = Math.floor(sec4_index_user / 2) * 2;
      document.documentElement.style.setProperty(
        "--sec4_percent",
        `${(sec4_index_user / 2) * 33.33}%`
      );
      document.querySelector(".sec4_amount").innerHTML = `3`;
      slide_Sec4();
      for (let slide of sec5_slide) {
        slide.style.transform = `translateX(0)`;
      }
      sec5_index = 0;
      sec5_index_user = 0;
      sec5_slide_wrap.removeChild(sec5_slide_wrap.firstElementChild);
      sec5_slide_wrap.removeChild(sec5_slide_wrap.lastElementChild);
      clearActive(sec5_tags);
      sec5_tags[0].classList.add("active");
      clearActive(sec5_slide);
      sec5_slide_wrap.firstElementChild.classList.add("active");
      sec5_slide_wrap.style.transition = "";
      sec5_slide_wrap.style.transform = `translateX(0)`;
      sec6_interval = setInterval(() => {
        autoPlay_Sec6();
      }, 1000);
      sec7_index = 1;
      sec7_index_user = 1;
      sec7_cnt = 0;
      clearInterval(sec7_interval);
      document.querySelector(".sec7_auto").classList.remove("stop");
      document.querySelector(".sec7_current").innerHTML = sec7_index_user;
      document.documentElement.style.setProperty(
        "--sec7_percent",
        `${sec7_index_user * 33.33}%`
      );
      sec7_slide.removeChild(sec7_slide.firstElementChild);
      sec7_slide.removeChild(sec7_slide.lastElementChild);
      sec7_slide.style.transition = "";
      sec7_slide.style.transform = `translateX(0)`;
    }
  } else if (window.innerWidth <= 768) {
    if (lower768 == false) {
      lower768 = true;
      upper768 = false;
      document.documentElement.style.setProperty(
        "--sec4_percent",
        `${(sec4_index_user - 1) * 16.67}%`
      );
      document.querySelector(".sec4_amount").innerHTML = `6`;
      slide_Sec4();
      for (let slide of sec5_slide) {
        slide.style.transform = `translateX(0)`;
      }
      sec5_index = 1;
      sec5_index_user = 1;
      sec5_slide_wrap.append(sec5_clone_first);
      sec5_slide_wrap.prepend(sec5_clone_last);
      clearActive(sec5_tags);
      sec5_tags[0].classList.add("active");
      sec5_slide_wrap.style.transition = "";
      slide_Sec5(sec5_slide_wrap);
      setTimeout(() => {
        sec5_slide_wrap.style.transition = ".6s ease";
        transitionSec5 = true;
      });
      clearInterval(sec6_interval);
      sec6_cnt = 0;
      sec6_index = 1;
      sec6_index_user = 1;
      slide_Sec6();
      sec7_slide.append(sec7_clone_first);
      sec7_slide.prepend(sec7_clone_last);
      sec7_width = 100 / sec7_slide.childElementCount;
      sec7_slide.style.transform = `translateX(-${sec7_width}%)`;
      document
        .querySelector(`.sec7_slide${sec7_index_user}`)
        .classList.add("active");
      setTimeout(() => {
        sec7_slide.style.transition = ".6s ease";
        sec7_interval = setInterval(() => {
          autoPlay_Sec7();
        }, 1000);
      });
    }
  }
  sec4_down = false;
  sec4_move = false;
};

window.onscroll = () => {
  let sec1_bottom =
    sec1.getBoundingClientRect().top + sec1.getBoundingClientRect().height;
  let sec2_height = sec2.getBoundingClientRect().top;
  if (window.innerWidth < 1024) {
    if (sec1_bottom < 55) goTop.classList.add("active");
    else goTop.classList.remove("active");
  }
  if (sec2_height < sec2.getBoundingClientRect().height / 2)
    sec2.classList.add("active");
  else sec2.classList.remove("active");
};

nav.addEventListener("mouseenter", () => {
  nav_wrap.style.height = "560px";
});

nav_wrap.addEventListener("mouseleave", () => {
  nav_wrap.style.height = "100%";
});

for (let title of s_depth2_titles) {
  title.addEventListener("click", (e) => {
    e.preventDefault();
    clearActive(s_depth2_lists);
    title.parentElement.classList.add("active");
  });
}

for (let btn_side of btn_sides) {
  btn_side.addEventListener("click", () => {
    for (let btn_side of btn_sides) {
      btn_side.classList.toggle("active");
    }
    if (btn_side.classList.contains("active")) {
      side_menu_wrap.style.left = 0;
      document.body.style.overflow = "hidden";
    } else {
      side_menu_wrap.style.left = `100%`;
      document.body.style.overflow = "auto";
    }
  });
}

btn_quick.addEventListener("click", () => {
  if (window.innerWidth < 1024)
    document.querySelector(".quick_menu").classList.toggle("hide");
});

goTop.addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".sec3_tags").forEach((tag, idx) => {
  tag.addEventListener("click", () => {
    sec3_index_user = idx + 1;
    sec3_index = idx + 1;
    sec3_cnt = 0;
    slide_Sec3();
  });
});

function clearActive(elements) {
  for (let element of elements) {
    element.classList.remove("active");
  }
}
