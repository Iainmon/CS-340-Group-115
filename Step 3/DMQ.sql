

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
    m.name as medication_name,
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




select 
    ps.prescription_id,
    ps.status,
    ph.first_name as pharmacist_first_name,
    ph.last_name as pharmacist_last_name,
    ps.update_date
from prescription_status ps left join pharmacists ph on ps.pharmacist_id = ph.pharmacist_id
order by ps.update_date desc;


-- insert into prescription_status (prescription_id, pharmacist_id, status)



