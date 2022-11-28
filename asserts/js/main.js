let nav_wrap = document.querySelector(".depth2_wrap");
let nav = document.querySelector(".depth2");
let btn_sides = document.querySelectorAll(".btn_side");
let side_menu_wrap = document.querySelector(".side_menu_wrap");
let s_depth2_lists = document.querySelectorAll(".s_depth2 > li");
let s_depth2_titles = document.querySelectorAll(".s_depth2_title");
let btn_quick = document.querySelector(".btn_quick");
let sec1 = document.querySelector(".section1");
let sec2 = document.querySelector(".section2");
let goTop = document.querySelector(".goTop");
let sec3_tags = document.querySelectorAll(".sec3_tags");

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
  }
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

let sec3_index = 1;
let sec3_index_user = 1;

document.querySelector(".sec3_tag1").addEventListener("click", () => {
  sec3_index_user = 1;
  sec3_index = 1;
  sec3_cnt = 0;
  slide_Sec3();
});
document.querySelector(".sec3_tag2").addEventListener("click", () => {
  sec3_index_user = 2;
  sec3_index = 2;
  sec3_cnt = 0;
  slide_Sec3();
});
document.querySelector(".sec3_tag3").addEventListener("click", () => {
  sec3_index_user = 3;
  sec3_index = 3;
  sec3_cnt = 0;
  slide_Sec3();
});
document.querySelector(".sec3_tag4").addEventListener("click", () => {
  sec3_index_user = 4;
  sec3_index = 4;
  sec3_cnt = 0;
  slide_Sec3();
});
document.querySelector(".sec3_tag5").addEventListener("click", () => {
  sec3_index_user = 5;
  sec3_index = 5;
  sec3_cnt = 0;
  slide_Sec3();
});
document.querySelector(".sec3_tag6").addEventListener("click", () => {
  sec3_index_user = 6;
  sec3_index = 6;
  sec3_cnt = 0;
  slide_Sec3();
});
document.querySelector(".sec3_tag7").addEventListener("click", () => {
  sec3_index_user = 7;
  sec3_index = 7;
  sec3_cnt = 0;
  slide_Sec3();
});
document.querySelector(".sec3_tag8").addEventListener("click", () => {
  sec3_index_user = 8;
  sec3_index = 8;
  sec3_cnt = 0;
  slide_Sec3();
});

function clearActive(elements) {
  for (let element of elements) {
    element.classList.remove("active");
  }
}
