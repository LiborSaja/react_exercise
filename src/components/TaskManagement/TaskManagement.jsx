import React, { useState, useEffect, useCallback } from "react";
import "./TaskManagement.css";

function TaskManagement({ persons }) {
    const [rows, setrows] = useState("");
    const [timeLimit, setTimeLimit] = useState("");
    const [canSchedule, setCanSchedule] = useState(false);

    const countSeniors = useCallback(() => {
        return persons.filter(
            (person) => person.level.toLowerCase() === "senior"
        ).length;
    }, [persons]);

    const countJuniors = useCallback(() => {
        return persons.filter(
            (person) => person.level.toLowerCase() === "junior"
        ).length;
    }, [persons]);

    const calculateWorkCapacity = useCallback(() => {
        const totalCapacityPerHour = persons.reduce((sum, person) => {
            return sum + (person.level.toLowerCase() === "junior" ? 100 : 200);
        }, 0);
        return totalCapacityPerHour;
    }, [persons]);

    const checkIfCanSchedule = useCallback(() => {
        if (parseFloat(rows) > 0 && parseFloat(timeLimit) > 0) {
            const totalCapacity =
                calculateWorkCapacity() * parseFloat(timeLimit);
            setCanSchedule(totalCapacity >= parseFloat(rows));
        } else {
            setCanSchedule(false);
        }
    }, [rows, timeLimit, calculateWorkCapacity]);

    useEffect(() => {
        checkIfCanSchedule();
    }, [rows, timeLimit, persons, checkIfCanSchedule]);

    const scheduleTask = () => {
        if (canSchedule) {
            alert("The task has been successfully planned!");
            resetInputs(); // Po naplánování úkolu resetujeme vstupní pole
        }
    };

    const resetInputs = () => {
        setrows("");
        setTimeLimit("");
        setCanSchedule(false); // Reset stavu pro plánování úkolu
    };

    return (
        <div className="task-management-container">
            <div className="text-center border rounded pb-2">
                <h5 className="pt-3">Employee requirements</h5>
                <p>Junior: 100 rows/day</p>
                <p>Senior: 200 rows/day</p>
            </div>
            <div className="task-info mb-3 border rounded">
                <h5 className="text-center pt-3">Actual stats</h5>
                <p className="text-center">
                    Number of juniors: {countJuniors()}
                </p>
                <p className="text-center">
                    Number of seniors: {countSeniors()}
                </p>
                <p className="text-center">
                    Production per day: {calculateWorkCapacity()} rows/day
                </p>
            </div>
            <div className="task-management-form row justify-content-center align-items-center">
                <h5 className="text-center pb-2">Task scheduling</h5>
                <div className="col-md-3 mb-2">
                    <input
                        type="number"
                        min="0"
                        placeholder="Required lines of code"
                        value={rows}
                        onChange={(e) => setrows(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-3 mb-2">
                    <input
                        type="number"
                        min="0"
                        placeholder="Time limit [days]"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-3 mb-2">
                    <button
                        className="btn btn-primary w-100"
                        onClick={scheduleTask}
                        disabled={!canSchedule}
                        style={{
                            backgroundColor: canSchedule ? "green" : "red",
                        }}>
                        Schedule
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskManagement;
