import React from 'react';
// import { restCall } from '../../core/services/restClient'
// import { baseUrl } from '../../core/defaults';
// import VolumeComponent from './VolumeComponent';
import _ from 'lodash';
import Footer from './Footer';

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.headerRef = React.createRef()
        this.bookRef = React.createRef()
        this.rootRef = React.createRef()
        this.state = {
            readingPros: [
                {
                    id: 1,
                    value: "1. Redukuje stres"
                }, {
                    id: 2,
                    value: "2. Poprawia pamięć"
                }, {
                    id: 3,
                    value: "3. Inspiruje"
                }, {
                    id: 4,
                    value: "4. Rozwija wyobraźnię"
                }, {
                    id: 5,
                    value: "5. Poprawia skupienie i koncentrację"
                }, {
                    id: 6,
                    value: "6. Poszerza słownictwo"
                }, {
                    id: 7,
                    value: "7. Zwiększa atrakcyjność dla płci przeciwnej"
                }, {
                    id: 8,
                    value: "8. Stymuluje mózg"
                }, {
                    id: 9,
                    value: "9. Poszerza światopogląd"
                }, {
                    id: 10,
                    value: "10. Rozwija wrażliwość na innych ludzi"
                }, {
                    id: 11,
                    value: "11. Poszerza wiedzę"
                }, {
                    id: 12,
                    value: "12. Zwiększa zdolności analityczne"
                }, {
                    id: 13,
                    value: "13. Poprawia pisanie"
                }, {
                    id: 14,
                    value: "14. Pomaga zasnąć"
                }, {
                    id: 15,
                    value: "15. Kształtuje osobowość"
                }               
            ]
        }
        this.refsForAllElements = this.state.readingPros.reduce((acc, value) => {
            acc[value.id] = {
                id: value.id,
                ref: React.createRef(),
                ratio: 0
            }
            return acc
        }, {})

        const callback = entries => {
            entries.forEach(entry => {
                this.refsForAllElements[entry.target.id].ratio = entry.intersectionRatio
                if(this.refsForAllElements[entry.target.id].ratio > 0)
                    this.refsForAllElements[entry.target.id].ref.current.classList.add("pro-visible")
            })

        }

        this.observer = new IntersectionObserver(callback, {
            root: this.rootRef.current
        })
        
    }

    componentDidMount() {
        _.values(this.refsForAllElements).forEach(value => this.observer.observe(value.ref.current))
    }

    handleClick = () => {
        this.props.history.push("/search")
    }


    render() {
        return (
            <div ref={this.rootRef}>
                <div className="main-header" ref={this.headerRef}>
                    <h1 ref={this.titleRef}>My Liblary</h1>
                </div>
                <div className="landing-theme">

                    <button className="btn btn-success"onClick={this.handleClick}>Wyszukaj ksiąkę!</button>
                </div>
                <div className="reading-information">
                    <i className="fas fa-book fa-7x"></i>
                    <h1>Czytanie:</h1>
                    {
                        this.state.readingPros.map(pro => <p className="pro-invisible"key={pro.id} id={pro.id} ref={this.refsForAllElements[pro.id].ref}>{pro.value}</p>)
                    }
                </div>
                <Footer />
            </div>
        )
    }
}
export default LandingPage;