// Handles the dot trail animation that follows the mouse
function setupDotAnimation() {
    var e = document.querySelector(".anime-container"),
        t = [],
        n = 0;

    function o(e, t, n) {
        return e + (t - e) * n
    }
    const a = e => e * (2 - e);

    function r(e) {
        e *= Math.sqrt(Math.abs(Math.random() - Math.random()));
        var t = 2 * Math.random() * Math.PI;
        return {
            x: e * Math.cos(t),
            y: e * Math.sin(t),
            r: e
        }
    }
    for (var i = 0; i <= 100; i += 1) {
        for (var s = {
                els: []
            }, l = 0; l < 3; l++) {
            var c = document.createElement("div");
            c.classList.add("dot"), e.appendChild(c), s.els.push(c), c.style.background = (d = void 0, (d = ["hsl(0, 100%, 80%)", "hsl(30, 100%, 80%)", "hsl(60, 100%, 80%)", "hsl(120, 100%, 80%)", "hsl(240, 100%, 80%)", "hsl(270, 100%, 80%)", "hsl(300, 100%, 80%)"])[Math.floor(Math.random() * d.length)]);
            var p = anime.random(1, 4),
                {
                    x: u,
                    y: m,
                    r: f
                } = r(1);
            c.style.width = o(p, 1, a(f / 1)) + "px", c.style.height = o(p, 1, a(f / 1)) + "px", c.style.opacity = "0", c.style.transform = "translateX(" + u + "px) translateY(" + m + "px)"
        }
        s.anime = new anime({
            targets: s.els,
            loop: !1,
            easing: "linear",
            autoplay: !1,
            delay: anime.stagger(8),
            opacity: [{
                value: 0,
                duration: 0
            }, {
                value: 1,
                duration: 10
            }, {
                value: 0,
                duration: function() {
                    return anime.random(500, 2e3)
                }
            }],
            width: {
                value: 2,
                duration: 500
            },
            height: {
                value: 2,
                duration: 500
            },
            translateX: {
                value: function() {
                    return anime.random(-60, 60)
                },
                duration: 800
            },
            translateY: {
                value: function() {
                    return anime.random(-60, 60)
                },
                duration: 800
            }
        }), t.push(s)
    }
    var d;

    function v(e) {
        var o, a;
        "touchmove" === e.type ? (o = e.touches[0].pageX, a = e.touches[0].pageY) : (o = e.pageX, a = e.pageY), anime.set(t[n].els, {
            left: o,
            top: a
        }), t[n].anime.restart(), ++n == t.length && (n = 0)
    }
    window.addEventListener("mousemove", v, !1), window.addEventListener("touchmove", v, !1)
}


// Add Metal Slug animation
function setupMetalSlugAnimation() {
    const container = document.querySelector(".anime-container");
    const metalSlugElement = document.createElement("img");
    metalSlugElement.src = "imgs/gifs/metal_slug.gif";
    metalSlugElement.alt = "Metal Slug character running animation";
    metalSlugElement.classList.add("metal-slug");
    metalSlugElement.style.position = "absolute";
    metalSlugElement.style.width = "50px";
    container.appendChild(metalSlugElement);

    function triggerMetalSlugAnimation() {
        if (Math.random() < 0.01) { // 1% chance to trigger on each check
            const topPosition = Math.random() * (window.innerHeight - 100);
            metalSlugElement.style.top = topPosition + "px";

            // Reset animation by removing and re-adding the class
            metalSlugElement.classList.remove("metal-slug-animation");
            void metalSlugElement.offsetWidth; // Force reflow
            metalSlugElement.classList.add("metal-slug-animation");
        }
    }

    // Check every second if we should trigger the animation
    setInterval(triggerMetalSlugAnimation, 1000);
}

// Initialize animations when the window is fully loaded
window.addEventListener("load", () => {
    setupDotAnimation();
    setupMetalSlugAnimation();
});