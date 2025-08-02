// ==UserScript==
// @name         Pack #1 Highlighter
// @version      1.0
// @description  Highlight cards with a #1 badge in the world.
// @author       Merethin
// @match        https://*.nationstates.net/*page=deck*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const cards = Array.from(document.querySelectorAll("div.deckcard-container"));
    console.log(cards);
    for(var card of cards) {
        console.log(card);
        for(var badge of Array.from(card.querySelectorAll("img"))) {
            if(badge.src.includes("-1t")) card.classList.add("info");
        }
    }
})();
