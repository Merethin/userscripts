// ==UserScript==
// @name         Nation Name Check
// @namespace    http://tampermonkey.net/
// @version      2025-07-28
// @description  check if a nation name is available
// @author       Merethin
// @match        https://*.nationstates.net/*page=boneyard
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationstates.net
// @grant        window.close
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_getValue
// @grant        GM_deleteValues
// ==/UserScript==

(function() {
    'use strict';

    if(document.querySelector("p.info") != null) {
        const name = document.querySelector("input[name='nation']").value;
        GM_setValue(name, "available");
        window.close();
    } else if (document.querySelector("p.error") != null) {
        const name = document.querySelector("input[name='nation']").value;
        GM_setValue(name, "taken");
        window.close();
    }

    const button = document.createElement("button");
    button.innerText = "Download CSV";
    button.onclick = downloadValues;
    document.getElementById("content").appendChild(button);

    function downloadValues() {
        const keys = GM_listValues();
        let data = "";
        for (const key of keys) {
            const value = GM_getValue(key);
            data += `${key},${value}\n`;
        }

        GM_deleteValues(keys);

        const file = new File([data], 'names.csv', { type: 'application/octet-stream' });

        // Export as a CSV file which should be saved to the user's download folder or trigger a save popup
        const objectUrl = window.URL.createObjectURL(file);
        window.open(objectUrl);
    }

})();
