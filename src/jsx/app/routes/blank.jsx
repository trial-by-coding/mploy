import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

class Todo extends React.Component {
  toggleChecked = (e) => {
    this.props.dispatch(actions.completeTodo(this.props.index));
  };

  deleteTask = (e) => {
    this.props.dispatch(actions.removeTodo(this.props.index));
    this.props.dispatch(actions.getApplications(1))  

  };

  render() {
    const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
    };
    const textStyle = {
      textDecoration: this.props.completed ? 'line-through' : '',
    };
    const buttonStyle = {
      height: 25,
      color: 'red',
      fontSize: 20,
      lineHeight: 0,
      marginTop: -3,
      border: 'none',
      background: 'none',
    };

    return (
      <Row style={styles}>
        <Col xs={10} collapseLeft>
          <div style={textStyle}>{this.props.text}</div>
        </Col>
        <Col xs={2} className='text-right'>
          <Button onClick={this.deleteTask} style={buttonStyle}>
            &times;
          </Button>
          <Checkbox native readOnly={true} checked={this.props.completed}
            onClick={this.toggleChecked} />
        </Col>
      </Row>
    );
  }
}

class TodoForm extends React.Component {
  createTodo = (e) => {
    e.preventDefault();

    // Fetch the value
    var text = this.refs.textInput.value.trim();

    // dispatch action
    this.props.dispatch(actions.addTodo(text));

    // Clear form
    this.refs.textInput.value = '';
  };

  setVisibility = (e) => {
    e.preventDefault();

    this.props.dispatch(actions.setVisibilityFilter(VisibilityFilters[e.target.value]));
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={10} collapseRight>
            <Form onSubmit={this.createTodo} style={{margin: '0 12.5px 0 0'}}>
              <Input type='text' ref='textInput' placeholder='Add New Tasks' />
            </Form>
          </Col>
          <Col xs={2} collapseLeft className='text-right'>
            <Select onChange={this.setVisibility}>
              <option value='SHOW_ALL'>Show All</option>
              <option value='SHOW_COMPLETED'>Show Completed</option>
              <option value='SHOW_ACTIVE'>Show Active</option>
            </Select>
          </Col>
        </Row>
      </Grid>
    );
  }
}

@connect((state) => state)
class Body extends React.Component {
  renderTodo(index, text, completed) {
    return <Todo key={index}
                 text={text}
                 index={index}
                 completed={completed}
                 dispatch={this.props.dispatch} />;
  }

  render() {
    const { dispatch } = this.props;
    const { visibilityFilter } = this.props;

    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={12}>
              <PanelContainer>
                <Panel>
                  <PanelBody style={{paddingBottom: 12.5}}>
                    <TodoForm dispatch={dispatch} />
                    <Grid>
                      {this.props.todos.map(({ text, completed }, i) => {
                        switch (visibilityFilter) {
                          case 'SHOW_COMPLETED':
                            if (!completed) return null;
                            return this.renderTodo(i, text, completed);
                          case 'SHOW_ACTIVE':
                            if (completed) return null;
                          default:
                            return this.renderTodo(i, text, completed);
                        }
                      })}
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

@SidebarMixin
export default class extends React.Component {
  render() {
    var classes = classNames({
      'container-open': this.props.open
    });

    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </Container>
    );
  }
}
