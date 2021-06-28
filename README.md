# <img src="/frontend/public/favicon.ico" width="25" height="25"> Welcome to Songaku!

[Songaku](https://songaku.herokuapp.com/), a [SoundCloud](https://soundcloud.com/) inspired project, is an audio streaming/sharing website that allows users to upload and listen to music through its database. Logged in users can create their own playlists as well as comment on, like, and organize music in the existing database of music. Non-logged in users can still listen to music on the site, as well as see any songs, albums, playlists, likes, and/or comments.

### **Live Link: [Songaku](https://songaku.herokuapp.com/)**

## Starting Development
- Check out the [Wiki](https://github.com/brentarimoto/Songaku/wiki) Documentation for more details on features and API documentation!

## Technologies 
#### Front-End
- React (ReactPlayer, React Slider, React-Spinners)
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
 - User session authentication/authorization handled using bcryptjs for hashing
 - Authorized users granted access to creating, editing, and deleting songs, albums, comments, likes, and playlsts.
 - Unauthorized users will be able to view but not interact with all songs, albums, comments, likes, and playlists.
 - User can search for songs through the searchbar, and are offered some suggestions of top liked songs.

## Challenges
 - The organization of the database, and the limited timeframe were definitely the most difficult factors 
 - Another challenge was developing a clean format so as to be able to comeback to the code at another point in time and easily see any issues.

## Code Highlights

<img src='https://brentarimotoprojects.s3.us-west-1.amazonaws.com/Songaku.gif'>

## Future Implementations
 - Plans for creating options to edit the User Account will come first
 - Cleaner implementation of existing code (including CSS)
 - Further implementation of suggested songs specific to each user.
 - User to user interaction via messages, follows, etc.
