import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams } from 'react-router';

const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => ref.current.srcObject = stream);
        props.peer.on("close", () => ref.current.remove() );
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}

const VideoWrapper = ({children}) => {
    return (
        <div class="col">
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
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const params = useParams();
    const roomID = params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    });
                    peers.push(peer);
                });
                setPeers(peers);
            });

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                });
                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
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

    return (
        <section class="bg-light py-5">
            <div class="container px-12">
                <div class="row">
                    <VideoWrapper>
                        <StyledVideo muted ref={userVideo} autoPlay playsInline />
                    </VideoWrapper>
                    {peers.map((peer, index) => {
                        return (
                            <VideoWrapper>
                                <Video key={index} peer={peer} />
                            </VideoWrapper>
                        );
                    })}
                </div>
            </div>
    </section>
    );
};

export default Room;