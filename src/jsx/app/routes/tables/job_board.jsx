import { connect } from 'react-redux';
import { Link } from 'react-router';
import actions from 'redux/actions';
import className from 'classnames';


export class JobBoard extends React.Component {
  componentDidMount() {
    $('#job-board')
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]
    });
  }

  render() {
  let posts = this.props.posts;
  return (
  <Container id='body'>
    <Grid>
      <Row>
        <Col xs={12}>
        <PanelContainer noControls>
          <Panel>
            <PanelBody>
              <Grid>
                <Row>
                  <Col xs={12}>
                  <Table responsive id='job-board' className='display' cellSpacing='0' width='100%'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Education</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      { posts.map((item, index) =>
                      <tr href='/employer'>
                        <td>{item.company_name}</td>
                        <td>{item.job_title}</td>
                        <td>{item.min_salary}-{item.max_salary}</td>
                        <td>{item.employment_type}</td>
                        <td>{item.location}</td>
                        <td>{item.desired_education}</td>
                        <td>
                          <Button xs outlined bsStyle='red' onClick={()=>
                              this.props.deleteJobPost(item.jobID, index)
                          }>Delete</Button>
                        </td>
                      </tr>) }
                    </tbody>
                  </Table>
                  <br/>
                  </Col>
                </Row>
              </Grid>
            </PanelBody>
          </Panel>
        </PanelContainer>
        </Col>
      </Row>
    </Grid>
  </Container>
    );
  }
}


@connect(state => state)
export default class extends React.Component {
  constructor(props){
    super(props);
}

  deleteJobPost = (jobID, index) => {
    this.props.dispatch(actions.removeJobPost(jobID, index));
  };

  render() {
    let posts = this.props.posts;
    return (
      <div id='body'>
        <JobBoard posts={this.props.posts}
                 deleteJobPost={this.deleteJobPost}
                />
      </div>
    );
  }
}
