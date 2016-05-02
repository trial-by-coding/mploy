import classNames from 'classnames';

export default class empdashCard extends React.Component {
  render() {

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
          <div> > </div>
        </Col>
      </div>
    )
  }
}