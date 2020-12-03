const sql = {};

sql.query = {
  // Search
  all_caretaker_rating_asc:
    "(SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.deleted = false GROUP BY c.email) UNION (SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name WHERE c.job = 'full_timer' AND c.deleted = false GROUP BY c.email EXCEPT SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN has_leave as h ON c.email = h.email WHERE c.job = 'full_timer' AND (h.start_date > $1 AND h.start_date < $2) OR (h.end_date > $1 AND h.end_date < $2) AND c.deleted = false GROUP BY c.email) ORDER BY rating ASC",
  filtered_location_caretaker_rating_asc:
    "(SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 AND c.deleted = false GROUP BY c.email) UNION (SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name WHERE c.job = 'full_timer' AND c.location = $3 AND c.deleted = false GROUP BY c.email EXCEPT SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN has_leave as h ON c.email = h.email WHERE c.job = 'full_timer' AND (h.start_date > $1 AND h.start_date < $2) OR (h.end_date > $1 AND h.end_date < $2) AND c.location = $3 AND c.deleted = false GROUP BY c.email) ORDER BY rating ASC",
  filtered_location_pet_type_caretaker_rating_asc:
    "(SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email) UNION (SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name WHERE c.job = 'full_timer' AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email EXCEPT SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN has_leave as h ON c.email = h.email WHERE c.job = 'full_timer' AND (h.start_date > $1 AND h.start_date < $2) OR (h.end_date > $1 AND h.end_date < $2) AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email) ORDER BY rating ASC",
  filtered_pet_type_caretaker_rating_asc:
    "(SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email) UNION (SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name WHERE c.job = 'full_timer' AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email EXCEPT SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN has_leave as h ON c.email = h.email WHERE c.job = 'full_timer' AND (h.start_date > $1 AND h.start_date < $2) OR (h.end_date > $1 AND h.end_date < $2) AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email) ORDER BY rating ASC",
  all_caretaker_rating_desc:
    "(SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.deleted = false GROUP BY c.email) UNION (SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name WHERE c.job = 'full_timer' AND c.deleted = false GROUP BY c.email EXCEPT SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN has_leave as h ON c.email = h.email WHERE c.job = 'full_timer' AND (h.start_date > $1 AND h.start_date < $2) OR (h.end_date > $1 AND h.end_date < $2) AND c.deleted = false GROUP BY c.email) ORDER BY rating DESC NULLS LAST",
  filtered_location_caretaker_rating_desc:
    "(SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 AND c.deleted = false GROUP BY c.email) UNION (SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name WHERE c.job = 'full_timer' AND c.location = $3 AND c.deleted = false GROUP BY c.email EXCEPT SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN has_leave as h ON c.email = h.email WHERE c.job = 'full_timer' AND (h.start_date > $1 AND h.start_date < $2) OR (h.end_date > $1 AND h.end_date < $2) AND c.location = $3 AND c.deleted = false GROUP BY c.email) ORDER BY rating DESC NULLS LAST",
  filtered_location_pet_type_caretaker_rating_desc:
    "(SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email) UNION (SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name WHERE c.job = 'full_timer' AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email EXCEPT SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN has_leave as h ON c.email = h.email WHERE c.job = 'full_timer' AND (h.start_date > $1 AND h.start_date < $2) OR (h.end_date > $1 AND h.end_date < $2) AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email) ORDER BY rating DESC NULLS LAST",
  filtered_pet_type_caretaker_rating_desc:
    "(SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email) UNION (SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name WHERE c.job = 'full_timer' AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email EXCEPT SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN has_leave as h ON c.email = h.email WHERE c.job = 'full_timer' AND (h.start_date > $1 AND h.start_date < $2) OR (h.end_date > $1 AND h.end_date < $2) AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) AND c.deleted = false GROUP BY c.email) ORDER BY rating DESC NULLS LAST",
  //pre-bid
  caretaker_to_bid: 'SELECT * FROM care_taker WHERE email = $1',
  my_pets_that_can_take_care_of:
    'SELECT * FROM own_pet O INNER JOIN is_of I ON O.pet_name = I.pet_name AND O.deleted = false AND O.email = I.owner_email WHERE O.email = $1 AND I.pet_type IN (SELECT C.pet_type FROM can_take_care_of C WHERE C.email=$2 INTERSECT SELECT I.pet_type FROM own_pet O INNER JOIN is_of I ON O.pet_name = I.pet_name AND O.email = I.owner_email WHERE O.email = $1)',
  all_pet_types: 'SELECT * FROM pet_type ORDER BY name',
  selected_pet_type: 'SELECT * FROM pet_type WHERE name=$1',
  first_4_pet_types: 'SELECT * FROM pet_type ORDER BY name LIMIT 4',
  first_4_caretakers:
    "SELECT C.name, C.email, SUM(H.num_pet_days) AS num_pet_days FROM care_taker C, hire H WHERE C.email = H.ct_email AND H.hire_status = 'completed' AND date_part('month', H.start_date) = date_part('month', CURRENT_DATE) AND date_part('year', H.start_date) = date_part('year', CURRENT_DATE) GROUP BY C.email ORDER BY C.name LIMIT 4",
  caretaker_summary_info:
    "SELECT C.name, C.email, SUM(H.num_pet_days) AS num_pet_days, SUM(H.total_cost) AS total_cost, EXTRACT(MONTH FROM H.transaction_date) AS month FROM care_taker C, hire H WHERE C.email = H.ct_email AND H.hire_status = 'completed' GROUP BY C.email, EXTRACT(MONTH FROM H.transaction_date)",
  caretaker_summary_info_curr_month:
    "SELECT C.name, C.email, SUM(H.num_pet_days) AS num_pet_days, SUM(H.total_cost) AS total_cost FROM care_taker C, hire H WHERE C.email = H.ct_email AND H.hire_status = 'completed' AND date_part('month', H.start_date) = date_part('month', CURRENT_DATE) AND date_part('year', H.start_date) = date_part('year', CURRENT_DATE) GROUP BY C.email",
  num_pets_taken_care_of_in_current_month:
    "SELECT COUNT(DISTINCT pet_name) FROM hire WHERE date_part('month', start_date) = date_part('month', CURRENT_DATE) AND date_part('year', start_date) = date_part('year', CURRENT_DATE) AND hire_status = 'completed'",
  active_transactions:
    "SELECT COUNT(*) FROM hire WHERE hire_status = 'pendingPayment' AND hire_status = 'paymentMade' AND hire_status = 'inProgress'",
  num_transactions_in_each_month_and_year_PT:
    "SELECT concat(concat(month, '/'), year) as date, count FROM (SELECT date_part('month', transaction_date) AS month, date_part('year', transaction_date) AS year, COUNT(transaction_date) AS count FROM hire WHERE ct_email IN (SELECT PT.email FROM part_timer PT) GROUP BY date_part('month', transaction_date), date_part('year', transaction_date) ORDER BY year ASC, month) as derivedtable",
  num_transactions_in_each_month_and_year_FT:
    "SELECT concat(concat(month, '/'), year) as date, count FROM (SELECT date_part('month', transaction_date) AS month, date_part('year', transaction_date) AS year, COUNT(transaction_date) AS count FROM hire WHERE ct_email IN (SELECT FT.email FROM full_timer FT) GROUP BY date_part('month', transaction_date), date_part('year', transaction_date) ORDER BY year ASC, month) as derivedtable",
  num_transactions_in_each_month_and_year:
    "SELECT * FROM (SELECT concat(concat(month, '/'), year) as date, count_PT FROM (SELECT date_part('month', transaction_date) AS month, date_part('year', transaction_date) AS year, COUNT(transaction_date) AS count_PT FROM hire WHERE ct_email IN (SELECT PT.email FROM part_timer PT) GROUP BY date_part('month', transaction_date), date_part('year', transaction_date) ORDER BY year desc, month desc) as derivedtable) AS table1 FULL JOIN (SELECT concat(concat(month, '/'), year) as date, count_FT FROM (SELECT date_part('month', transaction_date) AS month, date_part('year', transaction_date) AS year, COUNT(transaction_date) AS count_FT FROM hire WHERE ct_email IN (SELECT FT.email FROM full_timer FT) GROUP BY date_part('month', transaction_date), date_part('year', transaction_date) ORDER BY year desc, month desc) as derivedtable2) AS table2 ON table1.date = table2.date LIMIT 12",
  salary_to_be_paid: 'SELECT SUM(monthly_salary) FROM care_taker',
  base_daily_price_for_pet:
    'SELECT base_daily_price FROM pet_type WHERE name = $1',
  num_transactions_in_current_month_alldelivermethod:
    //  "SELECT COUNT(*) FROM hire WHERE hire_status != 'cancelled' AND hire_status != 'rejected' AND method_of_pet_transfer='cPickup' UNION SELECT COUNT(*) FROM hire WHERE hire_status != 'cancelled' AND hire_status != 'rejected' AND method_of_pet_transfer= 'oDeliver' UNION SELECT COUNT(*) FROM hire WHERE hire_status != 'cancelled' AND hire_status != 'rejected' AND method_of_pet_transfer= 'office';",
    "SELECT COUNT(*) FROM hire WHERE date_part('month', transaction_date) = date_part('month', CURRENT_DATE) AND date_part('year', transaction_date) = date_part('year', CURRENT_DATE) AND hire_status != 'cancelled' AND hire_status != 'rejected' AND method_of_pet_transfer='cPickup' UNION SELECT COUNT(*) FROM hire WHERE date_part('month', transaction_date) = date_part('month', CURRENT_DATE) AND date_part('year', transaction_date) = date_part('year', CURRENT_DATE) AND hire_status != 'cancelled' AND hire_status != 'rejected' AND method_of_pet_transfer= 'oDeliver' UNION SELECT COUNT(*) FROM hire WHERE date_part('month', transaction_date) = date_part('month', CURRENT_DATE) AND date_part('year', transaction_date) = date_part('year', CURRENT_DATE) AND hire_status != 'cancelled' AND hire_status != 'rejected' AND method_of_pet_transfer= 'office';",
  all_pt_total_salary_current_month:
    "SELECT SUM(salary_PT) FROM (SELECT SUM(total_cost)*75/100 AS salary_PT FROM hire WHERE ct_email IN (SELECT PT.email FROM part_timer PT) AND date_part('month', end_date) = date_part('month', CURRENT_DATE) AND date_part('year', end_date) = date_part('year', CURRENT_DATE) AND hire_status = 'completed' GROUP BY ct_email) AS table1",
  each_ft_num_pet_days:
    "SELECT SUM(num_pet_days) FROM hire WHERE ct_email IN (SELECT CT.email FROM full_timer FT) AND date_part('month', end_date) = date_part('month', CURRENT_DATE) AND date_part('year', end_date) = date_part('year', CURRENT_DATE) AND hire_status = 'completed' GROUP BY ct_email",
  //search transactions
  all_transactions_price_desc_rating_desc:
    'SELECT owner_email, pet_name, ct_email, num_pet_days, total_cost, hire_status, method_of_pet_transfer, transaction_date, rating FROM hire ORDER BY rating desc, total_cost desc',
  curr_month_transactions_price_desc_rating_desc:
    "SELECT owner_email, pet_name, ct_email, num_pet_days, total_cost, hire_status, method_of_pet_transfer, transaction_date, rating FROM hire WHERE date_part('month', transaction_date) = date_part('month', CURRENT_DATE) AND date_part('year', transaction_date) = date_part('year', CURRENT_DATE) ORDER BY rating desc, total_cost desc",
  filter_transactions_status_price_desc_rating_desc:
    'SELECT H.owner_email, H.pet_name, H.ct_email, H.num_pet_days, H.total_cost, H.hire_status, H.method_of_pet_transfer, H.transaction_date, H.rating FROM hire H WHERE H.hire_status IN (SELECT UNNEST($1::hire_status[]) AS H2) ORDER BY rating desc, total_cost desc',
  filter_currmonth_transactions_status_price_desc_rating_desc:
    "SELECT H.owner_email, H.pet_name, H.ct_email, H.num_pet_days, H.total_cost, H.hire_status, H.method_of_pet_transfer, H.transaction_date, H.rating FROM hire H WHERE H.hire_status IN (SELECT UNNEST($1::hire_status[]) AS H2) AND date_part('month', transaction_date) = date_part('month', CURRENT_DATE) AND date_part('year', transaction_date) = date_part('year', CURRENT_DATE) ORDER BY rating desc, total_cost desc",
  ct_pet_days:
    "SELECT SUM(H.num_pet_days) AS num_pet_days FROM hire H WHERE H.ct_email = $1 AND date_part('month', end_date) = date_part('month', CURRENT_DATE) AND date_part('year', end_date) = date_part('year', CURRENT_DATE) AND H.hire_status = 'completed'",
  ct_salary:
    "SELECT SUM(H.total_cost) AS total_cost FROM hire H WHERE H.ct_email = $1 AND date_part('month', end_date) = date_part('month', CURRENT_DATE) AND date_part('year', end_date) = date_part('year', CURRENT_DATE) AND H.hire_status = 'completed'",
  ct_rating:
    "SELECT AVG(H.rating) AS avg_rating FROM hire H WHERE H.ct_email = $1 AND H.hire_status = 'completed'",
  get_ct_by_email:
    'SELECT name, email, location, rating FROM care_taker WHERE email = $1',
  get_po_by_email:
    'SELECT name, email, location FROM pet_owner WHERE email = $1',
  get_admin_by_email:
    'SELECT name, email, password FROM pcs_admin WHERE email = $1',
  active_ct_for_manage_users:
    'SELECT name, email, location, rating, deleted FROM care_taker WHERE deleted=false',
  active_po_for_manage_users:
    'SELECT name, email, location, deleted FROM pet_owner WHERE deleted=false',
  inactive_ct_for_manage_users:
    'SELECT name, email, location, rating, deleted FROM care_taker WHERE deleted=true',
  inactive_po_for_manage_users:
    'SELECT name, email, location, deleted FROM pet_owner WHERE deleted=true',
  inactive_admin_for_manage_users:
    'SELECT name, email, is_super_admin, deleted FROM pcs_admin WHERE deleted=true',
  active_admin_for_manage_users:
    'SELECT name, email, is_super_admin, deleted FROM pcs_admin WHERE deleted=false',
  // Insertion
  add_pet_type: 'INSERT INTO pet_type (name, base_daily_price) VALUES($1,$2)',

  // Update:
  update_pet_type: 'UPDATE pet_type SET base_daily_price=$2 WHERE name=$1',
  update_admin: 'UPDATE pcs_admin SET name=$2, password=$3 WHERE email=$1',
  update_admin_no_pw: 'UPDATE pcs_admin SET name=$2 WHERE email=$1',
  delete_ct: 'UPDATE care_taker SET deleted=true WHERE email=$1',
  delete_po: 'UPDATE pet_owner SET deleted=true WHERE email=$1',
  delete_admin: 'UPDATE pcs_admin SET deleted=true WHERE email=$1',
  delete_super_admin: 'DELETE FROM pcs_admin WHERE email=$1',
  reactivate_ct: 'UPDATE care_taker SET deleted=false WHERE email=$1',
  reactivate_po: 'UPDATE pet_owner SET deleted=false WHERE email=$1',
  reactivate_admin: 'UPDATE pcs_admin SET deleted=false WHERE email=$1',

  // top 4 ratings
  caretaker_top_ratings:
    'SELECT name, location, rating, job, email FROM care_taker WHERE location = $1 AND rating IS NOT NULL ORDER BY rating DESC',
  // 4 most recent transactions
  recent_trxn_po:
    'SELECT H.hire_status, H.start_date, H.end_date, H.owner_email, C.name AS ct_name, C.email AS ct_email, P.name AS po_name, H.pet_name, H.rating, H.review_text FROM hire H INNER JOIN care_taker C ON H.ct_email = C.email INNER JOIN pet_owner P ON H.owner_email = P.email WHERE H.owner_email = $1 ORDER BY H.transaction_date DESC',
  all_my_pets:
    'SELECT * FROM own_pet O INNER JOIN is_of I ON O.pet_name = I.pet_name AND O.email = I.owner_email WHERE O.email = $1  AND deleted = false ORDER BY O.pet_name',
  all_my_pet_types:
    'SELECT * FROM can_take_care_of WHERE email = $1 ORDER BY pet_type ASC',
  all_my_leave_requests:
    'SELECT * FROM has_leave WHERE email = $1 ORDER BY start_date ASC',
  all_my_availability:
    'SELECT * FROM indicates_availability WHERE email = $1 ORDER BY start_date ASC',
  get_pet_info:
    'SELECT * FROM own_pet O INNER JOIN is_of I ON O.pet_name = I.pet_name AND O.email = I.owner_email WHERE O.email = $1 AND O.pet_name = $2',
  get_po_info:
    'SELECT P.email, P.name, P.password, P.location, P.address, C.number, C.expiry FROM pet_owner P LEFT JOIN has_credit_card C ON P.email = C.email WHERE P.email = $1',
  get_ct_info: 'SELECT * FROM care_taker WHERE email = $1',
  get_my_trxn:
    "SELECT C.email AS ct_email, C.name as ct_name, H.address as addr, H.rating as trxn_rating, *, CASE WHEN H.hire_status = 'pendingAccept' THEN 1 ELSE 2 END AS button FROM hire H INNER JOIN care_taker C ON H.ct_email = C.email INNER JOIN own_pet O ON H.pet_name = O.pet_name AND H.owner_email = O.email WHERE H.owner_email = $1 ORDER BY transaction_date DESC, start_date DESC, end_date DESC",
  get_all_ct_trxns:
    "SELECT C.email AS ct_email, C.name as ct_name, H.address as addr, H.rating as trxn_rating, *, CASE WHEN H.hire_status = 'pendingAccept' THEN 1 ELSE 2 END AS button, H.owner_email AS owner_email, H.review_text AS review_text, I.pet_type AS pet_type, H.method_of_payment AS payment_method FROM hire H INNER JOIN care_taker C ON H.ct_email = C.email INNER JOIN own_pet O ON H.pet_name = O.pet_name AND H.owner_email = O.email INNER JOIN is_of I ON H.pet_name = I.pet_name AND H.owner_email = I.owner_email WHERE H.ct_email = $1 ORDER BY transaction_date DESC, start_date DESC, end_date DESC",
  get_ct_trxn:
    "SELECT C.name AS ct_name, C.email AS ct_email, H.hire_status, H.start_date, H.end_date, H.rating, H.review_text, P.name AS po_name, I.pet_type AS type, H.pet_name FROM care_taker C INNER JOIN hire H ON C.email = H.ct_email INNER JOIN pet_owner P ON P.email = H.owner_email INNER JOIN is_of I ON I.owner_email = P.email AND I.pet_name = H.pet_name WHERE C.email = $1 AND H.hire_status = 'completed' ORDER BY H.transaction_date DESC LIMIT 4",
  get_4_ct_trxns:
    'SELECT C.name AS ct_name, C.email AS ct_email, H.hire_status, H.start_date, H.end_date, H.rating, H.review_text, P.name AS po_name, I.pet_type AS type, H.pet_name FROM care_taker C INNER JOIN hire H ON C.email = H.ct_email INNER JOIN pet_owner P ON P.email = H.owner_email INNER JOIN is_of I ON I.owner_email = P.email AND I.pet_name = H.pet_name WHERE C.email = $1 ORDER BY H.transaction_date DESC LIMIT 4',
  get_ct_prices: 'SELECT * FROM can_take_care_of WHERE email = $1',
  get_a_hire:
    'SELECT * FROM hire WHERE owner_email = $1 AND ct_email = $2 AND start_date = $3 AND end_date = $4 AND pet_name = $5',
  get_ct_type: 'SELECT job FROM care_taker WHERE email = $1',
  dates_caring:
    "SELECT start_date, end_date FROM hire WHERE ct_email = $1 AND start_date >= $2 AND (hire_status = 'pendingPayment' OR hire_status = 'paymentMade' OR hire_status = 'inProgress')",
  part_timer_availability:
    'SELECT start_date, end_date FROM indicates_availability WHERE email = $1',
  full_timer_leave:
    'SELECT start_date, end_date FROM has_leave WHERE email = $1',
  delete_bid:
    'DELETE FROM hire WHERE owner_email = $1 AND ct_email = $2 AND start_date = $3 AND end_date = $4 AND pet_name = $5',
  petFromType:
    'SELECT pet_name FROM is_of WHERE owner_email = $1 AND pet_type = $2',
  add_bid:
    "INSERT INTO hire(owner_email, pet_name, ct_email, num_pet_days, total_cost, hire_status, method_of_pet_transfer, start_date, end_date, transaction_date, address) VALUES ($1, $2, $3, $4, $5, 'pendingAccept', $6, $7, $8, $9, $10)",
  pets_occupied_dates:
    'SELECT * FROM hire WHERE owner_email = $1 and pet_name = $2 AND start_date >= $3',
  dailyPriceGivenTypeAndCT:
    'SELECT daily_price FROM can_take_care_of WHERE email = $1 AND pet_type = $2',
  ownerAddress: 'SELECT address FROM pet_owner WHERE email = $1',
  petTypeFromOwnerAndName:
    'SELECT pet_type FROM is_of WHERE owner_email = $1 AND pet_name = $2',
  payForBid: 'CALL pay_for_bid($1, $2, $3, $4, $5, $6)',
  add_pet: 'SELECT "add_pet"($1, $2, $3, $4)',
  edit_pet: 'UPDATE own_pet SET special_requirement = $1 WHERE pet_name = $2 AND email = $3;',
  add_pet_type_ct: 'CALL "add_pet_type_ct"($1, $2, $3)',
  add_leave: 'CALL "add_leave"($1, $2, $3)',
  add_availability: 'CALL "add_availability"($1, $2, $3)',
  update_po_info: 'CALL "edit_po_info"($1, $2, $3, $4, $5, $6, $7)',
  update_po_info_no_pw: 'CALL "edit_po_info_no_pw"($1, $2, $3, $4, $5, $6)',
  update_ct_info: 'CALL "edit_ct_info"($1, $2, $3, $4, $5, $6)',
  update_ct_info_no_pw: 'CALL "edit_ct_info_no_pw"($1, $2, $3, $4, $5)',
  delete_pet:
    'UPDATE own_pet SET deleted = true WHERE pet_name = $1 AND email = $2;',
  delete_pet_type_ct:
    'DELETE FROM can_take_care_of WHERE email = $1 AND pet_type = $2;',
  delete_leave: 'DELETE FROM has_leave WHERE email = $1 AND start_date = $2;',
  delete_availability:
    'DELETE FROM indicates_availability WHERE email = $1 AND start_date = $2;',
  recent_trxn_general_completed:
    "SELECT H.hire_status, H.start_date, H.end_date, C.name AS ct_name, C.email AS ct_email, P.name AS po_name, H.pet_name, H.rating, H.review_text FROM hire H INNER JOIN care_taker C ON H.ct_email = C.email INNER JOIN pet_owner P ON H.owner_email = P.email WHERE H.hire_status = 'completed' AND H.rating IS NOT NULL ORDER BY H.rating DESC, H.transaction_date DESC LIMIT 4",
  best_ct:
    'SELECT * FROM care_taker WHERE rating IS NOT NULL ORDER BY rating DESC LIMIT 4',
  give_review:
    'UPDATE hire SET rating = $1, review_text = $2 WHERE owner_email = $3 AND pet_name = $4 AND start_date = $5 AND end_date = $6 AND ct_email = $7',
  get_one_trxn:
    'SELECT * FROM hire WHERE owner_email = $1 AND pet_name = $2 AND start_date = $3 AND end_date = $4 AND ct_email = $5',
  delete_po_account: 'UPDATE pet_owner SET deleted = true WHERE email = $1',
  delete_ct_account: 'UPDATE care_taker SET deleted = true WHERE email = $1',
  receive_payment:
    "UPDATE hire SET hire_status = 'paymentMade' WHERE owner_email = $1 AND pet_name = $2 AND ct_email = $3 AND start_date = $4 AND end_date = $5",
  start_taking_care:
    "UPDATE hire SET hire_status = 'inProgress' WHERE owner_email = $1 AND pet_name = $2 AND ct_email = $3 AND start_date = $4 AND end_date = $5",
  done_taking_care:
    "UPDATE hire SET hire_status = 'completed' WHERE owner_email = $1 AND pet_name = $2 AND ct_email = $3 AND start_date = $4 AND end_date = $5",
  accept_bid:
    "UPDATE hire SET hire_status = 'pendingPayment' WHERE owner_email = $1 AND pet_name = $2 AND ct_email = $3 AND start_date = $4 AND end_date = $5",
  reject_bid:
    "UPDATE hire SET hire_status = 'rejected' WHERE owner_email = $1 AND pet_name = $2 AND ct_email = $3 AND start_date = $4 AND end_date = $5",
  monthly_wipe:
    "UPDATE care_taker c1 SET monthly_salary = CASE WHEN job = 'part_timer' THEN 0 ELSE 3000 END, monthly_pet_days = 0 WHERE c1.email IN (SELECT email FROM care_taker c2);",
  restore_pet:
    'UPDATE own_pet SET deleted = false WHERE pet_name = $1 AND email = $2'
};

module.exports = sql;
