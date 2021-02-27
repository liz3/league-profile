import profile from "./profile"
import matchlist from "./matchlist"

export default [
    { path: "/user", handler: profile },
    { path: "/matches", handler: matchlist },
]