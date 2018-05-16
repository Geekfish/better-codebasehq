function listenForClicks() {
    let button = document.getElementById('hide-mini-events-button');

    button.addEventListener("click", (e) => {
        function hideMiniEvents(tabs) {
            console.log("Sending message...");
            browser.tabs.sendMessage(tabs[0].id, {
                command: "hide-mini-events",
            });
        }

        function reportError(error) {
            console.error(`Something went wrong: ${error}`);
        }

        browser.tabs.query({active: true, currentWindow: true})
            .then(hideMiniEvents)
            .catch(reportError);
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(
        `Failed to execute codebase utils content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/utils.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
