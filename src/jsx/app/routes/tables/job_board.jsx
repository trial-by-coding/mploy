import { connect } from 'react-redux';
import { Link } from 'react-router';
import actions from 'redux/actions';
import className from 'classnames';


class JobBoard extends React.Component {
  componentDidMount() {
    $('#example')
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]
    });
  }
  render() {

  let posts = this.props.posts[0];
  console.log('this.props ===', posts);
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col xs={12}>
              <PanelContainer>
                <Panel>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <Table id='example' className='display' cellSpacing='0' width='100%'>
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
                              <tr>
                                <td>{posts.company_name}</td>
                                <td>{posts.job_title}</td>
                                <td>{posts.min_salary}-
                                {posts.max_salary}</td>
                                <td>{posts.employment_type}</td>
                                <td>{posts.location}</td>
                                <td>{posts.desired_education}</td>
                                <td>
                                  <Button xs outlined bsStyle='red'>
                                    Delete
                                  </Button>
                                </td>
                              </tr>
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
  constructor(props) {
    super(props);
  }
  componentWillMount(){

  };


  selectJobPost = (jobID) => {
    this.props.dispatch(actions.selectJob(jobID));

  };

  render() {
    let posts = this.props.posts;

    return (
      <div id='body' {...this.props}>

        <div>
          {
            posts.map(item => <td href='/employerjobboard'>{item.job_title} {() => this.props.select(item.jobID)} </td>)
          }
        </div>


        <div id='sidebar-container'>
            <JobBoard posts={this.props.posts}
                    select={this.selectJobPost} />
        </div>
      </div>
    );
  }
}
