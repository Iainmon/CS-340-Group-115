-- Populating pharmacists list
select * from pharmacists;

-- Populating customers list
select * from customers;

-- Populating medications list
select * from medications;


-- Populating prescriptions list
select 
    p.prescription_id,
    COALESCE(ps.status, NULL) as last_status,
    COALESCE(ps.update_date, NULL) as update_date,
    c.first_name as customer_first_name,
    c.last_name as customer_last_name,
    m.medication_name as medication_name,
    p.dosage,
    p.refill_count,
    p.refill_frequency
from prescriptions p
left join (
    select prescription_id, MAX(update_date) as latest_date
    from prescription_status
    group BY prescription_id
) as latest_status
on p.prescription_id = latest_status.prescription_id
left join prescription_status ps
on ps.prescription_id = latest_status.prescription_id and ps.update_date = latest_status.latest_date
join customers c on p.customer_id = c.customer_id
join medications m on p.medication_id = m.medication_id
group by p.prescription_id;


-- Populating prescription_status list

select 
    ps.prescription_id,
    ps.status,
    ph.first_name as pharmacist_first_name,
    ph.last_name as pharmacist_last_name,
    ps.update_date
from prescription_status ps 
left join pharmacists ph on ps.pharmacist_id = ph.pharmacist_id
order by ps.update_date desc;


-- Creating pharmacist
insert into pharmacists (first_name, last_name, job_title, address, phone_number)
values (:first_name, :last_name, :job_title, :address, :phone_number);

-- Creating customer
insert into customers (first_name, last_name, address, phone_number)
values (:first_name, :last_name, :address, :phone_number);

-- Creating prescription
insert into prescriptions (customer_id, medication_id, dosage, refill_count, refill_frequency)
values (:customer_id, :medication_id, :dosage, :refill_count, :refill_frequency);


-- Creating medication
insert into medications (medication_name, description, quantity, stock, drug_class)
values (:name, :description, :quantity, :stock, :drug_class);


-- Updating pharmacist
update pharmacists set
    first_name = :first_name,
    last_name = :last_name,
    job_title = :job_title,
    address = :address,
    phone_number = :phone_number
where pharmacist_id = :pharmacist_id;


-- Updating customer
update customers set
    first_name = :first_name,
    last_name = :last_name,
    address = :address,
    phone_number = :phone_number
where customer_id = :customer_id;


-- Updating prescription
update prescriptions set
    dosage = :dosage,
    refill_count = :refill_count,
    refill_frequency = :refill_frequency
where prescription_id = :prescription_id;

-- Updating (creating) prescription_status (will be run with above, if status is changed)
insert into prescription_status (prescription_id, pharmacist_id, status)
values (:prescription_id, :pharmacist_id, :status);


-- Updating medication
update medications set
    name = :name,
    description = :description,
    quantity = :quantity,
    stock = :stock,
    drug_class = :drug_class
where medication_id = :medication_id;


-- Deleting pharmacist
update prescription_status set
    pharmacist_id = null
where pharmacist_id = :pharmacist_id;
delete from pharmacists where pharmacist_id = :pharmacist_id;

-- Deleting customer
update prescriptions set
    customer_id = null
where customer_id = :customer_id;
delete from customers where customer_id = :customer_id

-- Deleting medication
update medications set
    medication_id = null
where medication_id = :medication_id;
delete from medications where medication_id = :medication_id


-- Deleting prescription
update prescription_status set
    prescription_id = null
where prescription_id = :prescription_id;
delete from prescriptions where prescription_id = :prescription_id


-- Get pharmacists for dropdown menu
select pharmacist_id, CONCAT(first_name, ' ', last_name) as name from pharmacists;

-- Get customers for dropdown menu
select customer_id, CONCAT(first_name, ' ', last_name) as name from customers;

-- Get medications for dropdown menu
select medication_id, CONCAT(medication_name, ' ', quantity) from medications;

