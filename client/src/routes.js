import HomePage from "./Pages/HomePage/HomePage";
import ChatPage from "./Pages/Chat/Chat";
const routes = [
    {
        path: "/",
        exact: true,
        name: "Home",
        component: HomePage,
    },
    {
        path: "/chat",
        exact: true,
        name: "Chat",
        component: ChatPage,
    },
];

export default routes;
