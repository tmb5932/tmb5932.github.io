// Makes the red / yellow / green dots on terminal-style windows do something.
//   red    -> the window refuses to close (shake + "permission denied" toast)
//   yellow -> photo windows only: the photo shrinks to the middle, spins, and grows back.
//             The window itself never changes size. Text windows leave yellow decorative.
//   green  -> photo windows open the image full-screen; other windows refuse to resize
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Plays a one-shot animation class, restarting it if it's clicked again mid-animation
  function play(win, cls) {
    if (reduceMotion) return;
    win.classList.remove("tw-shake", "tw-spin");
    void win.offsetWidth;
    win.classList.add(cls);
  }
  function shake(win) { play(win, "tw-shake"); }

  function toast(bar, text, tone) {
    var old = bar.querySelector(".tw-toast");
    if (old) old.remove();
    var t = document.createElement("span");
    t.className = "tw-toast" + (tone ? " " + tone : "");
    t.setAttribute("role", "status");
    t.textContent = text;
    bar.appendChild(t);
    setTimeout(function () { t.remove(); }, 1800);
  }

  // Full-screen photo viewer
  var box = null, lastFocus = null;
  function openLightbox(img) {
    lastFocus = document.activeElement;
    box = document.createElement("div");
    box.className = "tw-lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", img.alt || "Enlarged photo");
    box.innerHTML =
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="tw-lightbox-close">[esc] close</button>';
    var big = box.querySelector("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || "";
    box.querySelector("figcaption").textContent = img.alt || "";
    box.addEventListener("click", closeLightbox);
    document.body.appendChild(box);
    document.body.classList.add("tw-noscroll");
    box.querySelector(".tw-lightbox-close").focus();
  }
  function closeLightbox() {
    if (!box) return;
    box.remove();
    box = null;
    document.body.classList.remove("tw-noscroll");
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  function makeButton(dot, label) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = dot.className;
    b.setAttribute("aria-label", label);
    b.title = label;
    dot.replaceWith(b);
    return b;
  }

  document.querySelectorAll(".term-titlebar").forEach(function (bar) {
    var win = bar.parentElement;
    // This window's own photo, ignoring images inside a nested window (about.sh holds the headshot window)
    var photo = Array.prototype.find.call(win.querySelectorAll("img"), function (img) {
      for (var el = img.parentElement; el && el !== win; el = el.parentElement) {
        if (el.querySelector(":scope > .term-titlebar")) return false;
      }
      return true;
    }) || null;
    var red = bar.querySelector(".dot.red");
    var yellow = bar.querySelector(".dot.yellow");
    var green = bar.querySelector(".dot.green");

    if (red) {
      makeButton(red, "Close window").addEventListener("click", function () {
        shake(win);
        toast(bar, "kill: permission denied");
      });
    }

    // Clip the photo to its own area so the spin can't swing over the titlebar or frame.
    // The wrapper is a plain block the same size as the photo, so page layout doesn't change.
    if (photo && !photo.parentElement.classList.contains("tw-clip")) {
      var clip = document.createElement("div");
      clip.className = "tw-clip";
      photo.parentNode.insertBefore(clip, photo);
      clip.appendChild(photo);
    }

    if (yellow && photo) {
      makeButton(yellow, "Spin photo").addEventListener("click", function () {
        play(photo, "tw-spin");
      });
    }

    if (green) {
      var g = makeButton(green, photo ? "Enlarge photo" : "Maximize window");
      g.addEventListener("click", function () {
        if (photo) {
          openLightbox(photo);
        } else {
          shake(win);
          toast(bar, "resize: window locked at 80x24");
        }
      });
    }
  });
})();
