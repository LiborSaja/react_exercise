import "./PersonForm.css";

const PersonForm = ({ firstName, lastName, level, valid, onChange, onAdd }) => {
    return (
        <div className="container d-flex justify-content-center">
            <div className="row w-100 person-form">
                <h5 className="text-center pb-3">Add to the team:</h5>
                <div className="col-md-3 mb-2">
                    <input
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        onChange={onChange}
                        value={firstName}
                        className="form-control"
                    />
                </div>
                <div className="col-md-3 mb-2">
                    <input
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        onChange={onChange}
                        value={lastName}
                        className="form-control"
                    />
                </div>
                <div className="col-md-3 mb-2">
                    <select
                        aria-label="Default select example"
                        className="form-select"
                        name="level"
                        value={level}
                        onChange={onChange}>
                        <option value="">Select a level:</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
                <div className="col-md-2 mb-2">
                    <button
                        className="btn btn-primary"
                        disabled={!valid}
                        onClick={onAdd}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonForm;
