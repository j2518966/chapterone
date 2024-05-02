import Navbar from "./Navbar.tsx";
import InputDisplay from "./InputDisplay.tsx";
import { userData } from "../services/Helper.jsx";

const Home = () => {
    // const userName = userData.userName;

    return (
        <>
            <Navbar />
            <h2> Welcome {userData().username}</h2>
            <InputDisplay />
        </>
    );
};

export default Home