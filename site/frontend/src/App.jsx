import React, { useState, useEffect } from 'react';
import { tables } from './data.js';


class Pharmacist extends React.Component {
    constructor(props) {
        super(props);
        this.record = {...props.record};
        this.state = { };
    }

    render() {
        return (
            <tr className="pharmacist">
                <td><button onClick={() => this.props.onEdit(this.record)}>Edit</button></td>
                <td></td>
                <td>{this.record['pharmacist_id']}</td>
                <td>{this.record['job_title']}</td>
                <td>{this.record['first_name']}</td>
                <td>{this.record['last_name']}</td>
                <td>{this.record['address']}</td>
                <td>{this.record['phone_number']}</td>
            </tr>
        )
    }
}




class PharmacistTable extends React.Component {
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
                            <th></th>
                            <th></th>
                            {Object.keys(this.records[0]).map((title) => <th>{title}</th>)}
                        </tr>
                        {this.records.map((record) => <Pharmacist record={record} onEdit={this.props.onEdit} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

function InputRow({title, value, onChange}) {
    return (
        <div className="row align-items-centercol-auto">
            <div className="col-auto">
                <label className="col-form-label">{title}</label>
            </div>
            <div className="col-auto">
                <input type="text" className="form-control" value={value} onChange={onChange} />
            </div>
        </div>
    );
}

function EditPharmacist(props) {
    if (props.record === null) {
        return (<b>Please select a pharmacist to edit!</b>);
    }
    return (
        <form onSubmit={() => true}>
            <fieldset>
                <legend>Disabled fieldset example</legend>
                <InputRow title="First Name" value={props.record['first_name']} onChange={e => props.onChange({...props.record, 'first_name': e.target.value})} />
                <InputRow title="Last Name" value={props.record['last_name']} onChange={e => props.onChange({...props.record, 'last_name': e.target.value})} />
                <InputRow title="Job Title" value={props.record['job_title']} onChange={e => props.onChange({...props.record, 'job_title': e.target.value})} />
                <InputRow title="Address" value={props.record['address']} onChange={e => props.onChange({...props.record, 'address': e.target.value})} />
                <InputRow title="Phone Number" value={props.record['phone_number']} onChange={e => props.onChange({...props.record, 'phone_number': e.target.value})} />
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
    );
}


class PharmacistView extends React.Component {
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
                <h1>Pharmacists</h1>
                <PharmacistTable records={this.props.records} onEdit={record => this.handleEdit(record)} />
                {this.state.activeEditRecord === null ? null : <EditPharmacist record={this.state.activeEditRecord} onChange={x => this.setState({ activeEditRecord : x})} />}
            </div>
        )
    }
}


export function App (props) {

    for (const table of Object.values(tables)) {
        // console.log(table);
        console.table(table);
    }
    
    return <div className="App">
        <h1>This is the {props.name} view. </h1>
        <PharmacistView records={tables['pharmacists']} />
        </div>;



}