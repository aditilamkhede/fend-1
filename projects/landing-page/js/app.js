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
var isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

//Check if scrolling has stopped
function isNotScrolling() {
  let navMenu = document.querySelector(".page__header");
  console.log(navMenu);
  //navMenu.style.top = "0";
  navMenu.classList.remove("hideNav");

  // Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {

		// Run the callback
		console.log( 'Scrolling has stopped.' );
    //navMenu.style.top = "-60px";
    navMenu.classList.add("hideNav");

	}, 2000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
document.addEventListener("DOMContentLoaded", createNavigationMenu);
window.addEventListener("scroll", scrollSection);

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
  console.log("scrollSection event");
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  // console.log("scrollSection event", windowHeight, document.documentElement.scrollTop);
  if (document.documentElement.scrollTop > windowHeight) {
    console.log("below page fold");
    document.querySelector(".topButton").style.visibility = "visible";
  }
  else {
    document.querySelector(".topButton").style.visibility = "hidden";
  }
  //Check if scrolling has stoppped
  isNotScrolling();

  let elmSections = document.querySelectorAll("section");
  for (sec of elmSections) {
    if (isCloseToViewPort(sec)) {
      activeSection(sec, "#"+sec.id);
    }
    else {
      sec.classList.remove("clsActive");
      //When no section is active or at the top of the page, remove active menu link class
      if (document.documentElement.scrollTop == 0) {
        let activeLink = document.querySelector(".menu__link__active");
        activeLink.classList.remove("menu__link__active");
      }
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
  const top = viewportOffset.top;
  const left = viewportOffset.left;
  const right = viewportOffset.right;
  const bottom = viewportOffset.bottom;
  // const height = viewportOffset.height;
  // const width = viewportOffset.width;
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

  console.log(elm.id, top, left);
  if (
	top >= -50 &&
	left >= 0 &&
	right <= (windowWidth) &&
	bottom <= (windowHeight)
) {
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

function scrollTopClick() {
  document.documentElement.scrollTop = 0;
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
