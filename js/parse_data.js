// Production key
Parse.initialize("XYwe86rF27FL0zSEeNETivcLQ9nyBtniNxh6Swub", "R4C0M1hxn3FGyvRHgZBSeXO8ULwffzld77ZtFjTf");

//Safe-dev key
// Parse.initialize("FcavaMqNGXulqDITFSUd3cngJo6ttTctma1r2e3X", "jNfnNnqVxA5djYXg6iYZmWxADD6BRpoGn48ixPsz");

var Full_movie = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions
  observe: function() {
    // Subscribe to all Comment objects, ordered by creation date
    // The results will be available at this.data.comments
    return {
      comments: (new Parse.Query('full_movies')).limit(5)
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
              'width': '18%',
              'height': '250px',
              'margin': '1%',
              'object-fit': 'cover'
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
    event.preventDefault();
    $('#videoplayer video source').attr('src', this.props.url);
    $('#videoplayer video').load();
    activate_player(this.props.src);
  },
  render: function() {
    // Render the text of each comment as a list item
    return (
      <div style={{
          'width': '31.3%',
          'height': '180px',
          'margin': '1%',
          'float': 'left'
        }}>
        <img
          src={this.props.src}
          title={this.props.title}
          url={this.props.url}
          style={{
            // 'width':'100%',
            'object-fit': 'cover'
            // 'max-height': '120px'
          }}>
        </img>
        <p style={{'font' : 'normal 1.5em/1 Ailerons', 'text-align': 'center'}}>
          <a href='play' style={{'color': '#FF00DC'}} onClick={this.handleClick}>
            {this.props.title}
          </a>
        </p>
      </div>
    );
  }
});


var Video_gallery = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions
  observe: function(props, state) {
    // Subscribe to all videos objects, limited to gallery_size
    // The results will be available at this.data.comments
    return {
      comments: (new Parse.Query('videos')).skip(state.skip).limit(state.limit)
    };
  },
  getInitialState: function() {
    return {skip:0, limit: 9}
  },
  componentDidUpdate: function(){

  },
  handleClick: function(event) {
    this.setState({
      skip: this.state.skip + this.state.limit,
      limit: this.state.limit
    });
  },
  render: function() {
    if(this.data.comments.length != 0){
      // Render the text of each comment as a list item
      return (
        <div>
          <ul>
            {this.data.comments.map(function (c) {
              return <Video src={c.img} title={c.title} url={c.url} />;
            })}
          </ul>
          <div className="title clearfix">
            <p
              id="load"
              className="text"
              onClick={this.handleClick}
              style={{'float': 'left'}}>
              Load more...
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="title clearfix">
            <p
              id="load"
              className="text"
              onClick={this.handleClick}>
              End of list
            </p>
          </div>
        </div>
      );
    }
  }
});

var gallery = React.render(
  <Video_gallery/>,
  document.getElementById('latest-theater')
); //.getElementsByClassName('container'));

//gallery.setState({skip: 0, limit: 9}) skip page number or +1. Or do limit+=9. Run this function on click load more

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
