/*
    To use this ss_os.js, src it from DOM.
    DOM must contain:

        - an ss_container
        - any number of ss_applications
        - n ss_taskbar

        <div id="ss_container">
            <div class="ss_application" href="pages/home.html" />
        </div>
        <div id="ss_taskbar"></div>
*/

class ss_window {
    constructor(containerEl, appEl, zIndex, ss_desktopObj) {

        this.ss_desktopObj = ss_desktopObj;
        this.containerEl = containerEl;
        this.appEl = appEl;
        this.href = appEl.getAttribute('href');
        this.windowEl;
        this.iframeBlockerEl;
        this.dragInfo = { mouseStart: {}, windowStart: {} };

        this.createWindowEl();
        this.createIframeBlocker()

        this.windowEl.append(this.createTitleEl());
        this.windowEl.append(this.createIframe());
        this.windowEl.append(this.iframeBlockerEl);

        this.setZIndex(zIndex);

        containerEl.append(this.windowEl);
    }

    createWindowEl = () => {
        const windowEl = document.createElement('div');
        windowEl.classList.add('ss_window');
        this.windowEl = windowEl;
    };

    createTitleEl = () => {
        const titleBarEl = document.createElement('div');
        titleBarEl.classList.add('ss_window_titleBar');
        titleBarEl.addEventListener('mousedown', this.handleWindowTitleClick);
        return titleBarEl;
    };

    createIframe = () => {
        const iframeEl = document.createElement('iframe');
        iframeEl.src = this.href;
        iframeEl.width = '100%';
        iframeEl.heaght = '100%';
        return iframeEl;
    };

    createIframeBlocker = () => {
        const iframeBlocker = document.createElement('div');
        iframeBlocker.classList.add('ss_window_iframeBlocker');
        this.iframeBlockerEl = iframeBlocker;
    };

    setFrameBlocker = (mode) => {
        this.iframeBlockerEl.style.display = mode ? 'block' : 'none';
    };

    setZIndex = (zIndex) => {
        this.windowEl.style.zIndex = `${zIndex}`;
    };


    handleMouseMove = (e) => {
        const { windowEl } = this;
        const { mouseStart, windowStart } = this.dragInfo;
        const mouseDiff = { x: e.clientX - mouseStart.x, y: e.clientY - mouseStart.y }
        windowEl.style.left =  windowStart.x + mouseDiff.x;
        windowEl.style.top = windowStart.y + mouseDiff.y;
    };

    handleWindowTitleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const { containerEl, windowEl, ss_desktopObj } = this;

        ss_desktopObj.raiseWindow(this);

        this.setFrameBlocker(true);

        containerEl.addEventListener('mouseup', () => {
            this.setFrameBlocker(false);
            containerEl.removeEventListener('mousemove', this.handleMouseMove);
            this.dragInfo = { mouseStart: {}, windowStart: {} };
        });
        
        this.dragInfo.mouseStart = {x: e.clientX, y: e.clientY}
        const windowRect = windowEl.getBoundingClientRect();
        this.dragInfo.windowStart = {x: windowRect.x, y: windowRect.y}
        
        containerEl.addEventListener('mousemove', this.handleMouseMove);
    };
}

class ss_desktop {
    constructor(containerId) {
        this.openWindows = [];
        this.containerEl = document.getElementById(containerId);
        this.bindHandlersToApps();
    }

    bindHandlersToApps = () => {
        const ss_applications = document.getElementsByClassName('ss_application');
        for (const app of ss_applications) {
            app.addEventListener('click', this.addWindow);
        }
    };

    setZIndexs = () => {
        for (const [index, window] of this.openWindows.entries()) {
            window.setZIndex(index * 1000);
        }
    };

    raiseWindow = (window) => {
        const { openWindows } = this;
        const windowIndex = openWindows.indexOf(window);
        openWindows.splice(windowIndex, 1);
        this.openWindows = [ ...openWindows, window ];
        this.setZIndexs();
    };

    addWindow = (e) => {
        const { containerEl } = this;
        const appEl = e.target;
        const w = new ss_window(containerEl, appEl, (this.openWindows.length + 1) * 1000, this);
        this.openWindows.push(w);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    new ss_desktop('ss_container');
});
