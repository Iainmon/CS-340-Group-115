import React, { useState, useEffect } from 'react';
import { InputRow } from './InputRow.jsx';


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
                <td>{this.record['customer_id']}</td>
                <td>{this.record['medication_id']}</td>
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
                            {Object.keys(this.records[0]).map((title) => <th>{title}</th>)}
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
    return (
        <form onSubmit={() => true}>
            <fieldset>
                <legend>Edit Prescription</legend>
                <InputRow title="Dosage" value={props.record['dosage']} onChange={e => props.onChange({...props.record, 'dosage': e.target.value})} />
                <InputRow title="Refill Count" value={props.record['refill_count']} onChange={e => props.onChange({...props.record, 'refill_count': e.target.value})} />
                <InputRow title="Refill Frequency" value={props.record['refill_frequency']} onChange={e => props.onChange({...props.record, 'refill_frequency': e.target.value})} />
            </fieldset>
            <input type="submit" value="Submit" />
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

    return (
        <form onSubmit={() => true}>
            <fieldset>
                <legend>Add Prescription</legend>
                <InputRow title="Prescription ID" value={prescriptionId} onChange={e => setPrescriptionId(e.target.value)} />
                <InputRow title="Customer ID" value={customerId} onChange={e => setCustomerId(e.target.value)} />
                <InputRow title="Medication ID" value={medicationId} onChange={e => setMedicationId(e.target.value)} />
                <InputRow title="Dosage" value={dosage} onChange={e => setDosage(e.target.value)} />
                <InputRow title="Refill Count" value={refillCount} onChange={e => setRefillCount(e.target.value)} />
                <InputRow title="Refill Frequency" value={refillFrequency} onChange={e => setRefillFrequency(e.target.value)} />
            </fieldset>
            <input type="submit" value="Submit" />
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
        this.setState({ activeEditRecord: { ...record } });
    }

    render() {
        return (
            <div className="view">
                <h1>Prescriptions</h1>
                <PrescriptionTable records={this.props.records} onEdit={record => this.handleEdit(record)} onAdd={() => this.setState({addPrompt: true})} />
                {this.state.activeEditRecord === null ? null : <EditPrescription record={this.state.activeEditRecord} onChange={x => this.setState({ activeEditRecord : x})} />}
                {this.state.addPrompt ? <CreatePrescription /> : null}
            </div>
        )
    }
}