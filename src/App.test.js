import React from 'react'
import App from './App'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import RouterComponent from './core/routes/router'
import { FormComponent } from './ui/components/FormComponent'
import VolumeComponent from './ui/components/VolumeComponent'

Enzyme.configure({ adapter: new Adapter() })

const appWrapper = shallow(<App />)

it('should render <App />', () => {
  expect(appWrapper)
})


it('app renders RouterComponent', () => {
  expect(
    appWrapper.find(RouterComponent).length,
  ).toBe(1);
});

describe('<FormComponent />', () => {
  it('should render', () => {
    const wrapper = shallow(<FormComponent/>)
    expect(wrapper)
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<FormComponent/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('First child of FormComponent is div ', () => {
    const wrapper = shallow(<FormComponent />)
  
    expect(wrapper.first().type()).toBe('div')
  })
  
})

describe('<VolumeComponent />', () => {

  it('should render', () => {
    const wrapper = shallow(<VolumeComponent/>)
    expect(wrapper)
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<VolumeComponent/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('First child of VolumeComponent is div ', () => {
    const wrapper = shallow(<VolumeComponent  />)
  
    expect(wrapper.first().type()).toBe('div')
  })   
})