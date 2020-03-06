/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/


/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
document.addEventListener("DOMContentLoaded", createNavigationMenu);
window.addEventListener("scroll", scrollSection)

// build the nav
function createNavigationMenu(){
  //alert("In Nav Create");
  let ulElm = document.getElementById("navbar__list");
  let sectionElm = document.querySelectorAll("section");
  for (sec of sectionElm) {
    let liElm = document.createElement('li');
    let aElm = document.createElement('a');
    aElm.href = "#"+sec.id;
    aElm.textContent = sec.getAttribute("data-nav");
    aElm.className = "menu__link";
    aElm.addEventListener("click", menuLinkOnClick);
    liElm.appendChild(aElm);
    ulElm.appendChild(liElm);
  }

}

function scrollSection(event) {
  console.log("scrollSection event")
  let elmSections = document.querySelectorAll("section");
  for (sec of elmSections) {
    // isCloseToViewPort(sec);
    //if (sec.id == event.target.location.hash.slice(1)) {
    if (isCloseToViewPort(sec)) {
      activeSection(sec, "#"+sec.id);
    }
    else {
      sec.classList.remove("clsActive");
    }
  }
}

// Add class 'active' to section when near top of viewport
function activeSection(section, linkToActivate)
{
  section.classList.add("clsActive");
  let compStyle = getComputedStyle(section);
  //console.log(style.background);
  activeLink(linkToActivate, compStyle.background);
}

function isCloseToViewPort(elm)
{
  let viewportOffset = elm.getBoundingClientRect();
// these are relative to the viewport, i.e. the window
  let top = viewportOffset.top;
  let left = viewportOffset.left;
  let right = viewportOffset.right;
  let bottom = viewportOffset.bottom;

  console.log(elm.id, top, left);
  // if (top <= 50) {
  if (
	top >= 0 &&
	left >= 0 &&
	right <= (window.innerWidth || document.documentElement.clientWidth) &&
	bottom <= (window.innerHeight || document.documentElement.clientHeight)
) {
    // console.log("Inside ");
    // activeSection(el, "#"+el.id);
    return true;
  }
  else {
    return false;
  }
}

//Set Link as active
function activeLink(linkToActivate, bg) {
  let links = document.querySelectorAll("a");
  for (link of links) {
    //console.log(link.getAttribute("href"));
    if (link.getAttribute("href") == linkToActivate) {
      link.classList.add("menu__link__active");
    }
    else {
      link.classList.remove("menu__link__active");
    }
  }
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click
function menuLinkOnClick(e) {
  const strSec = e.target.hash.slice(1);
  console.log("In CLick Event", strSec);
  e.preventDefault();
  let secToActivate = document.getElementById(strSec);
  secToActivate.scrollIntoView({block: "center"});
  console.log("Before", secToActivate,
    secToActivate.scrollTop, secToActivate.scrollLeft);
}
// Set sections as active
