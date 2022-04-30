import "./MyButton.css";

const MyButton = (props) => {
    return (
        <>
            <button onClick={props.onClick}
            id = {props.id}
            className = {props.className}>
                {props.text}
            </button>
        </>
    );
};

export default MyButton;