// ==UserScript==
// @name         autoclose-poll
// @namespace    http://tampermonkey.net/
// @version      2025-07-17
// @description  select and focus a certain option on a poll and autoclose after you've voted on it
// @author       Merethin
// @match        https://www.nationstates.net/*page=poll/p=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nationstates.net
// @grant        window.close
// ==/UserScript==

// Set this to the option you want to select.
// First choice is 0, second choice is 1, third choice is 2, etc...
const option = 0;

(function() {
    'use strict';

    if(document.querySelector(".info") != null)
        window.close();
    else
        document.querySelectorAll("input[type='radio']")[option].checked = true;
        document.querySelector("button[name='poll_submit']").focus();
})();
