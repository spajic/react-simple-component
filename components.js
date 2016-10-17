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
