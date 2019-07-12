

import React from 'react'
import ReactDOM from 'react-dom';

import {$,jQuery} from 'jquery'
// export for others scripts to use
window.$ = $
window.jQuery = jQuery
window.React = React;
window.ReactDOM = ReactDOM;

import  GoldenLayout from './golden-layout/js_es6/LayoutManager';
import './golden-layout/css/goldenlayout-base.css';
import './golden-layout/css/goldenlayout-dark-theme.css';

import {BrowserMockup, PhoneMockup, WatchMockup} from './svg-utils'
import './editor.scss'


var config = {
  content: [{
    type: 'row',
    content: [
       {
        title: 'A react component',
        type:'react-component',
        component: 'testItem',
        props: {value: 'I\'m on the left'}
       },
        {
        title: 'Another react component',
        type:'react-component',
        component: 'testItem'
       }
    ]
  }]
};


class Gigi extends React.Component {
    state = {
        svgWidth: '100%',
        svgHeight: '100%',
        value: parseInt(this.props.glContainer._config.props.value)
    }

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount = () => {
        // this.props.glEventHub.on('bibi', () => {
        //     console.log('YUYUYUYUYUYUY');
        // })
        this.setNodeDimensions()
        this.props.glContainer.on('resize', () => {
            this.setNodeDimensions()
        })
    }

    setNodeDimensions = () => {
        let node = this.myRef.current;
        let parentNode = node.parentNode
        let parentNodeBBox = parentNode.getBoundingClientRect()

        this.setState({
            svgWidth: parentNodeBBox.width,
            svgHeight: parentNodeBBox.height
        })
    }

    componentWillUnmount() {
     //    glEventHub.off('YourComponentProps', this.setState, this)
     //    this.props.glContainer.off('resize', () => {
     //        console.log('YUYUYUYUYUYUY 222');
     //    })
     }

    onClick = () => {
        // console.log(this.props.glContainer);
        // console.log(this.props.glEventHub);
        this.props.glContainer._config.props['value'] = this.state.value+1
        this.props.glContainer.extendState({
                value: this.state.value+1
        });
        this.setState({value: this.state.value+1})
    }

    render = () => {

        let svgElem = null
        if (this.props.glContainer._config.props['type'] === 'svgElem1') {
            svgElem = <SVGElem1 bgColor="red" width={this.state.svgWidth} height={this.state.svgHeight} />
        } else if (this.props.glContainer._config.props['type'] === 'svgElem2') {
            svgElem = <SVGElem2 bgColor="yellow" width={this.state.svgWidth} height={this.state.svgHeight} />
        } else if (this.props.glContainer._config.props['type'] === 'svgElem3') {
            svgElem = <SVGElem3 bgColor="yellow" width={this.state.svgWidth} height={this.state.svgHeight} />
        }

        return (
            <div style={{color:'white', width: '100%', height: '100%'}} ref={this.myRef}>
                {svgElem}
            </div>
        )
    }
}

class SVGElem1 extends React.Component {
    render = () => {
        let asIcon = false
        if (this.props.asIcon) {
            asIcon = this.props.asIcon
        }

        return (
            <div className="svgWrapper">
                <WatchMockup parentWidth={this.props.width} parentHeight={this.props.height} asIcon={asIcon}/>
            </div>
        )
    }
}
class SVGElem2 extends React.Component {
    render = () => {
        let asIcon = false
        if (this.props.asIcon) {
            asIcon = this.props.asIcon
        }

        return (
            <div className="svgWrapper">
                <PhoneMockup parentWidth={this.props.width} parentHeight={this.props.height} asIcon={asIcon}/>
            </div>
        )
    }
}
class SVGElem3 extends React.Component {
    render = () => {
        let asIcon = false
        if (this.props.asIcon) {
            asIcon = this.props.asIcon
        }

        return (
            <div className="svgWrapper">
                <BrowserMockup parentWidth={this.props.width} parentHeight={this.props.height} asIcon={asIcon}/>
            </div>
        )
    }
}

class MenuItem1 extends React.Component {

    state = {
        bgColor: 'blue'
    }

    render = () => {
        return (
            <div id="MenuItem1" className="mkp-editor-src-menu-item">
                <SVGElem2 bgColor={'white'} height={90} width={90} asIcon={true}/>
            </div>
        )
    }
}

class MenuItem2 extends React.Component {
    state = {
        bgColor: 'red'
    }

    render = () => {
        return (
            <div id="MenuItem2" className="mkp-editor-src-menu-item">
                <SVGElem1 bgColor={'white'} height={90} width={90} asIcon={true}/>
            </div>
        )
    }
}
class MenuItem3 extends React.Component {
    state = {
        bgColor: 'red'
    }

    render = () => {
        return (
            <div id="MenuItem3" className="mkp-editor-src-menu-item">
                <SVGElem3 bgColor={'white'} height={90} width={90} asIcon={true}/>
            </div>
        )
    }
}

export default class MyGoldenLayout extends React.PureComponent {

  componentDidMount() {
        // Build basic golden-layout config
        const config = {
            settings: {
                hasHeaders: true,
                constrainDragToContainer: true,
                reorderEnabled: true,
                selectionEnabled: true,
                popoutWholeStack: false,
                blockedPopoutsThrowError: true,
                closePopoutsOnUnload: true,
                showPopoutIcon: false,
                showMaximiseIcon: false,
                showCloseIcon: false
            },
            dimensions: {
                borderWidth: 1,
                minItemHeight: 100,
                minItemWidth: 100,
                headerHeight: 20,
                dragProxyWidth: 300,
                dragProxyHeight: 200
            },
            content: [{
                type: 'row',
                content: [{
                    type: 'react-component',
                    component: 'TestComponentContainer',
                    props: {value: 11, type: 'svgElem3'}
                },{
                    type: 'react-component',
                    component: 'IncrementButtonContainer',
                    props: {value: 22, type: 'svgElem2'}
                },{
                    type: 'react-component',
                    component: 'DecrementButtonContainer',
                    props: {value: 33, type: 'svgElem1'}
                }]
            }]
        };

        function wrapComponent(Component, store) {
            class Wrapped extends React.Component {
                render() {
                    // return (
                    //     <Provider store={store}>
                    //         <Component {...this.props}/>
                    //     </Provider>
                    // );
                    return (
                        <Gigi {...this.props}/>
                    );
                }
            }
            return Wrapped;
        };

        var layout = new GoldenLayout(config, this.layout);
        layout.registerComponent('IncrementButtonContainer',
                                 wrapComponent('IncrementButtonContainer', 'this.context.store')
        );
        layout.registerComponent('DecrementButtonContainer',
                                 wrapComponent('DecrementButtonContainer', 'this.context.store')
        );
        layout.registerComponent('TestComponentContainer',
                                 wrapComponent('TestComponentContainer', 'this.context.store')
        );

        layout.init();




        let newItemConfig = {
            title: 'title',
            type: 'react-component',
            component: 'IncrementButtonContainer',
            props: { value: 88, type: 'svgElem2'}
        };
        layout.createDragSource(document.getElementById('MenuItem1'), newItemConfig );

        let newItemConfig2 = {
            title: 'title',
            type: 'react-component',
            component: 'DecrementButtonContainer',
            props: { value: 88, type: 'svgElem1'}
        };
        layout.createDragSource(document.getElementById('MenuItem2'), newItemConfig2 );

        let newItemConfig3 = {
            title: 'title',
            type: 'react-component',
            component: 'TestComponentContainer',
            props: { value: 88, type: 'svgElem3'}
        };
        layout.createDragSource(document.getElementById('MenuItem3'), newItemConfig3 );





        layout.on('stateChanged', (e) => {
            // console.log('state stateChanged', e);
            // var state = JSON.stringify( myLayout.toConfig() );
            // myLayout = new GoldenLayout( JSON.parse( state ) );
            // myLayout.init()
        })

        layout.on('componentCreated', (component) => {
            component.container.on('resize', () => {
                // component.emit('bibi')
                // component.trigger('bibi')
                // component.container.emit('bibi')
                // component.instance._container.emit('bibi')
                // layout.emit('bibi')
                // console.log(component);
                // component.config.props['value'] = component.config.props['value']+100
            });
        });


        window.addEventListener('resize', () => {
            layout.updateSize();
        });


        this.layout = layout
    }

    paperSizeChange = () => {
        let tmpEl = document.getElementById('layoutContainer')
        if (layoutContainer.style.width === '1000px') {
            layoutContainer.style.width = '707px'
            layoutContainer.style.height = '1000px'
            this.layout.updateSize(707, 1000)
        } else {
            layoutContainer.style.width = '1000px'
            layoutContainer.style.height = '707px'
            this.layout.updateSize(1000, 707)
        }
    }

    getLayoutData = () => {
        return this.layout.toConfig()
    }

    getPaperDimensions = () => {
        let elem = document.getElementById('layoutContainer')
        let elemBBox = elem.getBoundingClientRect()
        return elemBBox
    }

    render() {
        // <button onClick={this.paperSizeChange}>paper size</button>
        return (
            <div className="mkp-editor-container">
                <div className="mkp-editor-menu-container" >
                    <MenuItem3 />
                    <MenuItem1 />
                    <MenuItem2 />
                </div>
                <div className="mkp-layout-gl-container">
                    <div id='layoutContainer' className='goldenLayout paper' ref={input => this.layout = input} />
                </div>
            </div>
        );
    }
}
