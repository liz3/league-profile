# League Profile
This is a recreation of the League of legends player profile, specifically the overview, match history and match overview.

I didnt know if i wanted to open source this but theres no reason not too.

The Application has two parts, the frontend written in react/redux & styled-component and the backend written in node and mongo, why? idk could have used go but it was faster cuz no typing and stuff. The frontend is the bigger part.

[Official instance](https://lol-profile.com)

**Note**: At the moment [the prod app](https://lol-profile.com) is broken because i wait for the TFT token to be approved, only the league token was approved. Riot...
## Running locally
If you want to run this locally:

Backend:
1. Install docker/docker-compose, node/npm and yarn(`npm i -g yarn`)
2. go into the backend directory and create a file called `.env.dev`
3. in that file post the following: `RIOT_API_TOKEN=DEV_RIOT_API_TOKEN` and `TFT_RIOT_TOKEN`(for tft, when using a development token these can be the same)
4. Run `docker-compose up --build`, that will build and spinup the backend on port 3005

Then Frontend:
1. go into the league-profile folder
2. run `yarn`
3. run `yarn start`, the frontend should open automatically.

## Running in prod mode
This isnt intendent for that so if you wanna you will have to figure that out, but thats not hard.

# License
see LICENSE
