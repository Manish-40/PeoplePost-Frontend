
// import { BrowserRouter, Routes,Route } from "react-router-dom";
// import Body from "./components/body";
// import Profile from "./components/profile";
// import Login from "./components/login"
// import { Provider } from "react-redux";
// import appstore from "./utils/appstore";
// import Feed from "./components/Feed";
// import Connections from "./components/Connections";
// import Requests from "./components/Requests";
// import Found from "./components/Found";
// import Post from "./components/Post";
// import Collection from "./components/Collection";
// import Userpost from "./components/Userpost";
// import Chat from "./components/Chat";
// import Overview from "./components/overview";
// import Groupchat from "./components/Groupchat"
// import Group from "./components/group"


// function App() {

//   return (
//     <>
//     <Provider store={appstore}>
//       <BrowserRouter basename="/">
//       <Routes>
//         <Route path="/" element={<Body/>}>
//         <Route path="/" element={<Feed/>}/>
//         <Route path="/profile" element={<Profile/>}/>
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/connections" element={<Connections/>}/>
//         <Route path="/requests" element={<Requests/>}/>
//         <Route path="/found" element={<Found/>}/>
//         <Route path="/posts" element={<Post/>}/>
//         <Route path="/postfeed" element={<Collection/>}/>
//         <Route path="/userpost" element={<Userpost/>}/>
//         <Route path="/chat/:targetUserId" element={<Chat/>}/>
//         <Route path="/found"element={<Found/>}/>
//         <Route path="/overview" element={<Overview/>}/>
//         <Route path="/group/chat" element={<Groupchat/>}/>
//         <Route path="/group" element={<Group/>}/>
//         </Route>
//       </Routes>


//       </BrowserRouter>
//       </Provider>


//       {/* <Navbar/>
//       <h1 className="text-3xl font-bold underline">hello </h1> */}
//     </>
//   )
// }

// export default App


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import appstore from "./utils/appstore";

// import Body from "./components/body";
// import Profile from "./components/profile";
// import Login from "./components/login";
// import Feed from "./components/Feed";
// import Connections from "./components/Connections";
// import Requests from "./components/Requests";
// import Found from "./components/Found";
// import Post from "./components/Post";
// import Collection from "./components/Collection";
// import Userpost from "./components/Userpost";
// import Chat from "./components/Chat";
// import Overview from "./components/overview";
// import Groupchat from "./components/Groupchat";
// import Group from "./components/group";

// function App() {
//   return (
//     <Provider store={appstore}>
//       <BrowserRouter basename="/">
//         <Routes>
//           <Route path="/" element={<Body />}>
//             <Route index element={<Overview />} />
//             <Route path="/feed" element={<Feed />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/connections" element={<Connections />} />
//             <Route path="/requests" element={<Requests />} />
//             <Route path="/found" element={<Found />} />
//             <Route path="/posts" element={<Post />} />
//             <Route path="/postfeed" element={<Collection />} />
//             <Route path="/userpost" element={<Userpost />} />
//             <Route path="/chat/:targetUserId" element={<Chat />} />
//             <Route path="/found" element={<Found />} />
//             <Route path="/overview" element={<Overview />} />
//             <Route path="/group/chat" element={<Groupchat />} />
//             <Route path="/group" element={<Group />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import appstore from "./utils/appstore";

import Body from "./components/body";
import Profile from "./components/profile";
import Login from "./components/login";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Found from "./components/Found";
import Post from "./components/Post";
import Collection from "./components/Collection";
import Userpost from "./components/Userpost";
import Chat from "./components/Chat";
import Overview from "./components/overview";
import Groupchat from "./components/Groupchat";
import Group from "./components/Group";
import Comment from "./components/comment";
import Like from "./components/like";
import Userclick from "./components/Userclick";
import Userpostclick from "./components/Userpostclick";
import Editeducation from "./components/Editeducation";
import Editexperience from "./components/Editexperience";
function AppRoutes() {
  const user = useSelector((store) => store.user); 

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Navigate to="/feed" replace /> 
          : <Navigate to="/login" replace />
        }
      />

      {/* <Route path="/overview" element={<Overview />} /> */}
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Body />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/found" element={<Found />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/postfeed" element={<Collection />} />
        <Route path="/userpost" element={<Userpost />} />
        <Route path="/chat/:targetUserId" element={<Chat />} />
        <Route path="/group/chat" element={<Groupchat />} />
        <Route path="/group" element={<Group />} />
        <Route path="/comment/:targetpostid"element={<Comment/>}/>
        <Route path="/like/:targetpostid"element={<Like/>}/>
        <Route path="/user/:firstname" element={<Userclick/>}/>
        <Route path="/post/user/:targetpostid" element={<Userpostclick/>}/>
        <Route path="/education/:educationid" element={<Editeducation/>}/>
        <Route path="/experience/:experienceid" element={<Editexperience/>}/>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Provider store={appstore}>
      <BrowserRouter basename="/">
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;


