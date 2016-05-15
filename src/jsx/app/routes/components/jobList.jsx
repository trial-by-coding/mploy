import classNames from 'classnames';


export default class ShortCard extends React.Component {
  render() {
    return (
      <div>
      <li> {this.props.item} </li>
      </div>
    );
  }
}

export default class JobList extends React.Component {
  componentDidMount() {
    $('#nestable').nestable({
      group: 1
    });
  }
  render() {
    let list = this.props.data;
    let newList = ['First Item', 'Second Item', 'Third Item', 'Fourth Item'];

    return (
      <div className='shortcard'>
        <ul>
          {newList.map(item => <ShortCard item={item}/>)}
        </ul>
      </div>
    );
  }
}
