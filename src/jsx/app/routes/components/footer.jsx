export default class extends React.Component {
  static displayName = 'Footer';
  constructor(props) {
    super(props);

    this.state = {
      version: 0
    };
  }
  componentDidMount() {
    this.setState({
      version: document.getElementsByTagName('body')[0].getAttribute('data-version')
    });
  }
  render() {
    const year = new Date().getFullYear();
    return (
      <div id='footer-container'>
        <Grid id='footer' className='text-center'>
          <Row>
            <Col xs={12}>
              <div>© MPLOY - POWERED BY JAVASCRIPT & RED BULL ⚡️</div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
