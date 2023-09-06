const socket = io()
const videoGrid = document.getElementById('video-grid')

const myPeer = new Peer(undefined, {
  host: 'zlack.me',
  path: '/',
  secure: true
})

const myVideo = document.createElement('video')
myVideo.setAttribute('playsinline', '')
myVideo.muted = true
const peers = {}

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    video.setAttribute('playsinline', '')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })

  // add event handlers for muting audio/video for my video
  const audioMute = document.getElementById('mute-audio-btn')
  const videoMute = document.getElementById('mute-video-btn')

  audioMute.onclick = (e) => {
    muteAudio(stream)
    toggleButtonClass(audioMute)
  }
  
  videoMute.onclick = (e)  => {
    muteVideo(stream)
    toggleButtonClass(videoMute)
  }

})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  video.setAttribute('playsinline', '')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
    // delete peers[userId]
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

function copyRoomUrl() {
  navigator.clipboard.writeText(window.location.href).then(function() {
    console.log('room copied!')
  }, function(err) {
    console.log('unable to copy')
  })
}

function muteAudio(myStream) {
  myStream.getAudioTracks()[0].enabled = !(myStream.getAudioTracks()[0].enabled);
}

function muteVideo(myStream) {
  myStream.getVideoTracks()[0].enabled = !(myStream.getVideoTracks()[0].enabled);
}

function toggleButtonClass(btn) {
  const isActive = btn.classList.contains('btn-danger')
  if (!isActive) {
    btn.classList.add('btn-danger')
    btn.classList.remove('btn-primary')
  } else {
    btn.classList.remove('btn-danger')
    btn.classList.add('btn-primary')
  }
}