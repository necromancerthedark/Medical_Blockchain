import "./Card.css";


const Card = (props) => {

    return (
        <div className="box">
            <div className="box-topic">{props.title}</div>
            <div className="number">{props.subtitle}</div>
            {/* <div className="indicator">
                <i className='bx bx-up-arrow-alt'></i>
                <span className="text">Up from yesterday</span>
            </div> */}
            {/* <i className='bx bx-cart-alt cart'></i> */}
        </div>
    );
}

export default Card;