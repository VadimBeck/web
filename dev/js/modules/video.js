document.addEventListener('DOMContentLoaded', function() {
  let videoPlayer = function() {
    let video = document.querySelector('.video__content');
    let playBig = document.querySelector('.video__btn');
    let playSmall = document.querySelector('.video__play');
    let volumeScale = document.querySelector('.video__range--volume');
    let progressScale = document.querySelector('.video__range--progress');    
    let muteBtn = document.querySelector('.video__sound-img');
    let turnOn = false;
    volumeScale.min = 0;
    volumeScale.max = 10;
    progressScale.value = 0;    
    
    function videoTurn() {
      progressScale.max = 100;
      turnOn = true;
      getDuration();
    }    
    
    function playStop() {      
      toggleClass();
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
    
    function toggleClass() {
      playBig.classList.toggle('hidden');
      playSmall.classList.toggle('pause');
    }
    
    function progressUpdate() {
      let duration = video.duration;
      let time = video.currentTime;
      let max = progressScale.max;
      progressScale.value = (time/duration)*max;
    }
    
    function progressChange() {
      let pos = progressScale.value;
      let max = progressScale.max;
      video.currentTime = video.duration*(pos/max);
    }

    function volumeChange() {
      let value = volumeScale.value;
      video.volume = value/10;
    }

    function mute() {
      if (video.volume === 0) {
        video.volume = soundLevel;
        volumeScale.value = soundLevel*10;
      } else {
        soundLevel = video.volume;
        video.volume = 0;
        volumeScale.value = 0;
      }  
    }

    // отображение текущего времени и продолжительности видео
    let estimatedDisplay = document.querySelector('.video__time-estimated');
    let completedDisplay = document.querySelector('.video__time-completed');
    function getDuration() {
      let duration = video.duration;
      estimatedDisplay.textContent = formatTime(duration);      
    }
    function timeUpdate(){
      let completed = video.currentTime;
      completedDisplay.textContent = formatTime(completed);      
    }
    function formatTime(time) {
      let roundTime = Math.round(time);
      let minutes = Math.floor(roundTime/60);
      let seconds = roundTime - minutes * 60;
      let formattedSeconds = seconds < 10 ? `0${seconds}`: seconds;

      return `${minutes}:${formattedSeconds}`;
    }

    // обработчики событий

    playBig.addEventListener('click', function(){
      videoTurn()
      playStop();
    });
    playSmall.addEventListener('click', function(){
      videoTurn()
      playStop();
    });

    video.addEventListener('timeupdate', function(){
      progressUpdate();
      timeUpdate()
    } );
    video.addEventListener('click', function(){
      if(video.paused) return;
        video.pause();
        toggleClass();      
    });
    video.addEventListener('ended', function () {
      toggleClass();
      video.currentTime = 0;
    }, false);

    progressScale.addEventListener('mousedown', function(){
      if (turnOn) {
        playBig.classList.add('hidden');
        playSmall.classList.add('pause');
      };
      video.pause();
    })
    progressScale.addEventListener('input', progressChange);
    progressScale.addEventListener('mouseup', function(){
      if(!turnOn) return;
      video.play();      
    })
      
    volumeScale.addEventListener('input', volumeChange);
    muteBtn.addEventListener('click', mute);
    
  }
  videoPlayer();
}, false);
