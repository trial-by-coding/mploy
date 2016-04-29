import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

export default class Body extends React.Component {
  componentDidMount() {
    $('#nestable').nestable({
      group: 1
    });
  }
  render() {
    return (
      <div className='shortcard'>
        <ol>

        </ol>
      </div>
    );
  }
}


