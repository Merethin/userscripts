// ==UserScript==
// @name         Arbitrary Census Scales
// @version      2026-03-23
// @description  Show graphs for any census scales at once
// @author       Merethin
// @match        https://www.nationstates.net/*detail=trend*
// @grant        none
// ==/UserScript==

let userAgent = ""; // Set main nation name here

async function fetchCensusData(nation, scale) {
    console.log(`Fetching census data: ${nation}, ${scale}`);

    let response = await fetch(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${nation}&q=name+census&scale=${scale}&mode=history&script=Arbitrary_Census_Scales__by_Merethin__usedBy_${userAgent}`);
    const xmlString = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "text/xml");
    const points = xml.querySelectorAll("POINT");
    const data = [];

    points.forEach(point => {
        const timestamp = parseInt(point.querySelector("TIMESTAMP").textContent, 10);
        const score = parseFloat(point.querySelector("SCORE").textContent);
        data.push([timestamp * 1000, score]);
    });

    const name = xml.querySelector("NAME").textContent;
    return [name, data];
}

function getChart() {
    if (window.Highcharts && Highcharts.charts.length) {
        const chart = Highcharts.charts.find(c => c);
        if (chart) {
            return chart;
        }
    }

    return null;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function deleteScale(label) {
    let chart = getChart();
    if(!chart) {
        console.log("Error: Could not get chart!");
        return;
    }

    for(var i = chart.series.length - 1; i > -1; i--) {
        if(chart.series[i].name == label) {
            chart.series[i].remove();
            break;
        }
    }
}

async function addScaleToChart(nation, scale, scaleName) {
    if(nation.length == 0) return;
    let [name, data] = await fetchCensusData(nation, scale);
    if(data.length == 0) return;

    let label = `${scaleName} (${name})`;

    let [lastPointX, lastPointY] = data[data.length - 1];
    data[data.length - 1] = { x: lastPointX, y: lastPointY, dataLabels: {
            enabled: true,
            formatter: function() {
                return "<span style=\"font-weight: bold; color:" + this.series.color + "\">" + label + "</span>";
            }
        }
    };

    let chart = getChart();
    if(!chart) {
        console.log("Error: Could not get chart!");
        return;
    }

    getChart().addSeries({
        name: label,
        data: data,
        color: getRandomColor()
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = `Remove: ${label}`;
    deleteBtn.classList.add("button", "danger");
    deleteBtn.onclick = () => {
        deleteScale(label);
        deleteBtn.remove();
    };

    document.getElementById("remove-container").appendChild(deleteBtn);
}

(function() {
    'use strict';

    if (userAgent.length == 0) {
        alert("Set your user agent in the script first!");
        return;
    }

    let injectedDiv = document.createElement("div");
    injectedDiv.style.textAlign = "center";
    injectedDiv.innerHTML = `<p>
    <span class="smalltext">Compare Arbitrary Scales:</span>
    <input type="text" size="28" maxlength="66" name="chartscalenation" id="chartscalenation" placeholder="Select Nation..." class="ui-autocomplete-input" autocomplete="off">
    <select id="chartscaleselector" class="button">
    <option value="0" selected>Civil Rights</option>
    <option value="1">Economy</option>
    <option value="2">Political Freedom</option>
    <option value="3">Population</option>
    <option value="89">Accessibility</option>
    <option value="53">Authoritarianism</option>
    <option value="85">Average Disposable Income</option>
    <option value="72">Average Income</option>
    <option value="73">Average Income of Poor</option>
    <option value="74">Average Income of Rich</option>
    <option value="67">Averageness</option>
    <option value="79">Black Market</option>
    <option value="31">Business Subsidization</option>
    <option value="64">Charmlessness</option>
    <option value="40">Cheerfulness</option>
    <option value="6">Compassion</option>
    <option value="42">Compliance</option>
    <option value="51">Corruption</option>
    <option value="77">Crime</option>
    <option value="55">Culture</option>
    <option value="5">Death Rate</option>
    <option value="46">Defense Forces</option>
    <option value="7">Eco-Friendliness</option>
    <option value="48">Economic Freedom</option>
    <option value="76">Economic Output</option>
    <option value="56">Employment</option>
    <option value="63">Environmental Beauty</option>
    <option value="88">Food Quality</option>
    <option value="78">Foreign Aid</option>
    <option value="50">Freedom From Taxation</option>
    <option value="27">Government Size</option>
    <option value="39">Health</option>
    <option value="68">Human Development Index</option>
    <option value="45">Ideological Radicality</option>
    <option value="37">Ignorance</option>
    <option value="71">Inclusiveness</option>
    <option value="33">Income Equality</option>
    <option value="16">Industry: Arms Manufacturing</option>
    <option value="10">Industry: Automobile Manufacturing</option>
    <option value="12">Industry: Basket Weaving</option>
    <option value="18">Industry: Beverage Sales</option>
    <option value="24">Industry: Book Publishing</option>
    <option value="11">Industry: Cheese Exports</option>
    <option value="22">Industry: Furniture Restoration</option>
    <option value="25">Industry: Gambling</option>
    <option value="13">Industry: Information Technology</option>
    <option value="21">Industry: Insurance</option>
    <option value="20">Industry: Mining</option>
    <option value="14">Industry: Pizza Delivery</option>
    <option value="23">Industry: Retail</option>
    <option value="19">Industry: Timber Woodchipping</option>
    <option value="15">Industry: Trout Fishing</option>
    <option value="65">Influence</option>
    <option value="52">Integrity</option>
    <option value="36">Intelligence</option>
    <option value="86">International Artwork</option>
    <option value="30">Law Enforcement</option>
    <option value="44">Lifespan</option>
    <option value="34">Niceness</option>
    <option value="9">Nudity</option>
    <option value="61">Obesity</option>
    <option value="47">Pacifism</option>
    <option value="87">Patriotism</option>
    <option value="38">Political Apathy</option>
    <option value="69">Primitiveness</option>
    <option value="75">Public Education</option>
    <option value="29">Public Healthcare</option>
    <option value="57">Public Transport</option>
    <option value="60">Recreational Drug Use</option>
    <option value="32">Religiousness</option>
    <option value="80">Residency</option>
    <option value="35">Rudeness</option>
    <option value="43">Safety</option>
    <option value="70">Scientific Advancement</option>
    <option value="17">Sector: Agriculture</option>
    <option value="26">Sector: Manufacturing</option>
    <option value="62">Secularism</option>
    <option value="8">Social Conservatism</option>
    <option value="49">Taxation</option>
    <option value="58">Tourism</option>
    <option value="4">Wealth Gaps</option>
    <option value="59">Weaponization</option>
    <option value="41">Weather</option>
    <option value="28">Welfare</option>
    <option value="66">World Assembly Endorsements</option>
    <option value="54">Youth Rebelliousness</option>
    </select>
    <button class="button icon add" id="chartscalesubmit">Add to Chart</button></p>
    <div id="remove-container"></div>`;

    let button = injectedDiv.querySelector("button#chartscalesubmit");
    button.onclick = async () => {
        let name = injectedDiv.querySelector("input#chartscalenation").value;
        let dropdown = injectedDiv.querySelector("select#chartscaleselector");
        let scale = dropdown.value;
        let scaleName = dropdown.options[dropdown.selectedIndex].innerText;

        await addScaleToChart(name, scale, scaleName);
    };

    document.querySelector("div#content").appendChild(injectedDiv);
})();
