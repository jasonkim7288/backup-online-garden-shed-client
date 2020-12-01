<h1 align="center"> Online Garden Shed
</h1>

# Table of Contents

* [R1. Description](#R1.-Description)
  * [Purpose](#Purpose)
  * [Functionality / features](#Functionality-/-features)
  * [Target audience](#Target-audience)
  * [Tech stack](#Tech-stack)
* [R2. Dataflow Diagram](#R2.-Dataflow-Diagram)
* [R3. Application Architecture Diagram](#R3.-Application-Architecture-Diagram)
* [R4. User Stories](#R4.-User-Stories)
* [R5. Wireframes for multiple standard screen sizes](#R5.-Wireframes-for-multiple-standard-screen-sizes)
* [R6. Screenshots of Trello](#R6.-Screenshots-of-Trello)
<br /><br /><br />

# R1. Description
## Purpose
Online Garden Shed is for improving your gardening skills by keeping track of a plant's growth history and learning from other gardeners' experiences. It also provides a way for gardeners to be a part of a much bigger community by bringing their records and experiences online. By having access to the online garden sheds and setting up notifications, gardeners can be more actively involved in their gardening community not restricted by their location.

## Functionality / features
**Storing plants history**: By allowing users to keep a history of their plants, it will help them and others to have greater success when it comes to growing the same plant. Things like soil ph, watering frequency, climate, fertilising, pests, image uploads, etc will all be useful information that a user can see in a plant's history.<br />
**Image uploading**: Through the process of creating and updating a plant record, you're able to upload images at the beginning and as you continue to grow the plant, you can update it with new images showing a plant's progress.<br />
**REST API for plants**: When creating a new plant record, the user will need to specify the correct name. For this purpose, the API will help to easily define the plant's name and some general information about the plant. This will ensure some consistency for users browsing the same plant grown from different garden sheds.<br />
**Browsing other garden sheds**: Not only can a user look over their plant records, but they can view other garden shed records provided they've been made public.
**Following other garden sheds**: A user can follow other garden sheds and have a quick access menu to those sheds and also set up email notification of any updates to anything within a specific shed they follow.<br />
**Following plants**: A user can follow a specific plant instead of a garden shed. This means they will see the same plant grown by many different garden sheds.<br />
**Authentication and authorization**: Google OAuth will be implemented for easy authentication and authorisation.<br />
**Email notifications**: A user can receive email notifications on different updates, like any within a garden shed, or a specific plant that they follow.

## Target audience
* It is suitable for everyone, but particularly for those interested in gardening and especially anyone who is either a beginner and needs guidance and examples to follow or someone with more experience who wants to keep their own records and share them with the gardening community.

## Tech stack
* Mongo DB: Database to store user authentication information and plants growth history
* Express JS: Back-end web application framework
* React JS: Front-end web application library
* Node JS: JavaScript runtime environment
* AWS S3 Bucket or Cloudinary: Cloud storage for holding the plant images
* react-google-login: Node module for Google OAuth login process in React JS
* google-auth-library: Node module for Google OAuth login process in Express JS
* jwt: Node module for the authentication communication between React JS and Express JS
* nodemailer: Node module for sending email notifications

[Go back](#table-of-contents)<br /><br /><br />

# R2. Dataflow Diagram
![Data Flow Diagram](docs/DFD_OnlineGardenShed.png)

[Go back](#table-of-contents)<br /><br /><br />

# R3. Application Architecture Diagram
![Application Architecture Diagram](docs/AAD_OnlineGardenShed.png)


[Go back](#table-of-contents)<br /><br /><br />

# R4. User Stories
* As a guest, I want to be able to see other users garden shed plant history without the need of signing up, so I can look around and without any obligations.
* As a user, I want to be able to sign up or log in, so I can create plant history with photos and written logs.
* As a user, I want to create plant history with photos and written logs, so I can maintain the history of a plant's growth.
* As a user, I want to be able to search for plants during the creation of a new plant log, so I can bring up detailed info about that specific plant.
* As a user, I want to be able to browse MY OWN garden shed plant history list, so I can update or delete a specific plant history.
* As a user, I want to be able to update or delete the history of a plant's growth, so I can learn and share previous gardening attempts with myself and for other users.
* As a user, I want to be able to get email notifications when it comes time to water or fertilise the plants, so I can stick to the schedule.
* As a user, I want to be able to search a specific plant, so I can look at the history and follow the progress of a specific plant grown by many garden sheds.
* As a user, I want to be able to follow a specific plant, so I can get email notifications when the plants that I follow are updated.
* As a user, I want to be able to follow other garden sheds, so I can get email notifications when the following garden sheds update any plant history.
* As a user, I want to be able to get email notifications when the garden shed that I am following updates any plant history, so I can keep updated with the progress of any plant records.


[Go back](#table-of-contents)<br /><br /><br />

# R5. Wireframes for multiple standard screen sizes
### Figma web site: https://www.figma.com/file/zXPD2YTybFoBeYqFgF6pu2/Wireframes?node-id=44%3A24
<br />


![Mobile Wireframes](docs/MobileWireframes.png)
![Tablet Wireframes](docs/TabletWireframes.png)
![Desktop Wireframes](docs/DesktopWireframes.png)

[Go back](#table-of-contents)<br /><br /><br />

# R6. Screenshots of Trello

### Trello web site : https://trello.com/b/CYzn0Wex/online-garden-shed
### Day 1 planning
Day 1 was started with making user stories and a trello board.<br />
![Day 1](docs/Trello_2020-11-24.png)

### Day 2
On day 2, we finished writing the description of the website and user stories<br />
25/11/2020
![Day 2](docs/Trello_2020-11-25.png)

### Day 4
On day 4, we finished Dataflow Diagram, Application Archtecture Diagram and Wireframes for Mobile.<br />
![Day 4](docs/Trello_2020-11-30.png)

### Day 5
On day 5, we finished Wireframes for Tablet and Desktop.<br />
![Day 5](docs/Trello_2020-12-01.png)


[Go back](#table-of-contents)<br /><br /><br />
