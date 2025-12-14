import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import feedReducer from "./feedslice";
import connectionreducer from "./connectionslice"
import requestreducer from "./requestslice";
import postreducer from "./postslice";
import postfeedreducer from "./postfeedslice"
import userpostreducer from "./userpostslice"
import userfoundreducer from "./userfoundslice"
import groupnamereducer from "./groupnameslice"
import commentreducer from "./commnetslice"
import likereducer from "./likeslice"
import editeducationreducer from "./editeducationslice"
import editexperiencereducer from "./editexperienceslice"
import updateexperiencereducer from "./updateexperience"
const appstore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionreducer,
    requests: requestreducer,
    post: postreducer,
    postfeed: postfeedreducer,
    userpost: userpostreducer,
    userfound: userfoundreducer,
    groupname: groupnamereducer,
    comment:commentreducer,
    like:likereducer,
    education:editeducationreducer,
    experience:editexperiencereducer,
    editexperience:updateexperiencereducer,
  },
});

export default appstore;