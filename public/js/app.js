function init(){
  var socket = io();
  var gameArea = document.getElementById('game_area');
  var initialScreen = document.getElementById('initial_screen').innerHTML;
  gameArea.innerHTML = initialScreen;

  var startButton = document.getElementById('start_button');
  startButton.addEventListener('click', function(){
    console.log('ca')
    socket.emit('create room');
  })

  socket.on('gameId', function(data){
    var gameScreen = document.getElementById('game_screen').innerHTML;
    gameArea.innerHTML = gameScreen;
    var gameIdHeader = document.getElementById('game_id');
    gameIdHeader.textContent = data;
  });

   var joinButton = document.getElementById('join_game_button');

  joinButton.addEventListener('click', function(){
    var joinGameId = document.getElementById('join_game_in').value;
    socket.emit('join room', joinGameId)
  })

  socket.on('message', function(message){
    var gameScreen = document.getElementById('game_screen').innerHTML;
    gameArea.innerHTML = gameScreen;
    var opponent = document.getElementById('opponent');
    opponent.textContent = message;

    startNewGame();

      // This goes inside the socket.on('message' ...) so that once the game begins,
    // it adds the event listener to the 'new game' button.
    var newGame = document.getElementById('refresh');
    newGame.addEventListener('click', function(){
      socket.emit('new game');
    });
  });

  socket.on('update board', function(id){
    makeMove(id)
  });

  function startNewGame(){
    createGame();

    var boxes = document.getElementsByClassName('col');
    for (var i = 0; i < boxes.length; i++){
      boxes[i].addEventListener('click', function(event){
        socket.emit('move', event.target.id)
      });
    }; 
  }

   socket.on('start new game', startNewGame);
}

window.addEventListener('load', init);