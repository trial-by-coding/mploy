import classNames from 'classnames';

export default class appdashCard extends React.Component {
  render() {
    let jobtitle = this.props.item.job_title;
    let appID = this.props.item.appID;
    let index = this.props.index;
    let status = this.props.item.status;
    console.log('appdashcarddata', this.props)
    return (
      <div>
        <Col md={10}>
          <div>
           <h4> {jobtitle} </h4>
           <div onClick={() => this.props.rescind(appID, index, status)}> Rescind </div>

          </div>
        </Col>
      </div>
    );
  }
}
