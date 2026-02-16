import profile from "./profile.js"
import matchlist from "./matchlist.js"

export default [
    { path: "/user", handler: profile },
    { path: "/matches", handler: matchlist },
]