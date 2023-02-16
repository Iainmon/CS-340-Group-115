import React, { useState, useEffect } from 'react';
import { InputRow } from './InputRow.jsx';


class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.record = {...props.record};
        this.state = { };
    }

    render() {
        return (
            <tr className="customer">
                <td><button className="btn btn-outline-info" onClick={() => this.props.onEdit(this.record)}>Edit</button></td>
                <td></td>
                <td>{this.record['customer_id']}</td>
                <td>{this.record['first_name']}</td>
                <td>{this.record['last_name']}</td>
                <td>{this.record['address']}</td>
                <td>{this.record['phone_number']}</td>
            </tr>
        )
    }
}


class CustomerTable extends React.Component {
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
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                        </tr>
                        {this.records.map((record) => <Customer record={record} onEdit={this.props.onEdit} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}


function EditCustomer(props) {
    if (props.record === null) {
        return (<b>Please select a customer to edit!</b>);
    }
    return (
        <form onSubmit={() => true}>
            <fieldset>
                <legend>Edit Customer</legend>
                <InputRow title="First Name" value={props.record['first_name']} onChange={e => props.onChange({...props.record, 'first_name': e.target.value})} />
                <InputRow title="Last Name" value={props.record['last_name']} onChange={e => props.onChange({...props.record, 'last_name': e.target.value})} />
                <InputRow title="Address" value={props.record['address']} onChange={e => props.onChange({...props.record, 'address': e.target.value})} />
                <InputRow title="Phone Number" value={props.record['phone_number']} onChange={e => props.onChange({...props.record, 'phone_number': e.target.value})} />
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
    );
}

function CreateCustomer(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <form onSubmit={() => true}>
            <fieldset>
                <legend>Create Customer</legend>
                <InputRow title="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <InputRow title="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                <InputRow title="Address" value={address} onChange={e => setAddress(e.target.value)} />
                <InputRow title="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
    );
}


export class CustomerView extends React.Component {
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
                <h1 className="display-3">Customers</h1>
                <CustomerTable records={this.props.records} onEdit={record => this.handleEdit(record)} onAdd={() => this.setState({addPrompt: true})} />
                {this.state.activeEditRecord === null ? null : <EditCustomer record={this.state.activeEditRecord} onChange={x => this.setState({ activeEditRecord : x})} />}
                {this.state.addPrompt ? <CreateCustomer /> : null}
            </div>
        )
    }
}