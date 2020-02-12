var slider = function(sliderElement) {
  var pages = [];
  var currentSlide = 1;
  var isChanging = false;
  var keyUp = { 38: 1, 33: 1 };
  var keyDown = { 40: 1, 34: 1 };

  var init = function() {
    document.body.classList.add("slider__body");
    // control scrolling
    whatWheel =
      "onwheel" in document.createElement("div")
        ? "wheel"
        : document.onmousewheel !== undefined
        ? "mousewheel"
        : "DOMMouseScroll";
    window.addEventListener(whatWheel, function(e) {
      var direction = e.wheelDelta || e.deltaY;
      if (direction > 0) {
        changeSlide(-1);
      } else {
        changeSlide(1);
      }
    });

    // allow keyboard input
    window.addEventListener("keydown", function(e) {
      if (keyUp[e.keyCode]) {
        changeSlide(-1);
      } else if (keyDown[e.keyCode]) {
        changeSlide(1);
      }
    });

    //arrow down
    document.querySelectorAll(".arrow-down").forEach(arrow => {
      arrow.addEventListener("click", () => {
        changeSlide(1);
      });
    });

    // page change animation is done
    detectChangeEnd() &&
      document
        .querySelector(sliderElement)
        .addEventListener(detectChangeEnd(), function() {
          if (isChanging) {
            setTimeout(function() {
              isChanging = false;
              console.log(currentSlide);
              if (currentSlide === 2) {
                // document.querySelectorAll(".post-chunk").forEach(chunk => {
                //   chunk.classList.add("fade-chunks");
                // });
                for (let i = 0; i < 5; i++) {
                  if (i == 0) {
                    document
                      .querySelectorAll(".post-chunk")
                      [i].classList.add("fade-chunks");
                  } else {
                    setTimeout(function() {
                      document
                        .querySelectorAll(".post-chunk")
                        [i].classList.add("fade-chunks");
                      // console.log(document.querySelectorAll(".post-chunk")[i]);
                    }, 2000 * i);
                  }
                }
              }
            }, 800);
          }
        });

    // set up page
    document.querySelector(sliderElement).classList.add("slider__container");

    var index = 1;
    [].forEach.call(document.querySelectorAll(sliderElement + " > *"), function(
      section
    ) {
      section.classList.add("slider__page");
      pages.push(section);
      section.setAttribute("data-slider-index", index++);
    });

    // stuff for touch devices
    var touchStartPos = 0;
    var touchStopPos = 0;
    var touchMinLength = 90;
    document.addEventListener("touchstart", function(e) {
      e.preventDefault();
      if (
        e.type == "touchstart" ||
        e.type == "touchmove" ||
        e.type == "touchend" ||
        e.type == "touchcancel"
      ) {
        var touch = e.touches[0] || e.changedTouches[0];
        touchStartPos = touch.pageY;
      }
    });
    document.addEventListener("touchend", function(e) {
      e.preventDefault();
      if (
        e.type == "touchstart" ||
        e.type == "touchmove" ||
        e.type == "touchend" ||
        e.type == "touchcancel"
      ) {
        var touch = e.touches[0] || e.changedTouches[0];
        touchStopPos = touch.pageY;
      }
      if (touchStartPos + touchMinLength < touchStopPos) {
        changeSlide(-1);
      } else if (touchStartPos > touchStopPos + touchMinLength) {
        changeSlide(1);
      }
    });
  };

  // prevent double scrolling
  var detectChangeEnd = function() {
    var transition;
    var e = document.createElement("foobar");
    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (transition in transitions) {
      if (e.style[transition] !== undefined) {
        return transitions[transition];
      }
    }
    return true;
  };

  // handle css change
  var changeCss = function(obj, styles) {
    for (var _style in styles) {
      if (obj.style[_style] !== undefined) {
        obj.style[_style] = styles[_style];
      }
    }
  };

  // handle page/section change
  var changeSlide = function(direction) {
    // already doing it or last/first page, staph plz
    if (
      isChanging ||
      (direction == 1 && currentSlide == pages.length) ||
      (direction == -1 && currentSlide == 1)
    ) {
      return;
    }

    // change page
    currentSlide += direction;
    isChanging = true;
    changeCss(document.querySelector(sliderElement), {
      transform: "translate3d(0, " + -(currentSlide - 1) * 100 + "%, 0)"
    });
  };

  // go to spesific slide if it exists
  var gotoSlide = function(where) {
    var target = document
      .querySelector(where)
      .getAttribute("data-slider-index");
    if (target != currentSlide && document.querySelector(where)) {
      changeSlide(target - currentSlide);
    }
  };

  // if page is loaded with hash, go to slide
  if (location.hash) {
    setTimeout(function() {
      window.scrollTo(0, 0);
      gotoSlide(location.hash);
    }, 1);
  }

  // we have lift off
  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("onload", init(), false);
  }

  // expose gotoSlide function
  return {
    gotoSlide: gotoSlide
  };
};
