import React from 'react';
// import { restCall } from '../../core/services/restClient'
// import { baseUrl } from '../../core/defaults';
// import VolumeComponent from './VolumeComponent';
// import _ from 'lodash';

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.headerRef = React.createRef()
    }

    handleClick = () => {
        this.props.history.push("/search")
    }


    render() {
        return (
            <div>
                <div className="main-header" ref={this.headerRef}>
                    <h1 ref={this.titleRef}>My Liblary</h1>
                </div>
                <div className="landing-theme">

                    <button onClick={this.handleClick}>Wyszukaj ksiąkę!</button>
                </div>
                <div className="landing-theme">
                </div>
            </div>
        )
    }
}
export default LandingPage;