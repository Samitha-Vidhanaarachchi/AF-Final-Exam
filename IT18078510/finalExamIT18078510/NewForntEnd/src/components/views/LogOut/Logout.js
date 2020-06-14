import React, {Component} from 'react';

export default class Logout extends Component {

    componentDidMount(){
        localStorage.removeItem('CustomerLogged');
        localStorage.removeItem('CustomerId');
        this.props.history.push('/');
        window.location.reload();
    }
    render() {

        return (
            <div>
            </div>
        );
    }

}
