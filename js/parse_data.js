Parse.initialize("XYwe86rF27FL0zSEeNETivcLQ9nyBtniNxh6Swub", "R4C0M1hxn3FGyvRHgZBSeXO8ULwffzld77ZtFjTf");

var Full_movie = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions
  observe: function() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      comments: (new Parse.Query('full_movies')).limit(6)
    };
  },

  render: function() {
    // Render the text of each comment as a list item
    return (
      <ul>
        {this.data.comments.map(function (c) {
          return <img
            src={c.img}
            style={{
              'width': '200',
              'height': '260'
            }}>
          </img>;
        })}
      </ul>
    );
  }
});

React.render(
  <Full_movie/>,
  document.getElementById('parse')
);


var Video = React.createClass({
  componentDidMount: function(){
    // debugger;
  },
  componentDidUpdate: function(){
    // debugger;
  },
  getInitialState: function() {
    return {metadata: ''};
  },
  handleClick: function(event) {
    debugger;
    $('#videoplayer video source').attr('src', this.props.url);
    $('#videoplayer video').load();
    activate_player();
  },
  render: function() {
    // Render the text of each comment as a list item
    return (
      <img
        src={this.props.src}
        title={this.props.title}
        url={this.props.url}
        style={{
          'width': 'auto',
          'height': '150',
          'margin': '5px'
        }}
        onClick={this.handleClick}>
      </img>
    );
  }
});


var Video_gallery = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions
  observe: function() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      comments: (new Parse.Query('videos')).limit(9)
    };
  },
  componentDidUpdate: function(){

  },
  handleClick: function(event) {
    debugger;
    $('#videoplayer video source').attr('src', this.state[event.target.attributes.data.value]);
    $('#videoplayer video').load();
    activate_player();
  },
  render: function() {
    // Render the text of each comment as a list item
    return (
      <ul>
        {this.data.comments.map(function (c) {
          return <Video src={c.img} title={c.title} url={c.url} />;
        })}
      </ul>
    );
  }
});

React.render(
  <Video_gallery/>,
  document.getElementById('latest-theater')
); //.getElementsByClassName('container'));

var Featured = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions
  observe: function() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      comments: (new Parse.Query('videos')).equalTo('presentation', true).limit(1)
    };
  },
  getInitialState: function() {
    return {comments: ''};
  },
  componentDidUpdate: function(){
    this.state = this.data.comments[0];
  },
  handleClick: function(event) {
    event.preventDefault();
    debugger;
    $('#videoplayer video source').attr('src', this.state[event.target.attributes.data.value]);
    $('#videoplayer video').load();
    activate_player();
  },
  render: function() {
    var c = this.data.comments[0];
    if(!c){
      return null;
    }else{
      // Render the text of each comment as a list item
      return (
        <div
          className='presentation'
          style={{'backgroundImage':'url('+c.img+')', 'backgroundSize': 'cover', 'backgroundPosition': 'center center'}}>
          <div className="play-options">
            <div className="row-play-options">
              <div className="row-play-options-container">
                <div className="play-button play">
                  <a
                    className='video-link'
                    href={c.teaser}
                    data='teaser'
                    onClick={this.handleClick}>Teaser</a>
                </div>
                <div className="play-button play">
                  <a
                    className='video-link'
                    href={c.trailer}
                    data='trailer'
                    onClick={this.handleClick}>Trailer</a>
                </div>
              </div>
            </div>
            <div className="row-play-options">
              <div className="row-play-options-container">
                <div className="play-button play">
                  <a
                    className='video-link'
                    href={c.url}
                    data='url'
                    onClick={this.handleClick}>
                    Full Video
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay">
          </div>
        </div>
      );
    }
  }
});

React.render(
  <Featured/>,
  document.getElementById('featured')
);
