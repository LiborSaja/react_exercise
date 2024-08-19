import "./PersonList.css";

const PersonList = ({ data, onDelete }) => {
    return (
        <div className="container">
            <h5 className="text-center text-light pb-3">Your team:</h5>
            <div className="list mx-auto">
                {data.map((item) => {
                    return (
                        <div
                            className="item d-flex justify-content-between align-items-center p-1 mb-2 rounded"
                            key={item.id}>
                            <span className="item-text">
                                {item.firstName} {item.lastName} / {item.level}
                            </span>
                            <button
                                className="btn btn-danger btn-sm ml-2 delete-button"
                                onClick={() => onDelete(item.id)}>
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PersonList;
