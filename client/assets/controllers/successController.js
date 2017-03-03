app.controller("successController", ["$scope", "userFactory", "$location", "$cookies", "$timeout", function($scope, userFactory, $location, $cookies, $timeout){
  if ($cookies.get("id")){
    $scope.user = $cookies.get("username");
    $scope.id = $cookies.get('id');
    var surfers = [];
  }
  $scope.getHomeSongs = function(){
    if ($scope.id){
      userFactory.getHomeSongs(function(data){
        $scope.stream = data.stream;
        $scope.discover = data.discover;
        $scope.top_users = data.top_users;
        $scope.top_songs = data.top_songs;
        $scope.changeView(0, 10);
        console.log(data);
      })
    }
    else {
      userFactory.getHomeSongs($scope.id, function(data){
        $scope.stream = []
        $scope.discover = data.discover;
        $scope.top_users = data.top_users;
        $scope.top_songs = data.top_songs;
        $scope.changeView(0, 10);
        console.log(data);
      })
    }

  }
  $scope.getHomeSongs();
  $scope.changeView = function(number, view){
    if (number == view){
      return;
    }
    else {
      if (surfers){
        for (var i = 0; i < surfers.length; i++){
          surfers[i].destroy();
        }
        surfers = []
      }
      if (number == 1){
        $scope.containerView = 1;
        $scope.current = {index: 0, song: {}}
        $timeout(function(){
          for (var i = 0; i < $scope.discover.length; i++){
            $scope.wavemaker($scope.discover[i])
          }
        }, 200);
        for (var i = 0; i < $scope.discover.length; i++){
          var song = $scope.discover[i]
          song.well_timed_comments = {}
          if (song.likes.indexOf($scope.id) > -1){
            song.likeFlag = true;
          } else {
            song.likeFlag = false;
          }
          if (song.reposted_by.indexOf($scope.id) > -1){
            song.repostFlag = true;
          } else {
            song.repostFlag = false;
          }
          for (var j = 0; j < song.timedComments.length; j++){
            song.well_timed_comments[song.timedComments[j].time] = song.timedComments[j].comment + " -" + song.timedComments[j].user
          }
        }
      }
      else if (number === 2){
        $scope.containerView = 2;
        $scope.current = {index: 0, song: {}}
        $timeout(function(){
          for (var i = 0; i < $scope.top_songs.length; i++){
            $scope.wavemaker($scope.top_songs[i])
          }
        }, 200);
        for (var i = 0; i < $scope.top_songs.length; i++){
          var song = $scope.top_songs[i]
          song.well_timed_comments = {}
          if (song.likes.indexOf($scope.id) > -1){
            song.likeFlag = true;
          } else {
            song.likeFlag = false;
          }
          if (song.reposted_by.indexOf($scope.id) > -1){
            song.repostFlag = true;
          } else {
            song.repostFlag = false;
          }
          for (var j = 0; j < song.timedComments.length; j++){
            song.well_timed_comments[song.timedComments[j].time] = song.timedComments[j].comment + " -" + song.timedComments[j].user
          }
        }
      }
      else {
        $scope.containerView = 0;
        $scope.current = {index: 0, song: {}}
        $timeout(function(){
          for (var i = 0; i < $scope.stream.length; i++){
            $scope.wavemaker($scope.stream[i])
          }
        }, 200);
        for (var i = 0; i < $scope.stream.length; i++){
          var song = $scope.stream[i]
          song.well_timed_comments = {}
          if (song.likes.indexOf($scope.id) > -1){
            song.likeFlag = true;
          } else {
            song.likeFlag = false;
          }
          if (song.reposted_by.indexOf($scope.id) > -1){
            song.repostFlag = true;
          } else {
            song.repostFlag = false;
          }
          for (var j = 0; j < song.timedComments.length; j++){
            song.well_timed_comments[song.timedComments[j].time] = song.timedComments[j].comment + " -" + song.timedComments[j].user
          }
        }
      }
    }
  }
  $scope.wavemaker = function(song, play=-2, alt_id=false){
    if (alt_id){
      var id = '.w' + alt_id;
    }
    else {
      var id = '.w' + song._id;
    }
    var wavesurfer = WaveSurfer.create({
      container: id,
      backend: 'MediaElement',
      waveColor: '#17BEBB',
      progressColor: '#EF3E36',
      cursorColor: '#EF3E36',
      barWidth: 2,
      cursorWidth:0
        });
    wavesurfer.load(song.song_file);

    wavesurfer.on('ready', function () {
      if (play > -1){
        wavesurfer.play()
      }
      $("#l" + song._id).text(secondsToMinSec(wavesurfer.getDuration()));
      $('.preview_play_button').on("click", function(){
        wavesurfer.on('audioprocess', function(){
          if ($scope.current.song.well_timed_comments[Math.floor(surfers[$scope.current.index].getCurrentTime())]){
            $("#t" + $scope.current.index).text($scope.current.song.well_timed_comments[Math.floor(surfers[$scope.current.index].getCurrentTime())]);
          }
          else {
            $("#t"+ $scope.current.index).text(" ")
          }
        })
      })
      wavesurfer.on("finish", function(){
        if (!$.isEmptyObject($scope.current.playlist) && ($scope.current.playlist.songs[$scope.current.playlist.current_song.index + 1] != undefined)){
          $scope.$apply(function(){
            $scope.current.playlist.current_song.song = $scope.current.playlist.songs[$scope.current.playlist.current_song.index + 1];
            $scope.current.playlist.current_song.index = $scope.current.playlist.current_song.index + 1;
            $scope.current.song = $scope.current.playlist.current_song.song;
            surfers[$scope.current.index].destroy();
            $scope.wavemaker($scope.current.song, $scope.current.index, $scope.current.playlist._id);
          })
        }
        else {
          surfers[$scope.current.index].stop();
          $('#s' + $scope.current.index).removeClass("glyphicon-pause")
          $('#s' + $scope.current.index).addClass("glyphicon-play")
        }
      })
    });
    if (play > -1){
      surfers[$scope.current.index] = wavesurfer
    }
    else {
      surfers.push(wavesurfer);
    }
  };
  $scope.play_pause = function(index, song, playlist={}){
    $scope.current = {index:index, song:song, playlist: playlist};
    console.log($scope.current.index);
    for (var i = 0; i < surfers.length; i++){
      if (surfers[i].isPlaying() && surfers[i] != surfers[index]){
        surfers[i].stop();
        $('#s' + i).addClass("glyphicon-play")
        $('#s' + i).removeClass("glyphicon-pause")
      }
    }
    if ($('#s' + index).hasClass("glyphicon-play")){
      $('#s' + index).addClass("glyphicon-pause")
      $('#s' + index).removeClass("glyphicon-play")
    }
    else {
      $('#s' + index).removeClass("glyphicon-pause")
      $('#s' + index).addClass("glyphicon-play")
    }
    surfers[index].playPause();
  };
  $scope.like = function(song_id, user_id, index){
    songFactory.like(song_id, user_id, function(data){
      $scope.user.uploaded_songs[index].likeFlag = true;
    })
  }
  $scope.disLike = function(song_id, user_id, index){
    songFactory.disLike(song_id, user_id, function(data){
      $scope.user.uploaded_songs[index].likeFlag = false;
    })
  }
  $scope.repost = function(song_id, user_id, index){
    songFactory.repost(song_id, user_id, function(data){
      $scope.user.uploaded_songs[index].repostFlag = true;
    })
  }
  $scope.removeRepost = function(song_id, user_id, index){
    songFactory.removeRepost(song_id, user_id, function(data){
      $scope.user.uploaded_songs[index].repostFlag = false;
    })
  };
}])
