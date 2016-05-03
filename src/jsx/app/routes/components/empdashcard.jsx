import classNames from 'classnames';
import actions from 'redux/actions';

export default class empdashCard extends React.Component {

  render() {

    let dispatch = this.props.dispatch;
    let advance = this.props.advance;
    let status = this.props.lane;
    let index = this.props.index;
    let item = this.props.item
    return (
      <div>
        <Col md={2}>
          <div className='deny'>
            <button glyph='icon-feather-arrow-left'></button>
          </div>
        </Col>      
        <Col md={8}>
          <div>
           {this.props.item.firstname + ' ' + this.props.item.lastname}
          </div>
        </Col>
        <Col md={2}>
          <div onClick={() => advance(item.appID, status, item, index)}> > </div>
        </Col>
      </div>
    )
  }
}