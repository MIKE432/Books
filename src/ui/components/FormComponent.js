import React from 'react'
import { languages } from '../../core/defaults'
import _ from 'lodash'
import { Text } from '../ctrls/Text'
import { Col, Row } from 'react-bootstrap'

export class FormComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            q: ""
        }
    }
    handleSumit = e => {
        e.preventDefault()

        this.setState({ q: this.state.q, langRestrict: this.state.langRestrict }) 
        this.props.handleSubmit(this.state)
    }

    render() {
        return ( 
            <form className="main-form" onSubmit={this.handleSumit}>
                    <Row>
                        
                        <Col>
                            <Text 
                                value={this.state.q} 
                                onChange={(e) => { 
                                    this.setState({ q: e.target.value })
                                    const filters = { ...this.state, q: e.target.value }
                                    this.props.handleSubmit(filters)
                                }}
                                className="form-control input-error" 
                                name='q' 
                                placeholder="Tytuł"
                                isErrorConditionBlock={value => false} 
                                errorMsg="Brak tytułu"
                            />
                        </Col>
                        <Col>
                            <select 
                                className='browser-default custom-select'
                                name='langRestrict'
                                onChange={(e) => { 
                                    this.setState({ q: this.state.q, langRestrict: e.target.value }) 
                                    const filters = { ...this.state, langRestrict: e.target.value }
                                    this.props.handleSubmit(filters)
                                }}
                                placeholder="Język">
                                {
                                    _.keys(languages).map((language, key) => <option value={languages[language]} key={key} label={language}/>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select 
                                className='browser-default custom-select'
                                name='langRestrict'
                                onChange={(e) => {
                                    this.setState({ ...this.state, filter: e.target.value }) 
                                    const filters = { ...this.state, filter: e.target.value }
                                    this.props.handleSubmit(filters)
                                }}
                                placeholder="Język">
                                    <option value={null} label='Typ e-booka' />
                                    <option value='free-ebooks' label='Darmowe' />
                                    <option value='paid-ebooks' label='Płatne' />
                                    <option value='ebooks' label='Darmowe i płatne' />
                            </select>
                        </Col>
                    </Row>
            </form>
        )
    }
}