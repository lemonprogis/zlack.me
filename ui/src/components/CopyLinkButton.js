import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function CopyLinkButton(props) {
    function copyRoomUrl() {
        navigator.clipboard.writeText(window.location.href).then(function() {
            alert('room copied!');
        }, function(err) {
            console.log('unable to copy');
        });
    }

    return (
        <button type="button" class="btn btn-primary" onClick={copyRoomUrl}>
            <FontAwesomeIcon icon={faLink}></FontAwesomeIcon>
        </button>
    )
}

export default CopyLinkButton;