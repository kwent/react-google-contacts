import React from 'react'
import { create } from 'react-test-renderer'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import GoogleContacts from '../src'

configure({ adapter: new Adapter() })

describe('Google Contacts', () => {
  describe('With default props', () => {
    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: 'YOUR_CLIENT_ID',
      apiKey: 'YOUR_API_KEY',
    }

    test('render the button', () => {
      const component = create(<GoogleContacts {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleContacts {...props} />)

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(undefined)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With custom text and default props', () => {
    const buttonText = 'buttonText'

    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: 'YOUR_CLIENT_ID',
      apiKey: 'YOUR_API_KEY',
      buttonText
    }

    test('render the button', () => {
      const component = create(<GoogleContacts {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleContacts {...props} />)

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(undefined)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With custom class and default props', () => {
    const className = 'test-class'

    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: 'YOUR_CLIENT_ID',
      apiKey: 'YOUR_API_KEY',
      className
    }

    test('render the button', () => {
      const component = create(<GoogleContacts {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleContacts {...props} />)

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(className)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With custom class and custom style', () => {
    const className = 'test-class'
    const style = { color: 'red' }
    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: 'YOUR_CLIENT_ID',
      apiKey: 'YOUR_API_KEY',
      className,
      style
    }

    test('render the button', () => {
      const component = create(<GoogleContacts {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleContacts {...props} />)

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(className)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With children, custom text, and default props', () => {
    const children = 'test'
    const buttonText = 'buttonText'
    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: 'YOUR_CLIENT_ID',
      apiKey: 'YOUR_API_KEY',
      buttonText
    }

    test('render the button', () => {
      const component = create(<GoogleContacts {...props}>{children}</GoogleContacts>)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleContacts {...props}>{children}</GoogleContacts>)

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(undefined)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
  describe('With handles custom tag prop', () => {
    const tag = 'div'

    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: 'YOUR_CLIENT_ID',
      apiKey: 'YOUR_API_KEY',
      tag
    }

    test('render the button', () => {
      const component = create(<GoogleContacts {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleContacts {...props} />)

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(undefined)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual(tag)
    })
  })
})
