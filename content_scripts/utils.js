(function() {
    /**
    * Check and set a global guard variable.
    * If this content script is injected into the same page again,
    * it will do nothing next time.
    */
    if (window.cbUtilsHasRun) {
        return;
    }
    window.cbUtilsHasRun = true;

    function hideMiniEvents() {
        let miniEvents = document.getElementsByClassName('ThreadChanges');
        Array.from(miniEvents).forEach(function (elm) {
            elm.classList.add('hidden');
        });
    }

    browser.runtime.onMessage.addListener((message) => {
        console.log("Listener Added!");
        if (message.command === "hide-mini-events") {
            hideMiniEvents();
        }
    });
})();
