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
  _handleDelete(event) {
    event.preventDefault();

    // Вызываем callback, переданный родительским компонентом
    this.props.onDelete(this.props.comment);
  }

  render() {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p> {/* props будут переданы при вызове компонента*/}
        <p className="comment-body">{this.props.body}</p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>Delete comment</a>
        </div>
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          {/*use refs to store form inputs in component props
          React calls ref callbacks on render. */}
          <input placeholder="Name:" ref={(name) => this._author = name}/>
          <textarea placeholder="Comment:" ref={(comment) => this._body = comment}></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    // this._author, this._body установлены в ref-callback'ах
    let author = this._author.value;
    let body = this._body.value;

    // Функция addComment прокидывается в props при создании компонента CommentForm родительским компонентом CommentBox
    this.props.addComment(author, body);
  }
}

class CommentBox extends React.Component {
  constructor() {
    super(); // always call super() first

    this.state = {
      showComments: true,
      comments: []
    };
  }

  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/comments',
      success: (comments) => { this.setState( {comments} ) }
    });
  }

  componentWillMount() {
    this._fetchComments();
  }


  _getComments() {
    const comments = this.state.comments;
    // passing unique key helps React performance
    return comments.map((comment) => {
      return (
        <Comment
          comment={comment}
          author={comment.author} body={comment.body} key={comment.id}
          onDelete={this._deleteComment.bind(this)}/>
      );
    });
  }

  _handleClick() {
    this.setState({ // Always modify state like this, not state.prop = ...
      showComments: !this.state.showComments
    });
  }

  _addComment(author, body) {
    const comment = { author, body };

    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/comments',
      data: { comment },
      success: (newComment) => {
        // State is only updated after API response
        this.setState({
          // concat yields new reference to array, so react compares faster than with push
          comments: this.state.comments.concat([newComment])
        });
      }
    });
  }

  _deleteComment(comment) {
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/comments/${comment.id}`
    });
    // Optimistic UI-update, не ждём подтверждения от сервера, а сразу удаляем коммент
    const comments = [...this.state.comments];
    const deletedCommentIndex = comments.indexOf(comment);
    comments.splice(deletedCommentIndex, 1);

    this.setState( {comments} );
  }

  render() {
    let commentNodes;
    let buttonText = 'Show comments';
    let comments = this._getComments();
    if(this.state.showComments) {
      commentNodes = <div className="comment-list">{comments}</div>;
      buttonText = 'Hide comments';
    }
    return(
      <div className="comment-box">
        {/* Прокидываем метод создания комментария в дочерний компонент */}
        <CommentForm addComment={this._addComment.bind(this)}/>
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        <h3>Comments</h3>
        <h4 className="comment-count">{`${comments.length} comments`}</h4>
        {commentNodes}
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox />,
  document.getElementById('comments-box')
);
