import React, { useState, useEffect } from 'react';
import { InputRow } from './InputRow.jsx';

const statusOptions = {
    'NULL': '-- select one --',
    'pending': 'Pending',
    'dropped_off': 'Dropped Off',
    'filled': 'Filled',
    'ready_for_pickup': 'Ready for Pickup',
    'picked_up': 'Picked Up',
};
function formatStatus(status) {
    if (statusOptions[status] === undefined) {
        return 'NULL';
    }
    return statusOptions[status];
}

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
                <td>{this.record['pharmacist']['first_name']} {this.record['pharmacist']['last_name']}</td>
                <td>{formatStatus(this.record['status'])}</td>
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
                            <th>Prescription ID</th>
                            <th>Pharmacist</th>
                            <th>Status</th>
                            <th>Update Date</th>
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
                <h1 className="display-3">Prescription Status</h1>
                <PrescriptionStatusTable records={this.props.records} />
            </div>
        )
    }
}