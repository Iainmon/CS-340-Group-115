import React, { useState, useEffect } from 'react';
import { tables } from './data.js';
import { PharmacistView } from './Pharmacist.jsx';
import { CustomerView } from './Customer.jsx';
import { PrescriptionView } from './Prescription.jsx';
import { MedicationView } from './Medication.jsx';
import { PrescriptionStatusView } from './PrescriptionStatus.jsx';
import {
    Container,
    Nav,
} from 'react-bootstrap';

import { state } from './state.js';

function BasicExample() {
  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export function App (props) {

    for (const table of Object.values(tables)) {
        // console.log(table);
        console.table(table);
    }

    const [activePage, setActivePage] = useState('home');
    state.viewStateModifier = setActivePage;

    const homePage = (
      <div className="container home">
        <h1 className="display-3">Welcome to the Pharmacy Database</h1>
        <p className="lead">This is a database for a pharmacy. It contains information about pharmacists, customers, prescriptions, and medications.</p>
        <p className="lead">You can view the data in the database by clicking on the links in the navigation bar above.</p>
        <hr></hr>
        <p className="lead">The <b>Pharmacists</b> page shows a list of pharmacists, for which you can add, edit, and delete pharmacists.</p>
        <p className="lead">The <b>Customers</b> page shows a list of customers and their information. You can add and update customer information, but you may not delete a customer because they are medical records.</p>
        <p className="lead">The <b>Prescriptions</b> page shows a list of all prescriptions and their statuses. You can change information for a prescription and update its status.</p>
        <p className="lead">The <b>Medications</b> page shows a list of medications which you can edit and add new medications.</p>
        <p className="lead">The <b>Prescription Status</b> page shows a list of prescription statuses.</p>
      </div>
    )
    
    return (
        <div className="container App">
            {/* <BasicExample /> */}
            <h1 className="text-center display-1">Pharmacy Database</h1>
            <Nav
              activeKey={activePage}
              onSelect={setActivePage}>
              <Nav.Item>
                <Nav.Link eventKey="home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="pharmacists">Pharmacists</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="customers">Customers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="prescriptions">Prescriptions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="medications">Medications</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="prescription_status">Prescription Status</Nav.Link>
              </Nav.Item>
            </Nav>
            <hr></hr>
            <div className="p-5" >
                { activePage === 'home' ? homePage : null}
                { activePage === 'pharmacists' ? <PharmacistView records={tables['pharmacists']} /> : null }
                { activePage === 'customers' ? <CustomerView records={tables['customers']} /> : null }
                { activePage === 'prescriptions' ? <PrescriptionView records={tables['prescriptions']} /> : null }
                { activePage === 'medications' ? <MedicationView records={tables['medications']} /> : null }
                { activePage === 'prescription_status' ? <PrescriptionStatusView records={tables['prescription_status']} /> : null }

                {/* <PharmacistView records={tables['pharmacists']} />
                <CustomerView records={tables['customers']} />
                <PrescriptionView records={tables['prescriptions']} />
                <MedicationView records={tables['medications']} />
                <PrescriptionStatusView records={tables['prescription_status']} /> */}
            </div>
        </div>);



}