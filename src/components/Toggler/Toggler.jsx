import "./Toggler.css";

const Toggler = ({ onChoose, active }) => {
    const handleClick = (e) => {
        onChoose(e.target.name);
    };

    return (
        <div className="container">
            <button
                className={`toggler-btn ${active === 1 ? "active" : ""}`}
                onClick={handleClick}
                name="list-of-persons">
                List of Programmers
            </button>
            <button
                className={`toggler-btn ${active === 2 ? "active" : ""}`}
                onClick={handleClick}
                name="tasks-management">
                Planning table
            </button>
        </div>
    );
};

export default Toggler;
