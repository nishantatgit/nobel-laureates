import React from 'react';
import './MainLayout.scss';

export default class MainComponent extends React.Component{
    render(){
        return <section className="container"><h1>Main Component</h1><Red/></section>;
    }
}


const AppContext =  React.createContext();

class AppProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count : 1
        }
    }
    render(){
        return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>
    }
}

export class Red extends React.Component{
    render(){
        return <AppProvider>
            <Blue/>
        </AppProvider>;
    }
}

class Blue extends React.Component{
    render(){
        return <div className="blue"><Green/></div>;
    }
}

class Green extends React.Component{
    render(){
        return <div className="green">
            <AppContext.Consumer>{ context => <h2>{context.count}</h2>}</AppContext.Consumer>
        </div>;
    }
}

