import "./TableRow.css";

const TableRow = (props) => {
    const data = props.data;

    const shareBtnHandler = (e) => {
        const confirmToShare = window.confirm(`Are you sure, you want to ${data.isShared ? "Stop Share" : "Share"} ?`)
        if (confirmToShare) {
            props.onShareHandler(props.data);
        }
        else
            console.log("Not Shared");
    }
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.date}</td>
            <td>{data.username}</td>
            <td>{data.purpose}</td>
            <td>{data.status}</td>
            <td><button type="button" onClick={shareBtnHandler} className={`action-btn btn btn-sm ${data.isShared ? "btn-outline-danger" : "btn-outline-primary"}`}>{data.isShared ? "Stop Share" : "Share"}</button></td>
        </tr>
    );
}

export default TableRow;