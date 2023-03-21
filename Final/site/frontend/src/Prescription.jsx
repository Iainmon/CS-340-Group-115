import React, { useState, useEffect } from 'react';
import { InputRow, ForeignKeySelectionRow, SelectionRow } from './InputRow.jsx';
import { setComeBack } from './state.js';
import * as fetcher from './fetcher.js';


const statusOptions = {
    'NULL': 'NULL',
    'pending': 'Pending',
    'dropped_off': 'Dropped Off',
    'filled': 'Filled',
    'ready_for_pickup': 'Ready for Pickup',
    'picked_up': 'Picked Up',
    'waiting_pickup': 'Waiting for Pickup',
};

function formatStatus(status) {
    if (statusOptions[status] === undefined || status === 'NULL') {
        return 'NULL';
    }
    return statusOptions[status];
}

const getStatus = record => record['status'].length > 0 ? record['status'][record['status'].length - 1] : {'status':'NULL', 'update_date':'----'};


class Prescription extends React.Component {
    constructor(props) {
        super(props);
        this.record = {...props.record};
        this.state = { };
    }

    render() {
        return (
            <tr className="prescription">
                <td><button className="btn btn-outline-info" onClick={() => this.props.onEdit(this.record)}>Edit</button></td>
                <td></td>
                <td>{this.record['prescription_id']}</td>
                <td>{formatStatus(getStatus(this.record)['status'])}</td>
                <td>{getStatus(this.record)['update_date']}</td>
                <td>{this.record['customer']['first_name']} {this.record['customer']['last_name']}</td>
                <td>{this.record['medication']['medication_name']}</td>
                <td>{this.record['dosage']}</td>
                <td>{this.record['refill_count']}</td>
                <td>{this.record['refill_frequency']}</td>
            </tr>
        )
    }
}


class PrescriptionTable extends React.Component {
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
                            <th>
                                <button className="btn btn-info" onClick={this.props.onAdd}>Add</button>
                            </th>
                            <th></th>
                            <th>Prescription ID</th>
                            <th>Status</th>
                            <th>Updated</th>
                            <th>Customer</th>
                            <th>Medication</th>
                            <th>Dosage</th>
                            <th>Refill Count</th>
                            <th>Refill Frequency</th>
                        </tr>
                        {this.records.map((record) => <Prescription record={record} onEdit={this.props.onEdit} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}


function EditPrescription(props) {
    if (props.record === null) {
        return (<b>Please select a prescription to edit!</b>);
    }
    const [pharmacist, setPharmacist] = useState(props.record['pharmacist_id'] | null);
    console.log(pharmacist);
    console.log(getStatus(props.record)['status']);

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(props.record);
        // console.log(getStatus(props.record)['status']);
        if (getStatus(props.record)['status'] === undefined) {
            delete props.record.status;
            props.record.status = props.record.myStatus;
        }
        delete props.record.myStatus;

        const response = await fetch(fetcher.backendURL + '/edit/prescriptions', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...props.record, 'pharmacist_id': pharmacist })
        });
        console.log(response.json());
        setComeBack('prescriptions');
    }
    const myChange = e => {
        console.log(e.target.value);
        props.record.myStatus = e.target.value;
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <fieldset>
                <legend>Edit Prescription</legend>
                <InputRow title="Dosage" value={props.record['dosage']} onChange={e => props.onChange({...props.record, 'dosage': e.target.value})} />
                <InputRow title="Refill Count" value={props.record['refill_count']} onChange={e => props.onChange({...props.record, 'refill_count': e.target.value})} />
                <InputRow title="Refill Frequency" value={props.record['refill_frequency']} onChange={e => props.onChange({...props.record, 'refill_frequency': e.target.value})} />
                <SelectionRow title="Status" value={getStatus(props.record)['status']} onChange={e => { myChange(e); props.onChange({...props.record, 'status': props.record['status'] + [{'status':e.target.value,'update_date':getStatus(props.record)['update_date']}]})}} pairs={{...statusOptions,'NULL':'(NULL) No Change'}} />
                <ForeignKeySelectionRow
                    title="Pharmacist" 
                    value={pharmacist}
                    tableName="pharmacists"
                    searchKeyFunc={row => row['first_name'] + ' ' + row['last_name']}
                    foreignKey="pharmacist_id"
                    additionalFields={{'NULL':'<No Pharmacist>'}}
                    onChange={e => {console.log(e.target.value);setPharmacist(e.target.value)}} />

            </fieldset>
            <input type="submit" className="btn btn-info" value="Update" />
        </form>
    );
}

function CreatePrescription(props) {
    const [prescriptionId, setPrescriptionId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [medicationId, setMedicationId] = useState('');
    const [dosage, setDosage] = useState('');
    const [refillCount, setRefillCount] = useState('');
    const [refillFrequency, setRefillFrequency] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const record = { 'customer_id': customerId, 'medication_id': medicationId, dosage: dosage, 'refill_count': refillCount, 'refill_frequency': refillFrequency };

        const response = await fetch(fetcher.backendURL + '/add/prescriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        });
        console.log(response.json());
        setComeBack('prescriptions');

    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <fieldset>
                <legend>Add Prescription</legend>
                <ForeignKeySelectionRow 
                    title="Customer" 
                    tableName="customers" 
                    searchKeyFunc={row => row['first_name'] + ' ' + row['last_name']} 
                    foreignKey="customer_id" 
                    onChange={e => {setCustomerId(e.target.value); console.log(e.target.value)}} />
                <ForeignKeySelectionRow
                    title="Medication"
                    tableName="medications"
                    searchKeyFunc={row => row['medication_name'] + ' ' + row['quantity']}
                    foreignKey="medication_id"
                    onChange={e => { setMedicationId(e.target.value); console.log(e.target.value)}} />

                {/* <SelectionRow title="Status" value={status} onChange={e => setStatus(e.target.value)} pairs={statusOptions} /> */}

                {/* <InputRow title="Customer ID" value={customerId} onChange={e => setCustomerId(e.target.value)} /> */}
                {/* <InputRow title="Medication ID" value={medicationId} onChange={e => setMedicationId(e.target.value)} /> */}
                <InputRow title="Dosage" value={dosage} onChange={e => setDosage(e.target.value)} />
                <InputRow title="Refill Count" value={refillCount} onChange={e => setRefillCount(e.target.value)} />
                <InputRow title="Refill Frequency" value={refillFrequency} onChange={e => setRefillFrequency(e.target.value)} />
            </fieldset>
            <input type="submit" className="btn btn-success" value="Create" />
        </form>
    );
}


export class PrescriptionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeEditRecord: null, addPrompt: false };
    }

    handleEdit(record) {
        console.log(record)
        this.setState({ activeEditRecord: { ...record }, addPrompt: false });
    }

    render() {
        return (
            <div className="view">
                <h1 className="display-3">Prescriptions</h1>
                <PrescriptionTable records={this.props.records} onEdit={record => this.handleEdit(record)} onAdd={() => this.setState({addPrompt: true, activeEditRecord: null})} />
                {this.state.activeEditRecord === null ? null : <EditPrescription record={this.state.activeEditRecord} onChange={x => this.setState({ activeEditRecord : x})} />}
                {this.state.addPrompt ? <CreatePrescription /> : null}
            </div>
        )
    }
}