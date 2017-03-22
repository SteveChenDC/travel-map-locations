# travel-map-locations

The travel map allows users to input locations and notes to store an electronic copy of the world they understand and aspire to learn more regarding.  By selecting locations on the map, a user can create a custom collection of locations.   Each location has the ability to contain notes.  The notes can be personalized as a scrap book to reminisce or as a folder of dreams.  
 
# Travel Map of Locations

## Background:
I dream of visiting places, getting out of Ohio, and learning more about the world through experience.  For my project during the Thinkful course, I found the opportunity to dream and enjoy understanding the world as a nice break from the strain of learning to code.  I have previously worked with Google Maps and one of my friends and freelance mentors currently works on weather map functionality.  I enjoy the opportunity to learn from very good google maps examples and documentation.  

## Expectations:
Thinkful Full Stack Web Development includes a section on front end and server side development courses.  For this capstone, pairing one's understanding of the front end while persisting and interacting with that data was required.  CRUD functionality to the data was necessary by the course description.  



## Use Case:
The use cases for this project included the following:
- As a user, I can add a pin to the map.
- As a user, I can add notes to a map.
- As a user, I expect to view pins on the map.  
- As a user, I expect to update information to a map's notes.
- As a user, I expect to delete a pin.

All of the user stories from epic to might have are included in the following gist, along with images of the workflow and mockups of the page: https://gist.github.com/talta/2f82d849f8b63fd78badba1cb449280f



## Initial UX:
The user experience of the pin map project includes interacting with the map as first and foremost.  Secondary is interating with a specific location on the map.  As a bonus, the pin map allows the user to return to the site and view their previous collections of locations and notes through use of a cookie.  



## Functionality:
- display a map
- store a cookie for the returning and new users
- allow the user to create locations by selecting a spot on the map
- allow the user to update the location to contain notes
- allow the user to delete a previously placed location on the map



## Working Prototype:
The working application can be viewed on the heroku server: https://lit-retreat-41899.herokuapp.com/


## Technical:
- Javascript
- Node.js
- Bootstrap.css
- JQuery
- Google Maps
- Client Cookie
- Heroku
- travis.CI
- various dev tools


## Lessons Learned:
- Version control:
Using version control across multiple branches proved to be a roadblock for my completion of this project.  Yet, this project forced me to learn more about the utilization, breath and foundation of Git.  While reaching out for resources and assistance, I have a new appreciation for Git, version control and dev ops.  While I may be stumbling on the basics of controlling versions, I believe that a strong foundation can be built into a strength.  I look forward to learning more about dev ops, including Git utlization.  
- Google Maps:
Google has great documentation and support for their APIs.  I built upon my previous knowledge of Google Maps, and elaborated on control of the views.  
- Server side development:
I find that I am well suited for interacting with the server side of development.  My previous development experience with Filemaker and SQL practice at my current 9-5 role allowed me to have a strong foundation when working with the server.  I look forward to learning more about the possibilities of Server-side development.  Furthermore, I look forward to learning about the different technologies which allow one to interact with the Server.  I am impressed with the support for Google's Node.JS.  
- Testing:
I have previously fulfilled QA roles at my corporate IT job, yet I have not previously written automated tests.  I found that I enjoyed automated testing, see the benefit, and would like to do more.  There are intricies and bugs within testing software, yet I find that I feel comfortable with creating test cases and understanding the implementation of tests.  
- Dev Ops:
Another area that I feel comfortable and would like to practice more included development operations.  While it may not be the most glamorous duty, working with server side code turned me on to the necessity of dev ops.  
- JQuery Fallbacks:
JQuery, although a tool which is taught heavily and relied upon often, it seems that more and more discussions have a negative opinion of JQuery.  I see the benefit of interacting with the DOM, yet during the execution of this project, I found myself saying, 'There has got to be a better way'.  I look forward to learning more about 

## Development Roadmap:
Development began from API CRUD functions and interacting with the database.  Getting the locations to populate as text on the page was the next step.  Furthermore, connecting the client's state to the database bridged the gap into the history with the client work.  Interacting with google maps, displaying and allowing the user to enact CRUD functions rounded out the development.  

## Vision:
I would like to elaborate on the current funtionality of the pin map in order to better utilize myself.  
- allow the user to search for a location and create a location from a search bar
- have the address be the closest city utilizing the google places API
- custom marker images for category of past, present or future