"use strict";

let env = "PROD";

// FREE API TIER

// API SETUP
const API_KEY = "vtDayoepboQ2nI3wiMC9JX1m3pDRavZm";
const URL =
    "https://api.giphy.com/v1/gifs/translate";


// QUERY SELECTORS
const container = document.querySelector("#container");
const btnFetch = document.querySelector("#btnFetch");
const giphyForm = document.querySelector("#giphyForm");
const giphyResult = document.querySelector("#giphyResult");
const img = document.querySelector('#img');

// FUNCTIONS
const renderResult = function (result) {
    let src = result.data.images.original.url;
    img.src = src;
};
//
const renderError = function (result) {
    const markup = `<p>Error in query. Error: ${result.message}</p>`;
    giphyResult.insertAdjacentHTML("beforeend", markup);
};
//
const fetchData = async function (url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        renderResult(json);
    } catch (error) {
        console.error(error.message);
        renderError(error);
    }
};

const formSubmit = function (form, submitter) {
    let obj = {};
    const formData = new FormData(form, submitter);
    for (const [key, value] of formData) {
        obj[key] = value;
    }
    return obj;
};

// EVENT LISTENERS
giphyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = formSubmit(giphyForm, btnFetch);
    const searchTerm = data.searchTerm;
    if (searchTerm === "") {
        console.log(`No value given`);
    } else {
        const callPath = `${URL}?key=${API_KEY}&s=${searchTerm}`;
        if (env === "TEST") {
            console.log(`test environment: ${env}`);
        } else {
            fetchData(callPath);
            giphyForm.reset();
        }
    }
});