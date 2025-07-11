# Virtual Keyboard Scroll Problem

> 💬 `$ marslib --ask --succinct --topic="mobile virtual keyboard breaks css fixed"`

source: [chatgpt.com: Fix edit2 mobile issue](https://chatgpt.com/c/686ba236-1864-800c-82ba-f421c94e4e4b)

When the virtual keyboard opens, the viewport **resizes**, and some CSS `position: fixed` elements behave **as if they're absolutely positioned**, especially on Android Chrome and Firefox.

## 🎯 MISSIONS

### 1. **🚀 scroll-anchor-memory.js**

🧠 Remember and restore scroll position before and after keyboard toggle.

Why?
To prevent awkward jumps after keyboard closes. Could also improve UX for focused inputs.

---

### 2. **🧭 sticky-predictor.js**

📐 Estimate sticky offset *before* keyboard opens to ensure smoother transitions.

Why?
To avoid ugly "first jump" from 0 → 326px. We might anchor from `scrollY` or element position.

---

### 3. **👆 touch-gesture-detector.js**

📱 Detect real user touch scroll vs keyboard-initiated jumps.

Why?
To separate intentional user scrolls from system-induced ones and reduce flickering.

---

### 4. **🎨 scroll-visual-debug.js**

🎛️ Build a visual overlay to show:

* ScrollY
* OffsetTop
* `--todom-sticken-yoffset`
* Visual viewport dims
* Keyboard open state

Why?
A live debug HUD. Makes dev work feel like a cockpit 🛸.

---

### 5. **🧪 mocha-visual-keyboard-tests**

Extend `test-mocha.js` with tests that **simulate** keyboard scenarios.

Why?
So we can catch regressions without manual tapping every time.

---

### 6. **📚 Log & Learn**

Study weird browser behavior with a “record & replay” strategy:

* Log keyboard events, scrollY, offsetTop
* Try to **learn how different devices behave**

Why?
Helps you make a cross-device prediction layer later (like: "Samsung = +Xpx correction").

