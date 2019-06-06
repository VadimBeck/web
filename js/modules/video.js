let videoPlayer = function(){

  let video = document.querySelector('.video__content');
  let playBtn = document.querySelector('.video__btn');
  let volume = document.querySelector('.video__volume');
  let progressBar = document.querySelector('.video__progress');
  let switchBtn = document.querySelector('.video__play');
  let playing = false;

  video.ontimeupdate = function(){
    progress();
    if(video.currentTime == video.duration){
      pause();
    }
  } 
  function play() {
    video.play();
    playing = true;
    playBtn.classList.add('hidden');
    switchBtn.classList.add('stop');
  }
  function pause() {
    video.pause();
    playing = false;
    playBtn.classList.remove('hidden');
    switchBtn.classList.remove('stop');
  }
  function progress(){
    let duration = video.duration;
    let time = video.currentTime;
    progressBar.value = (time/duration)*100;
  }

  playBtn.addEventListener('click', function(){
    if(!playing) {
      play();
    }
  });
  video.addEventListener('click', function(){
      if(playing) {
        pause();
      }
  });
  volume.addEventListener('input', function(){
    let value = this.value;
    video.volume = value/100;
  })
  progressBar.addEventListener('click', function(e) {
    let width = progressBar.offsetWidth;
    let pos = e.offsetX;
    progressBar.value = (pos/width)*100;
    video.pause();
    video.currentTime = video.duration*(pos/width);
    video.play();
  })
  switchBtn.addEventListener('click',function(){
    if(!playing) {
      play();
    }
    else if(playing) {
      pause();
      video.currentTime = 0;
    }
  })

}
videoPlayer();
