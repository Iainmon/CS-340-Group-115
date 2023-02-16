

-- Populating pharmacists list
select * from pharmacists;

-- Populating customers list
select * from customers;

-- Populating medications list
select * from medications;


-- Populating prescriptions list
select 
    prescription.prescription_id,
    prescription_status.status,
    prescription_status.update_date,
    customer.first_name as customer_first_name,
    customer.last_name as customer_last_name,
    medication.name as medication_name,
    prescription.dosage,
    prescription.refil_count,
    prescription.refil_frequency
from prescription 
    inner join prescription_status on prescription.prescription_id = prescription_status.prescription_id
    inner join customer on prescription.customer_id = customer.customer_id
    inner join medication on prescription.medication_id = medication.medication_id;

