class StoryBox extends React.Component { // Реакт-компонент всегд наследуется от React.Component
  render() { // Всегда должен определять функцию render()
    const topicsList = [new Date().toTimeString(), 'HTML', 'JavaScript', 'React'];
    return(
      <ul>{topicsList.map( topic => <li>{topic}</li> )}</ul>
    ); // Кавычки правда не нужны, из-за jsx
  }
}
ReactDOM.render(
  <StoryBox />, // Вызов компонента
  document.getElementById('story-app') // целевой элемент dom
);
