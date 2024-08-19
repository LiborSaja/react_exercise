import { useState } from "react";
import PersonList from "./components/PersonList/PersonList";
import PersonForm from "./components/PersonForm/PersonForm";
import rawData from "./PersonData.json";
import Toggler from "./components/Toggler/Toggler";
import TaskManagement from "./components/TaskManagement/TaskManagement";
import "./App.css";

const App = () => {
    const initialPersons =
        rawData.persons && rawData.persons.length > 0 ? rawData.persons : [];

    const [listOfPersons, setListOfPersons] = useState(initialPersons);
    const [valid, setValid] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const [newPerson, setNewPerson] = useState({
        id:
            listOfPersons.length > 0
                ? Math.max(...listOfPersons.map((person) => person.id)) + 1
                : 1,
        firstName: "",
        lastName: "",
        level: "",
    });

    const handleDelete = (idToDel) => {
        const temp = listOfPersons.filter((person) => person.id !== idToDel);
        setListOfPersons(temp);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedPerson = { ...newPerson, [name]: value };
        setNewPerson(updatedPerson);
        validateData(updatedPerson);
    };

    const validateData = (person) => {
        if (
            person.firstName === "" ||
            person.lastName === "" ||
            person.level === ""
        ) {
            setValid(false);
        } else {
            setValid(true);
        }
    };

    const handleAdd = () => {
        setListOfPersons((prevList) => [...prevList, newPerson]);
        setNewPerson({
            id: newPerson.id + 1,
            firstName: "",
            lastName: "",
            level: "",
        });
        setValid(false);
    };

    const handleChoose = (name) => {
        switch (name) {
            case "list-of-persons":
                setActiveTab(1);
                break;
            case "tasks-management":
                setActiveTab(2);
                break;
            default:
                break;
        }
    };

    return (
        <div className="main-cont">
            <div className="toggler-cont">
                <h1 className="text-center pb-3">App for handling projects</h1>
                <h4 className="text-center">Toggle view</h4>
                <Toggler onChoose={handleChoose} active={activeTab} />
            </div>
            <div className="content-cont">
                {activeTab === 1 && (
                    <div className="container">
                        <PersonList
                            data={listOfPersons}
                            onDelete={handleDelete}
                        />
                        <PersonForm
                            firstName={newPerson.firstName}
                            lastName={newPerson.lastName}
                            level={newPerson.level}
                            valid={valid}
                            onChange={handleChange}
                            onAdd={handleAdd}
                        />
                    </div>
                )}
                {activeTab === 2 && (
                    <div className="container">
                        <TaskManagement persons={listOfPersons} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
