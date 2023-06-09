const slider = document.querySelector(".slider-container"),
  slides = Array.from(document.querySelectorAll(".slide"));

let isDragging = false,
 startPos = 0,
 curTrans = 0,
 prevTrans = 0,
 animationID = 0,
 curIndex = 0;

// Disable context menu
window.oncontextmenu = function(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

slides.forEach((slide, index) => {
  const slideImg = slide.querySelector("img");
  slideImg.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  // Touch events
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  // Mouse events
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
  slide.addEventListener("mousemove", touchMove);
});

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
};

function touchStart(index) {
  return function(e) {
    curIndex = index;
    startPos = getPositionX(e);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
    slider.classList.add("grabbing");
  };
};

function touchMove(e) {
    if (isDragging) {
      const curPos = getPositionX(e);
      curTrans = prevTrans + curPos - startPos;
    }
};

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
  
    const movedBy = curTrans - prevTrans;
  
    if (movedBy < -100 && curIndex < slides.length - 1) {
      curIndex += 1;
    }
  
    if (movedBy > 100 && curIndex > 0) {
      curIndex -= 1;
    }
  
    setPosByIndex();
  
    slider.classList.remove("grabbing");
  };

  function animation() {
      setSliderPos();
    if (isDragging) {
      requestAnimationFrame(animation);
    }
  }
function setSliderPos() {
    slider.style.transform = `translateX(${curTrans}px)`;
}
  
  function setPosByIndex() {
    curTrans = curIndex * -window.innerWidth;
    prevTrans = curTrans;
    setSliderPos();
  };
  
  