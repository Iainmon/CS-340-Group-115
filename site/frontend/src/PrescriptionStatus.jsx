import React, { useState, useEffect } from 'react';
import { InputRow } from './InputRow.jsx';


class PrescriptionStatus extends React.Component {
    constructor(props) {
        super(props);
        this.record = {...props.record};
        this.state = { };
    }

    render() {
        return (
            <tr className="prescription_status">
                <td>{this.record['prescription_id']}</td>
                <td>{this.record['pharmacist_id']}</td>
                <td>{this.record['status']}</td>
                <td>{this.record['update_date']}</td>
            </tr>
        )
    }
}


class PrescriptionStatusTable extends React.Component {
    constructor(props) {
        super(props);
        this.records = [...props.records];
        this.state = { };
    }

    render() {
        return (
            <div className="table">
                <table border="1" cellPadding="5">
                    <tbody>
                        <tr>
                            {Object.keys(this.records[0]).map((title) => <th>{title}</th>)}
                        </tr>
                        {this.records.map((record) => <PrescriptionStatus record={record} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}


export class PrescriptionStatusView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeEditRecord: null };
    }

    handleEdit(record) {
        console.log(record)
        this.setState({ activeEditRecord: { ...record } });
    }

    render() {
        return (
            <div className="view">
                <h1>Prescription Status</h1>
                <PrescriptionStatusTable records={this.props.records} />
            </div>
        )
    }
}