
import { Link} from "react-router-dom";

const Home = ()=>{

    return (
        <div>
            <h1>Home</h1>
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Create account
                </Link>
        </div>
    )
}

export default Home;