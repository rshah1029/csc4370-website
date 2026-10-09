/* theme.js - switches the site between the light and dark colour themes.

   How it works: both style sheets define their colours as CSS variables
   twice, once on :root for the light theme and again inside a class
   called dark_mode for the dark theme. This file does nothing but add
   and remove that one class on the body tag, and the browser recolours
   the whole page. The chosen theme is saved in localStorage so it is
   still there on the next page and on the next visit.
*/


/* Finds the button in the banner and stores it in a variable. */
let theme_toggler = document.querySelector('#theme_toggler');


/* Writes the current theme into localStorage under the name
   website_theme, so the other pages and later visits can read it. */
function save_theme() {
    if (document.body.classList.contains('dark_mode')) {
        localStorage.setItem('website_theme', 'dark_mode');  /* dark is on */
    } else {
        localStorage.setItem('website_theme', 'default');    /* dark is off */
    }
}


/* Changes the words on the button so they describe what the next
   click will do. */
function update_button() {
    if (document.body.classList.contains('dark_mode')) {
        theme_toggler.textContent = 'Light theme';  /* clicking goes back to light */
    } else {
        theme_toggler.textContent = 'Dark theme';   /* clicking switches to dark */
    }
}


/* Reads the saved theme and puts the page into it. Runs as soon as the
   page loads so the theme carries across every page of the site. */
function retrieve_theme() {
    var theme = localStorage.getItem('website_theme');  /* null on a first visit */

    if (theme != null) {
        document.body.classList.remove('default', 'dark_mode');  /* clear both */
        document.body.classList.add(theme);                      /* apply the saved one */
    }

    update_button();                /* make the button text match */
}


/* Runs every time the button is clicked: flips the class, saves the
   new setting, and updates the button text. */
theme_toggler.addEventListener('click', function () {
    document.body.classList.toggle('dark_mode');  /* on if off, off if on */
    save_theme();                   /* remember the choice */
    update_button();                /* make the button text match */
});


/* The storage event fires when another tab changes localStorage, so
   switching the theme in one tab switches it in all the others. */
window.addEventListener('storage', function () {
    retrieve_theme();
}, false);


/* Sets the theme as soon as the page loads. */
retrieve_theme();
