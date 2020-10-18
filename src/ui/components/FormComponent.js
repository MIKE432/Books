import React from 'react'
import { languages, smallDeviceBreakPoint } from '../../core/defaults'
import _ from 'lodash'
import { Text } from '../ctrls/Text'
import { Col, Row } from 'react-bootstrap'

export class FormComponent extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef()
        this.state = {
            filters: {
                q: "",
                authors: "",
                langRestrict: "",
                filter: ""
            },
            areFiltersActive: false
        }        
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({ q: this.state.q, langRestrict: this.state.langRestrict }) 
        this.props.handleSubmit(this.state.filters)
    }

    render() {
        const isSmallDevice = window.innerWidth <= smallDeviceBreakPoint
        const displayInSmall = (isSmallDevice ? 'flex' : 'none')
        return ( 
            <div className="form-main-container"> 
                <div className="search-title-container">
                    <div className="search-title-icon" onClick={() => this.props.history.goBack()}>
                        <i className="fas fa-arrow-left fa-2x hover-icon"></i>
                    </div>
                    <div className="search-title">
                        <h1>My Liblary</h1>
                        <h3>Wyszukaj</h3>
                    </div>
                    <div className="search-title-icon hover-icon" onClick={() => this.setState({ areFiltersActive: true })}>
                        <i className="fas fa-filter fa-2x hover-icon"></i>
                    </div>
                </div>
                {
                    !(isSmallDevice && !this.state.areFiltersActive) ? 
                    <form className="main-form" onSubmit={(e) => {
                        this.handleSubmit(e)
                    }} ref={this.formRef}>
                        <div className="exit-filters-icon" onClick={() => this.setState({ areFiltersActive: false })}>
                            <i className="fas fa-times"></i>
                        </div>
                        <Row sm="4" xs={1} lg={4}>
                            
                            <Col xs="12" >
                                <Text 
                                    value={this.state.q} 
                                    onChange={(e) => { 
                                        this.setState({ filters: {...this.state.filters, q: e.target.value} }) 
                                        const filters = { ...this.state.filters, q: e.target.value }
                                        !isSmallDevice && this.props.handleSubmit(filters)
                                    }}
                                    className="form-control input-error" 
                                    name='q' 
                                    placeholder="Tytuł"
                                    isErrorConditionBlock={value => false} 
                                    errorMsg="Brak tytułu"
                                />
                            </Col>
                            <Col xs="12">
                                <Text 
                                    value={this.state.authors} 
                                    onChange={(e) => { 

                                        this.setState({ filters: {...this.state.filters, authors: e.target.value} }) 
                                        const filters = { ...this.state.filters, authors: e.target.value }
                                        !isSmallDevice && this.props.handleSubmit(filters)
                                    }}
                                    className="form-control input-error" 
                                    name='authors' 
                                    placeholder="Autorzy"
                                    isErrorConditionBlock={value => false} 
                                />
                            </Col>
                            <Col xs="12">
                                <select 
                                    className='browser-default custom-select'
                                    name='langRestrict'
                                    onChange={(e) => { 
                                        this.setState({ filters: {...this.state.filters, langRestrict: e.target.value} }) 
                                        const filters = { ...this.state.filters, langRestrict: e.target.value }
                                        !isSmallDevice && this.props.handleSubmit(filters)
                                    }}
                                    placeholder="Język">
                                    {
                                        _.keys(languages).map((language, key) => <option value={languages[language]} key={key} label={language}/>)
                                    }
                                </select>
                            </Col>
                            <Col xs="12">
                                <select 
                                    className='browser-default custom-select'
                                    name='filter'
                                    onChange={(e) => {

                                        this.setState({ filters: {...this.state.filters, filter: e.target.value} }) 
                                        const filters = { ...this.state.filters, filter: e.target.value }
                                        !isSmallDevice && this.props.handleSubmit(filters)
                                    }}
                                    placeholder="Język">
                                        <option value={null} label='Typ e-booka' />
                                        <option value='free-ebooks' label='Darmowe' />
                                        <option value='paid-ebooks' label='Płatne' />
                                        <option value='ebooks' label='Darmowe i płatne' />
                                </select>
                            </Col>
                            <Col xs="12" style={{display: displayInSmall}}>
                                <button disabled={(this.state.filters.q + this.state.filters.authors) === ''}  className="btn btn-success" onClick={(e) => {
                                    e.preventDefault()
                                    this.handleSubmit(e)
                                    this.setState({ areFiltersActive: false })}
                                    } type="submit">Filtruj</button>
                            </Col>
                        </Row>
                    </form> : null
                }
            </div>
        )
    }
}