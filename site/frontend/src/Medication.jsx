import React, { useState, useEffect } from 'react';
import { InputRow } from './InputRow.jsx';
import { setComeBack } from './state.js';
import * as fetcher from './fetcher.js';


class Medication extends React.Component {
    constructor(props) {
        super(props);
        this.record = {...props.record};
        this.state = { };
    }

    render() {
        return (
            <tr className="medication">
                <td><button className="btn btn-outline-info" onClick={() => this.props.onEdit(this.record)}>Edit</button></td>
                <td></td>
                <td>{this.record['medication_id']}</td>
                <td>{this.record['name']}</td>
                <td>{this.record['description']}</td>
                <td>{this.record['quantity']}</td>
                <td>{this.record['stock']}</td>
                <td>{this.record['drug_class']}</td>
            </tr>
        )
    }
}


class MedicationTable extends React.Component {
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
                            {/* {Object.keys(this.records[0]).map((title) => <th>{title}</th>)} */}
                            <th>Medication ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Stock</th>
                            <th>Drug Class</th>
                        </tr>
                        {this.records.map((record) => <Medication record={record} onEdit={this.props.onEdit} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}


function EditMedication(props) {
    if (props.record === null) {
        return (<b>Please select a pharmacist to edit!</b>);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        const response = await fetch(fetcher.backendURL + '/edit/medications', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.record)
        });
        console.log(response.json());
        setComeBack('medications');
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <fieldset>
                <legend>Edit Medications</legend>
                <InputRow title="Name " value={props.record['name']} onChange={e => props.onChange({...props.record, 'name': e.target.value})} />
                <InputRow title="Description " value={props.record['description']} onChange={e => props.onChange({...props.record, 'description': e.target.value})} />
                <InputRow title="Quantity " value={props.record['quantity']} onChange={e => props.onChange({...props.record, 'quantity': e.target.value})} />
                <InputRow title="Stock " value={props.record['stock']} onChange={e => props.onChange({...props.record, 'stock': e.target.value})} />
                <InputRow title="Drug Class " value={props.record['drug_class']} onChange={e => props.onChange({...props.record, 'drug_class': e.target.value})} />
            </fieldset>
            <input type="submit" className="btn btn-info" value="Update" />
        </form>
    );
}

function CreateMedication(props) {
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stock, setStock] = useState('');
    const [drug_class, setDrugClass] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const record = { 'name': name, 'description': description, 'quantity': quantity, 'stock': stock, 'drug_class': drug_class };

        const response = await fetch(fetcher.backendURL + '/add/medications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        });
        console.log(response.json());
        setComeBack('medications');

    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <fieldset>
                <legend>Create Medication</legend>
                <InputRow title="Name " value={name} onChange={e => setName(e.target.value)} />
                <InputRow title="Description " value={description} onChange={e => setDescription(e.target.value)} />
                <InputRow title="Quantity " value={quantity} onChange={e => setQuantity(e.target.value)} />
                <InputRow title="Stock " value={stock} onChange={e => setStock(e.target.value)} />
                <InputRow title="Drug Class " value={drug_class} onChange={e => setDrugClass(e.target.value)} />
            </fieldset>
            <input type="submit" className="btn btn-success" value="Create" />
        </form>
    );
}

export class MedicationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeEditRecord: null, addPrompt: false };
    }

    handleEdit(record) {
        console.log(record);
        
        this.setState({ activeEditRecord: { ...record }, addPrompt: false });
    }

    render() {
        return (
            <div className="view">
                <h1 className="display-3">Medications</h1>
                <MedicationTable records={this.props.records} onEdit={record => this.handleEdit(record)} onAdd={() => this.setState({addPrompt: true, activeEditRecord: null})} />
                {this.state.activeEditRecord === null ? null : <EditMedication record={this.state.activeEditRecord} onChange={x => this.setState({ activeEditRecord : x})} />}
                {this.state.addPrompt ? <CreateMedication /> : null}
            </div>
        )
    }
}