class StoryBox extends React.Component { // Реакт-компонент всегд наследуется от React.Component
  render() { // Всегда должен определять функцию render()
    const topicsList = ['HTML', 'JavaScript', 'React'];
    let now = new Date();
    return(
      <div>
        <h3>Now: {now.toTimeString()}</h3>
        <ul>{topicsList.map( topic => <li>{topic}</li> )}</ul>
      </div>
    ); // Кавычки правда не нужны, из-за jsx
  }
}



ReactDOM.render(
  <StoryBox />, // Вызов компонента
  document.getElementById('story-app') // целевой элемент dom
);

class Comment extends React.Component {
  render() {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p> {/* props будут переданы при вызове компонента*/}
        <p className="comment-body">{this.props.body}</p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">Delete comment</a>
        </div>
      </div>
    );
  }
}

class CommentBox extends React.Component {
  _getComments() {
    const comments = [
      { id: 1, author: 'Spajic', body: 'Hello' },
      { id: 2, author: 'Maria', body: 'I love you' },
      { id: 3, author: 'Wall-E', body: 'What is Love?' }
    ];
    // passing unique key helps React performance
    return comments.map((comment) => {
      return (
        <Comment
          author={comment.author} body={comment.body} key={comment.id}/>
      );
    });
  }

  render() {
    return(
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">2 comments</h4>
        <div className="comment-list">
          {this._getComments()} {/*JSX know how to render arrays*/}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox />,
  document.getElementById('comments-box')
);
