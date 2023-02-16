import React, { useState, useEffect } from 'react';
import { InputRow } from './InputRow.jsx';

export class ForeignKeySelect extends React.Component {
    constructor(props) {
        super(props);
        this.tables = props.tables;
        this.rows = this.tables[props.tableName];
        this.searchKeyFunc = props.searchKeyFunc;
        this.foreignKey = props.foreignKey;
        this.state = { value: 'null' };
    }
    render() {
        return (
            <select className="form-control" value={this.state.value} onChange={this.props.onChange}>
                <option value={null}>- select option -</option>
                {this.rows.map(row => <option value={row[this.foreignKey]}>{this.searchKeyFunc(row)}</option>)}
            </select>
        );
    }
}