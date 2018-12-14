import React from 'react';
export default class  Icon extends React.Component{
    render(){
        return <svg className="svg-icon">
            <use xlinkHref={`#${this.props.id}`}></use>
        </svg>;
    }
}