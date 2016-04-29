import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

class ShortCard extends React.Component {
  render() {

    return (
      <div>
      <li> {this.props.item} </li>
      </div>
    )
  }
}

export default class AppList extends React.Component {
  componentDidMount() {
    $('#nestable').nestable({
      group: 1
    });
  }
  render() {
    // {list.map(item => <ShortCard data={item}/>)}
    let list = this.props.data;
    let newList = ['First Item', 'Second Item', 'Third Item', 'Fourth Item']
    console.log("AppList data", this.props)
    return (
      <div className='shortcard'>
        <ul>
          {newList.map(item => <ShortCard item={item}/>)}
        </ul>
      </div>
    );
  }
}


