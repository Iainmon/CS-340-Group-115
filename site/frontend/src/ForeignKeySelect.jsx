import React, { useState, useEffect } from 'react';
import { InputRow } from './InputRow.jsx';

export class ForeignKeySelect extends React.Component {
    constructor(props) {
        super(props);
        this.tables = props.tables;
        this.rows = this.tables[props.tableName];
        this.searchKeyFunc = props.searchKeyFunc;
        this.foreignKey = props.foreignKey;
        this.state = { value: props.value }// !props.value ? 'null' : props.value };
        this.value = props.value
    }
    render() {
        return (
            <select className="form-control" value={this.props.value} onChange={(e) => {this.props.onChange(e); this.value = e.target.value}}>
            {/*<select className="form-control" value={this.state.value} onChange={(e) => {this.props.onChange(e); this.setState({value:e.target.value})}}>*/}
                <option value="" hidden>-- select option --</option>
                {this.rows.map(row => <option value={row[this.foreignKey]}>{this.searchKeyFunc(row)}</option>)}
                {this.props.additionalFields && Object.entries(this.props.additionalFields).map(([k,v]) => <option value={k}>{v}</option>)}
            </select>
        );
    }
}