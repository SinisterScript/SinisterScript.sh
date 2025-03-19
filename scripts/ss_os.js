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

        const resizeHandles = this.createResizeHandles();
        this.windowEl.append(this.iframeBlockerEl);
        this.windowEl.append(resizeHandles.left);
        this.windowEl.append(resizeHandles.right);
        this.windowEl.append(resizeHandles.top);
        this.windowEl.append(resizeHandles.bottom);

        this.setZIndex(zIndex);

        containerEl.addEventListener('mouseup', () => {
            this.action == false;
            this.setFrameBlocker(false);
            this.dragInfo = { mouseStart: {}, windowStart: {} };
            containerEl.removeEventListener('mousemove', this.handleMouseMove);
        });

        containerEl.append(this.windowEl);

        this.action = false;
    }


    initDragInfo = (e) => {
        const { windowEl } = this;
        this.dragInfo.mouseStart = {x: e.clientX, y: e.clientY}
        const windowRect = windowEl.getBoundingClientRect();
        this.dragInfo.windowStart = {
            x: windowRect.x,
            y: windowRect.y,
            height: windowRect.height,
            width: windowRect.width
        }
    };

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

    buildResizeHandler = (action) => {
        const { containerEl, ss_desktopObj } = this;
        return (e) => {
            e.stopPropagation();
            e.preventDefault();
            ss_desktopObj.raiseWindow(this);
            this.action = action;
            this.setFrameBlocker(true);
            containerEl.addEventListener('mousemove', this.handleMouseMove);
            this.initDragInfo(e);
        };
    };

    createResizeHandles = () => {
        const left = document.createElement('div');
        left.classList.add('ss_window_horiz_resize_l');
        left.addEventListener('mousedown', this.buildResizeHandler('resizeL'));

        const right = document.createElement('div');
        right.classList.add('ss_window_horiz_resize_r');
        right.addEventListener('mousedown', this.buildResizeHandler('resizeR'));

        const top = document.createElement('div');
        top.classList.add('ss_window_vert_resize_t');
        top.addEventListener('mousedown', this.buildResizeHandler('resizeT'));

        const bottom = document.createElement('div');
        bottom.classList.add('ss_window_vert_resize_b');
        bottom.addEventListener('mousedown', this.buildResizeHandler('resizeB'));

        return { left, right, top, bottom };
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
        const { windowEl, action } = this;
        const { mouseStart, windowStart } = this.dragInfo;
        const mouseDiff = { x: e.clientX - mouseStart.x, y: e.clientY - mouseStart.y }

        if (action == 'move') {
            windowEl.style.left =  windowStart.x + mouseDiff.x;
            windowEl.style.top = windowStart.y + mouseDiff.y;
        } else if (action == 'resizeL') {
            windowEl.style.left = windowStart.x + mouseDiff.x;
            windowEl.style.width = windowStart.width - mouseDiff.x;
        }  else if (action == 'resizeR') {
            windowEl.style.right = windowStart.x - mouseDiff.x;
            windowEl.style.width = windowStart.width + mouseDiff.x;
        } else if (action == 'resizeT') {
            windowEl.style.top = windowStart.y + mouseDiff.y;
            windowEl.style.height = windowStart.height - mouseDiff.y;
        } else if (action == 'resizeB') {
            windowEl.style.bottom = windowStart.y - mouseDiff.y;
            windowEl.style.height = windowStart.height + mouseDiff.y;
        } else {
            throw new Error('Invalid mousemove action.');
        }
    };

    handleWindowTitleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { containerEl, windowEl, ss_desktopObj } = this;

        ss_desktopObj.raiseWindow(this);
        this.setFrameBlocker(true);
        this.action = 'move';

        this.initDragInfo(e);
        
        containerEl.addEventListener('mousemove', this.handleMouseMove);
    };
}

class ss_desktop {
    constructor({ containerId, startMenuId, startMenuButtonId, appsClassName, menuItemsClassName }) {
        this.openWindows = [];
        this.containerEl = document.getElementById(containerId);
        this.startMenuEl = document.getElementById(startMenuId);
        this.startMenuButtonEl = document.getElementById(startMenuButtonId);
        this.appsClassName = appsClassName;
        this.menuItemsClassName = menuItemsClassName;
        this.bindHandlersToApps();
        this.bindHandlersToStartMenu();
    }

    bindHandlersToApps = () => {
        const { appsClassName } = this;
        const ss_applications = document.getElementsByClassName(appsClassName);
        for (const app of ss_applications) {
            app.addEventListener('click', this.addWindow);
        }
    };

    bindHandlersToStartMenu = () => {
        const { startMenuButtonEl, menuItemsClassName } = this;
        // click handler to startmenu button
        startMenuButtonEl.addEventListener('click', this.showStartMenu);
        // click handlers for all menu items
        const ss_menuItems = document.getElementsByClassName(menuItemsClassName);
        for (const app of ss_menuItems) {
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

    calcStartMenuHeight = () => {
        const { startMenuEl } = this;
        const startMenuItems = startMenuEl.children;
        const numChildren = startMenuItems.length;
        const childHeight = startMenuItems[0].getBoundingClientRect().height;
        return childHeight * numChildren;
    };

    showStartMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { startMenuEl } = this;
        startMenuEl.style.display = 'block';
        startMenuEl.style.left = e.clientX;
        const menuHeight = this.calcStartMenuHeight();
        startMenuEl.style.top = e.clientY - menuHeight;
        startMenuEl.style.height = menuHeight;

        document.body.addEventListener('click', this.hideStartMenu);
        startMenuEl.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); });
    };

    hideStartMenu = (e) => {
        const { startMenuEl } = this;
        startMenuEl.style.display = 'none';
    };
}

document.addEventListener('DOMContentLoaded', () => {
    new ss_desktop({
        containerId: 'ss_container',
        startMenuId: 'ss_startMenu',
        startMenuButtonId: 'ss_start_button',
        appsClassName: 'ss_application',
        menuItemsClassName: 'ss_startMenuItem'
    });
});
