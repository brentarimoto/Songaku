# <img src="public/favicon.ico" width="25" height="25"> Welcome to GoodGamesGG!

[Songaku](https://songaku.herokuapp.com/), a [SoundCloud](https://soundcloud.com/) inspired project, is an audio streaming/sharing website that allows users to upload and listen to music through its database. Users can signup/login to create their own playlists, comment on, like, and organize music in the existing database of music.

### **Live Link: [GoodGamesGG](https://songaku.herokuapp.com/)**

## Starting Development
- Check out the [Wiki](https://github.com/brentarimoto/Songaku/wiki) Documentation for more details on features and API documentation!

## Technologies 
#### Front-End
- React
- Redux
- Javascript
- HTML
- CSS
- Heroku Server

#### Back-End
- PostgreSQL: Database
- ExpressJs: Express session
- Bcrypt: User Authentication
- Faker: Populate data into database
- Sequelize: Manage Database

## Features
 - User session authentication/authorization handled using bcryptjs for hashing and Express session for cookie generation
 - Authorized users granted access to creating and editting ratings/reviews.
 - Authorized users are able to create custom libraries and add games to it.
 - Uses AJAX to filter games in game page asynchronously

## Challenges
 - We initially had alot of issues with unseeding our database, running into foreign key constraints. The issue stemmed from us manipulating our database via dotenv instead of just sequelize locally, and there were certain practices we had to do differently.
 - We initially had alot of CSS issues, making sure our pages didn't inherit any styles we didn't want it to. We also needed to make our website responsive to different screen sizes.

## Code Highlights

<img src='/wiki/demoGif.gif'>

## Future Implementations
 - AJAX implementation for adding to libraries in Mygames page
 - Search bar to search across all models
 - Having genres on each game to give users more preference options
 - Displaying an accounts page with user information
