import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faMicrophone } from "@fortawesome/free-solid-svg-icons"
import CopyLinkButton from "../components/CopyLinkButton";
import "./room.css";

const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    transform: scale(-1, 1);
    filter: FlipH;
    -webkit-box-shadow: 0px 0px 4px 0px #5c5c5c;
            box-shadow: 0px 0px 4px 0px #5c5c5c;
    padding: 3px;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => ref.current.srcObject = stream);
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}

const VideoWrapper = ({children}) => {
    return (
        <div class="box-shadow">
        {children}
        </div>
    )
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const [micActive, setMicActive] = useState(true);
    const [cameraActive, setCameraActive] = useState(true);
    const socketRef = useRef();
    const userVideo = useRef();
    const userStream = useRef();
    const peersRef = useRef([]);
    const params = useParams();
    const roomID = params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;
            userVideo.current.muted = true;

            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    });
                    peers.push({
                        peerID: userID,
                        peer,
                    });
                });
                setPeers(peers);
            });

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                });
                const peerObj = {
                    peer,
                    peerID: payload.callerID
                };

                setPeers(users => [...users, peerObj]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on("user left", id => {
                const peerObj = peersRef.current.find(p => p.peerID === id);
                if (peerObj) {
                    peerObj.peer.destroy();
                }

                const peers = peersRef.current.filter(p => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
            });
        });
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        });
        
        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        });
        
        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        });

        peer.signal(incomingSignal);

        return peer;
    }

    function muteAudio() {
        setMicActive(!micActive);
        userStream.current.getAudioTracks()[0].enabled = !(userStream.current.getAudioTracks()[0].enabled);
    }

    function muteVideo() {
        setCameraActive(!cameraActive);
        userStream.current.getVideoTracks()[0].enabled = !(userStream.current.getVideoTracks()[0].enabled);
    }

    return (
        <section class="bg-light py-5">
            <div class="container px-12">
                <div class="row">
                    <div class="col video-controls text-center">
                        <div class="btn-group btn-group-lg" role="group">
                            <CopyLinkButton />
                            <button type="button"  className={micActive ? "btn btn-primary" : "btn btn-danger"} onClick={muteAudio}>
                                <FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>
                            </button>
                            <button type="button"  className={cameraActive ? "btn btn-primary" : "btn btn-danger"} onClick={muteVideo}>
                                <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <VideoWrapper>
                        <StyledVideo muted ref={userVideo} autoPlay playsInline />
                    </VideoWrapper>
                    {peers.map(p => {
                        return (
                            <VideoWrapper>
                                <Video key={p.peerID} peer={p.peer} />
                            </VideoWrapper>
                        );
                    })}
                </div>
            </div>
    </section>
    );
};

export default Room;