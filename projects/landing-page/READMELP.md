# Landing Page Project

## Table of Contents

* Index.HTML
* style.css
* app.js

## Landing page
This project is a multisection landing page, with a dynamically created navigation menu.
This project demonstrates following functionalities:
 - Dynamic Navigation menu, which updates based on sections in the page.
 - Distinguishing section closest to the viewport.
 - Clicking on navigation menu scrolls to corresponding section of the page.
 - When section is in the viewport, corresponding navigation menu highlights or looks activated.
 - Navigation bar is hidden when not scrolling.
 - "Scroll To Top" button, which is only visible below the page fold.

## Index.html
Main landing page, which has sections, navigation menu and all of the UI Code.

Linked javascript file and changed active class name for sections.

## Style.css
Stylesheet for landing page project.

- Updated section active class.
- Added menu__link__active class, to activate/highlight menu links when on section of a pge.
- Added hideNav class to hide Navigation Bar and updated Page__header class for smooth transition from show/hide navigation bar.
- Added css class topButton and css for button id(#topBtn) for "Scroll To Top" functionality.

## app.js
Javascript file which contains, event listeners and various javascript functions for Landing Page project.

- Added event listener for "DOMContentLoaded" which call function "createNavigationMenu" to create navigation menu.
- Added event listener for scrolling which calls function "scrollSection".
- Added function "menuLinkOnClick" for menu link click, scroll to appropriate section.
- Added function "scrollTopClick" for "ScrollToTop" button click, which scrolls to top of the page when clicked.
- Added function "isCloseToViewPort" which checks if a section is closeset to the viewport.
- Added function "activeSection" which adds active class when closeset to the top of the viewport.
- Added function "activeLink" which activates/highlights appropriates links when scrolled to a section.
- Added function "isNotScrolling" which checks if scrolling has stopped and hides Navigation bar.
