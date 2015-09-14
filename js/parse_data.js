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
          return <img src={c.img} style={{
              'width': '200',
              'height': '260'
            }}></img>;
        })}
      </ul>
    );
  }
});

React.render(<Full_movie/>, document.getElementById('parse'));

var Video = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions
  observe: function() {
// Subscribe to all Comment objects, ordered by creation date
// The results will be available at this.data.comments
    return {
      comments: (new Parse.Query('videos')).limit(9)
    };
  },

  render: function() {
// Render the text of each comment as a list item
    return (
      <ul>
        {this.data.comments.map(function (c) {
          return <img src={c.img} title={c.title} url={c.url} style={{
              'width': 'auto',
              'height': '150',
              'margin': '5px'
            }}></img>;
        })}
      </ul>
    );
  }
});

React.render(<Video/>, document.getElementById('latest-theater')); //.getElementsByClassName('container'));

var Featured = React.createClass({
  mixins: [ParseReact.Mixin], // Enable query subscriptions
  observe: function() {
// Subscribe to all Comment objects, ordered by creation date
// The results will be available at this.data.comments
    return {
      comments: (new Parse.Query('videos')).equalTo('presentation', true).limit(1)
    };
  },

  render: function() {
    var c = this.data.comments[0];
    if(!c){
      return null;
    }else{
      // Render the text of each comment as a list item
          return (
                <div className='presentation' style={{'background-image':'url('+c.img+')', 'background-size': 'cover', 'background-position': 'center center'}}>
                  <div className="play-options">
                    <div className="row-play-options">
                      <div className="row-play-options-container">
                        <div className="play-button play">
                          <a className='video-link' href={c.teaser}>Teaser</a>
                        </div>
                        <div className="play-button play">
                          <a className='video-link' href={c.trailer}>Trailer</a>
                        </div>
                      </div>
                    </div>
                    <div className="row-play-options">
                      <div className="row-play-options-container">
                        <div className="play-button play">
                          <a className='video-link' href={c.url}>Full Video</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="overlay"></div>
                </div>
          );
    }
  }
});

React.render(<Featured/>, document.getElementById('featured'));
