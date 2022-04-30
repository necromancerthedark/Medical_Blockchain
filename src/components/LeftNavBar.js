import { Link } from "react-router-dom";
import "./LeftNavBar.css";

const LeftNavBar = (props) => {

    const leftNavBarData = [
        {
            title: "Dashboard",
            path: "/",
            cName: "bx bx-grid-alt"
        },

        {
            title: "All Documents",
            path: "/alldocuments",
            cName: "bx bx-coin-stack"
        },

        {
            title: "Shared",
            path: "/shared",
            cName: "bx bx-box"
        },

        {
            title: "Issues",
            path: "/issues",
            cName: "bx bx-list-ul"
        },

        {
            title: "Analytics",
            path: "/analytics",
            cName: "bx bx-pie-chart-alt-2"
        },

        {
            title: "Settings",
            path: "/settings",
            cName: "bx bx-cog"
        },

        {
            title: "Logout",
            path: "/login",
            cName: "bx bx-log-out",
            onclck: props.logoutHandler
        }
    ];


    return (

        <>
            <div className="sidebar">
                <div className="logo-details">
                    <i className='bx bxl-s-plus-plus'></i>
                    <span className="logo_name">SecureMed</span>
                </div>
                <ul className="nav-links">
                    {
                        leftNavBarData.map((data, index) => {
                            return (
                                <li key={index} onClick={data.onclck ? data.onclck : null}>
                                    <a href="#" className="activ">
                                        <Link to={data.path}>
                                            <div>
                                                <i className={data.cName}></i>
                                            </div>
                                            <span className="links_name">{data.title}</span>
                                        </Link>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    );
}

export default LeftNavBar;