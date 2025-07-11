// scroll-anchor-memory.js
// Mission #1: 🧠 Remember and restore scroll position before and after keyboard toggle

(function (global) {
  function setupScrollMemory(options = {}) {
    const baselineHeight = window.visualViewport?.height || 0;
    log('[memory] 📏 baselineHeight = ' + baselineHeight);
    const fallbackTimeout = options.fallbackTimeout || 2000;
    let anchorY = null;
    let isMemKeyboardOpen = false;
    let staleCounter = 0;

    if (!window.visualViewport) {
      console.warn("[scroll-memory] visualViewport not available.");
      return;
    }

    visualViewport.addEventListener('resize', () => {
      const vp = visualViewport;
      const keyboardNow = vp.height < (baselineHeight - 100);

      if (vp.height === 368) staleCounter++;
      else staleCounter = 0;

      if (keyboardNow && !isMemKeyboardOpen) {
        anchorY = window.scrollY;
        isMemKeyboardOpen = true;
        log('[memory] ⌨️ opened → anchorY saved: ' + anchorY);
      } else if (!keyboardNow && isMemKeyboardOpen) {
        isMemKeyboardOpen = false;
        if (anchorY !== null) {
          log('[memory] ⌨️ closed → restoring scrollY: ' + anchorY);
          setTimeout(() => {
            window.scrollTo({ top: anchorY, behavior: 'smooth' });
            anchorY = null;
          }, 100);
        } else {
          log('[memory] ⌨️ closed → skipped restore: anchorY is null');
        }
      } else if (!keyboardNow && anchorY !== null && isMemKeyboardOpen) {
        log('[memory] ⌨️ still closed but anchorY not cleared → forcing restore');
        setTimeout(() => {
          window.scrollTo({ top: anchorY, behavior: 'smooth' });
          anchorY = null;
        }, 300);
      } else {
        log(`[memory] ⌨️ resize: state unchanged → keyboardNow=${keyboardNow}, anchorY=${anchorY}`);
      }

      if (staleCounter > 3 && anchorY !== null) {
        log('[memory] 💀 viewport frozen → force restoring scrollY: ' + anchorY);
        window.scrollTo({ top: anchorY, behavior: 'smooth' });
        anchorY = null;
        isMemKeyboardOpen = false;
        staleCounter = 0;
      }
    });

    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.addEventListener('blur', () => {
        if (!isMemKeyboardOpen && anchorY !== null) {
          log('[blur] restoring anchorY');
          window.scrollTo({ top: anchorY, behavior: 'smooth' });
          anchorY = null;
        }
      });
    });
  }

  // Attach to global
  global.setupScrollMemory = setupScrollMemory;

  // Simple log passthrough to page-level log system if available
  function log(msg) {
    if (typeof window.log === 'function') {
      window.log(msg);
    } else {
      console.log('[scroll-memory]', msg);
    }
  }
})(window);
