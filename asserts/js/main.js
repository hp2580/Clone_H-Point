let nav_wrap = document.querySelector(".depth2_wrap");
let nav = document.querySelector(".depth2");
let btn_sides = document.querySelectorAll(".btn_side");
let side_menu_wrap = document.querySelector(".side_menu_wrap");
let s_depth2_lists = document.querySelectorAll(".s_depth2 > li");
let s_depth2_titles = document.querySelectorAll(".s_depth2_title");
let btn_quick = document.querySelector(".btn_quick");

window.onresize = () => {
  if (window.innerWidth > 1024) {
    clearActive(btn_sides);
    side_menu_wrap.style.left = `100%`;
  }
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

function clearActive(elements) {
  for (let element of elements) {
    element.classList.remove("active");
  }
}
