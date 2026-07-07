// ==UserScript==
// @name         Selective Move Disable
// @namespace    http://tampermonkey.net/
// @version      2026-05-02
// @description  Disable move button for specific nations
// @author       Merethin
// @match        https://*.nationstates.net/region=*
// @grant        none
// ==/UserScript==

let nations = ["Merethin", "Strawberry Moon"];

(function() {
    'use strict';

    let nationname = document.querySelector("div.bannernation2").querySelector("a.quietlink").innerText;
    if (nations.includes(nationname)) {
        document.querySelector(`button[name="move_region"]`).remove();
    }
})();