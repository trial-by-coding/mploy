import classNames from 'classnames';
import { connect } from 'react-redux';
import actions from 'redux/actions';

// const AppCard = ({app}) => {

export default class FileCard extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const styles = {
      margin: '12.5px 0',
      paddingBottom: '10px',
      'text-align': 'left'
    };
    // console.log('props in fileCard:',this.props);

    return (
      //appCard info
      <div>
        <Row style={styles}>
          <h2> {this.props}: </h2>
        </Row>
      </div>
    );
  }
}
