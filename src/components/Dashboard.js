import "./Dashboard.css"
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import MyLoginPage from "./MyLoginPage";
import TableRow from "./TableRow";
import Card from "./Card";

const Dashboard = () => {

    const dummyData = [
        { "id": 1, "date": "25 Feb 2022", "username": "Test User", "purpose": "Routine Checkup", "status": "Pending", "isShared": false },
        { "id": 2, "date": "25 Feb 2022", "username": "Test User", "purpose": "Routine Checkup", "status": "Pending", "isShared": true },
        { "id": 3, "date": "25 Feb 2022", "username": "Test User", "purpose": "Routine Checkup", "status": "Pending", "isShared": false },
        { "id": 4, "date": "25 Feb 2022", "username": "Test User", "purpose": "Routine Checkup", "status": "Pending", "isShared": true },
        { "id": 5, "date": "25 Feb 2022", "username": "Test User", "purpose": "Routine Checkup", "status": "Pending", "isShared": false },
        { "id": 6, "date": "25 Feb 2022", "username": "Test User", "purpose": "Routine Checkup", "status": "Pending", "isShared": false }
    ];

    const [seedRowsData, setSeedRowsData] = useState(dummyData);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [user, loading, error] = useAuthState(auth);

    const findWithAttr = (array, attr, value) => {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    const onShareHandler = (data) => {
        const index = findWithAttr(seedRowsData, "id", data.id);
        console.log("onShareHandler() runs");
        console.log("Index to be shared = ", index);
        const temp = [...seedRowsData];
        temp[index].isShared = !temp[index].isShared;
        setSeedRowsData(temp);
        console.log(data);
    };


    useEffect(() => {
        if (loading) return;
        if (!user) {
            console.log("Not Logged In");
        }
        else {
            console.log("Already Logged In ", user.name);
        }
    }, [user, loading]);



    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('File', selectedFile);
    }

    const collapse = () => {
        let sidebar = document.querySelector(".sidebar");
        console.log("hii", sidebar);
        let sidebarBtn = document.querySelector(".sidebarBtn");
        sidebarBtn.onclick = function () {
            sidebar.classList.toggle("active");
            if (sidebar.classList.contains("active")) {
                sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
            } else
                sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }

    return (
        <div>
            {user ?
                <>
                    <section className="home-section">
                        <nav>
                            <div className="sidebar-button">
                                <i onClick={collapse} className='bx bx-menu sidebarBtn'></i>
                                <span className="dashboard">Dashboard</span>
                            </div>
                            <div className="search-box">
                                <input type="text" placeholder="Search..." />
                                <i className='bx bx-search'></i>
                            </div>

                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.email}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><a className="dropdown-item" href="#">Logout</a></li>
                                    <li><a className="dropdown-item" href="#">Help</a></li>
                                </ul>
                            </div>
                        </nav>

                        <div className="home-content">
                            <div className="overview-boxes">
                                <Card title={"Total Documents"} subtitle={16} />
                                <Card title={"Shared Documents"} subtitle={4} />
                                <Card title={"Other"} subtitle={10} />
                            </div>

                            <div className="sales-boxes">
                                <div className="recent-sales box">
                                    <div className="title">Recent Documents</div>
                                    <div className="sales-details">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Date</th>
                                                    <th>Shared To</th>
                                                    <th>Purpose</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    seedRowsData.map((row) => {
                                                        return <TableRow key={row.id} data={row} onShareHandler={onShareHandler} />
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="button">
                                        <a href="#">See All</a>
                                    </div>
                                </div>

                                <div className="upload-records">
                                    <h3>Upload Records</h3>
                                    <input type="file" name="file" onChange={changeHandler} />
                                    {isSelected ? (
                                        <div>
                                            <p>Filename: {selectedFile.name}</p>
                                            <p>Filetype: {selectedFile.type}</p>
                                            <p>Size in bytes: {selectedFile.size}</p>
                                            <p>
                                                lastModifiedDate:{' '}
                                                {selectedFile.lastModifiedDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                    ) : (
                                        <p>Select a file to show details</p>
                                    )}
                                    <div>
                                        <button onClick={handleSubmission}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </> : <MyLoginPage />
            }

        </div>
    );
};
export default Dashboard;