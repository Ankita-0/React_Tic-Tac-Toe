import { useState } from "react";
export default function Player({ initialName, symbol, onNameChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [player_Name, setPlayerName]=useState(initialName);
    let button = "Edit";

    let editablePlayerName = <span className="player-name">{player_Name}</span>;

    function handleClick() {
        setIsEditing(editable => !editable);
    }

    function handleNameChange(e){
        setPlayerName(e.target.value);
    }

    if(isEditing){
        editablePlayerName=<input type="text" required value= {player_Name} onChange={()=>onNameChange(symbol, setPlayerName)}></input>
    }
    return (
        <li>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}