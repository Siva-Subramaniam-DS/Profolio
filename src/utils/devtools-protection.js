/**
 * Developer Tools Protection
 * Prevents users from inspecting the website
 */

class DevToolsProtection {
  constructor() {
    this.isEnabled = false;
    this.checkInterval = null;
    this.devtoolsOpen = false;
  }

  init() {
    // Only enable in production
    if (import.meta.env.MODE === 'production') {
      this.isEnabled = true;
      this.disableRightClick();
      this.disableKeyboardShortcuts();
      this.detectDevTools();
      this.disableConsole();
      this.preventTextSelection();
      this.detectDebugger();
    }
  }

  // Disable right-click context menu
  disableRightClick() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showWarning('Right-click is disabled on this website.');
      return false;
    }, false);
  }

  // Disable keyboard shortcuts for DevTools
  disableKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        this.showWarning('Developer tools are disabled.');
        return false;
      }
      
      // Ctrl+Shift+I (Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        this.showWarning('Developer tools are disabled.');
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        this.showWarning('Developer tools are disabled.');
        return false;
      }
      
      // Ctrl+Shift+C (Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        this.showWarning('Developer tools are disabled.');
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        this.showWarning('Viewing source is disabled.');
        return false;
      }
      
      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        this.showWarning('Saving page is disabled.');
        return false;
      }
      
      // Ctrl+P (Print - can be used to view source)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        this.showWarning('Printing is disabled.');
        return false;
      }
    });
  }

  // Detect if DevTools is open
  detectDevTools() {
    const element = new Image();
    let devtoolsOpen = false;
    
    // Define a custom toString method
    Object.defineProperty(element, 'id', {
      get: () => {
        devtoolsOpen = true;
        this.handleDevToolsOpen();
        return 'devtools-detector';
      }
    });

    // Check periodically
    this.checkInterval = setInterval(() => {
      devtoolsOpen = false;
      console.log('%c', element);
      console.clear();
      
      // Check window size difference (DevTools changes viewport)
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      if (widthThreshold || heightThreshold) {
        this.handleDevToolsOpen();
      }
    }, 1000);

    // Detect using debugger timing
    let startTime = new Date();
    debugger;
    let endTime = new Date();
    
    if (endTime - startTime > 100) {
      this.handleDevToolsOpen();
    }
  }

  // Disable console methods
  disableConsole() {
    if (this.isEnabled) {
      // Store original console methods
      const noop = () => {};
      
      // Override console methods
      ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp', 'context', 'memory'].forEach(method => {
        if (console[method]) {
          console[method] = noop;
        }
      });
    }
  }

  // Prevent text selection
  preventTextSelection() {
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    }, false);
    
    document.addEventListener('mousedown', (e) => {
      if (e.detail > 1) {
        e.preventDefault();
        return false;
      }
    }, false);
    
    // Add CSS to prevent text selection
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Detect debugger attempts
  detectDebugger() {
    setInterval(() => {
      const startTime = performance.now();
      debugger;
      const endTime = performance.now();
      
      if (endTime - startTime > 100) {
        this.handleDevToolsOpen();
      }
    }, 2000);
  }

  // Handle DevTools detection
  handleDevToolsOpen() {
    if (!this.devtoolsOpen) {
      this.devtoolsOpen = true;
      
      // Option 1: Blur the page
      document.body.style.filter = 'blur(10px)';
      document.body.style.pointerEvents = 'none';
      
      // Option 2: Show warning overlay
      this.showDevToolsWarning();
      
      // Option 3: Redirect (optional)
      // setTimeout(() => {
      //   window.location.href = 'about:blank';
      // }, 1000);
    }
  }

  // Show DevTools warning overlay
  showDevToolsWarning() {
    const overlay = document.createElement('div');
    overlay.id = 'devtools-warning';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 999999;
      font-family: Arial, sans-serif;
    `;
    
    overlay.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <h1 style="font-size: 48px; margin-bottom: 20px;">⚠️ Access Denied</h1>
        <p style="font-size: 24px; margin-bottom: 20px;">Developer tools are not allowed on this website.</p>
        <p style="font-size: 18px; color: #ccc;">Please close the developer tools to continue.</p>
        <p style="font-size: 14px; color: #999; margin-top: 40px;">This is a security measure to protect the content.</p>
      </div>
    `;
    
    document.body.appendChild(overlay);
  }

  // Show warning message
  showWarning(message) {
    // Create a temporary toast notification
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #f44336;
      color: white;
      padding: 16px 24px;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      z-index: 999999;
      font-family: Arial, sans-serif;
      font-size: 14px;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Cleanup
  destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    this.isEnabled = false;
  }
}

// Create singleton instance
const devToolsProtection = new DevToolsProtection();

// Auto-initialize when module is imported
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      devToolsProtection.init();
    });
  } else {
    devToolsProtection.init();
  }
}

export default devToolsProtection;