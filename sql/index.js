const sql = {};

sql.query = {
  // Search
  all_caretaker_rating_asc_price_asc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 GROUP BY c.email, t.daily_price ORDER BY c.rating ASC, t.daily_price ASC',
  filtered_location_caretaker_rating_asc_price_asc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 GROUP BY c.email, t.daily_price ORDER BY c.rating ASC, t.daily_price ASC',
  filtered_location_pet_type_caretaker_rating_asc_price_asc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) GROUP BY c.email, t.daily_price ORDER BY c.rating ASC, t.daily_price ASC',
  filtered_pet_type_caretaker_rating_asc_price_asc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) GROUP BY c.email, t.daily_price ORDER BY c.rating ASC, t.daily_price ASC',
  all_caretaker_rating_asc_price_desc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 GROUP BY c.email, t.daily_price ORDER BY c.rating ASC, t.daily_price DESC NULLS LAST',
  filtered_location_caretaker_rating_asc_price_desc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 GROUP BY c.email, t.daily_price ORDER BY c.rating ASC, t.daily_price DESC NULLS LAST',
  filtered_location_pet_type_caretaker_rating_asc_price_desc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) GROUP BY c.email, t.daily_price ORDER BY c.rating ASC, t.daily_price DESC NULLS LAST',
  filtered_pet_type_caretaker_rating_asc_price_desc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) GROUP BY c.email, t.daily_price ORDER BY c.rating ASC, t.daily_price DESC NULLS LAST',
  all_caretaker_rating_desc_price_asc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 GROUP BY c.email, t.daily_price ORDER BY c.rating DESC NULLS LAST, t.daily_price ASC',
  filtered_location_caretaker_rating_desc_price_asc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 GROUP BY c.email, t.daily_price ORDER BY c.rating DESC NULLS LAST, t.daily_price ASC',
  filtered_location_pet_type_caretaker_rating_desc_price_asc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) GROUP BY c.email, t.daily_price ORDER BY c.rating DESC NULLS LAST, t.daily_price ASC',
  filtered_pet_type_caretaker_rating_desc_price_asc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) GROUP BY c.email, t.daily_price ORDER BY c.rating DESC NULLS LAST, t.daily_price ASC',
  all_caretaker_rating_desc_price_desc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 GROUP BY c.email, t.daily_price ORDER BY c.rating DESC NULLS LAST, t.daily_price DESC NULLS LAST',
  filtered_location_caretaker_rating_desc_price_desc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 GROUP BY c.email, t.daily_price ORDER BY c.rating DESC NULLS LAST, t.daily_price DESC NULLS LAST',
  filtered_location_pet_type_caretaker_rating_desc_price_desc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND c.location = $3 AND NOT EXISTS(SELECT UNNEST($4::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) GROUP BY c.email, t.daily_price ORDER BY c.rating DESC NULLS LAST, t.daily_price DESC NULLS LAST',
  filtered_pet_type_caretaker_rating_desc_price_desc:
    'SELECT c.email, c.name, c.location, c.rating, c.job, ARRAY_AGG(t.daily_price + p.base_daily_price) AS price, ARRAY_AGG(t.pet_type) AS pet_types, ARRAY_AGG(a.start_date) AS start_date, ARRAY_AGG(a.end_date) AS end_date FROM care_taker c INNER JOIN can_take_care_of t ON c.email = t.email INNER JOIN pet_type p ON t.pet_type = p.name INNER JOIN indicates_availability as a ON c.email = a.email WHERE a.start_date <= $1 AND a.end_date >= $2 AND NOT EXISTS(SELECT UNNEST($3::varchar[]) AS pet_type EXCEPT SELECT pet_type from can_take_care_of t1 WHERE t1.email = t.email) GROUP BY c.email, t.daily_price ORDER BY c.rating DESC NULLS LAST, t.daily_price DESC NULLS LAST',
  //pre-bid
  caretaker_to_bid: 'SELECT * FROM care_taker WHERE email = $1',
  my_pets_that_can_take_care_of:
    "SELECT * FROM own_pet O INNER JOIN is_of I ON O.pet_name = I.pet_name AND O.email = I.owner_email WHERE O.email = $1 AND I.pet_type IN (SELECT C.pet_type FROM can_take_care_of C WHERE C.email=$2 INTERSECT SELECT I.pet_type FROM own_pet O INNER JOIN is_of I ON O.pet_name = I.pet_name AND O.email = I.owner_email WHERE O.email = $1)",
  all_pet_types: 'SELECT * FROM pet_type ORDER BY name',
  selected_pet_type: 'SELECT * FROM pet_type WHERE name=$1',
  first_4_pet_types: 'SELECT * FROM pet_type ORDER BY name LIMIT 4',
  first_4_caretakers:
    "SELECT C.name, C.email, SUM(H.num_pet_days) AS num_pet_days FROM care_taker C, hire H WHERE C.email = H.ct_email AND H.hire_status = 'completed' GROUP BY C.email ORDER BY C.name LIMIT 4",
  caretaker_summary_info:
    "SELECT C.name, C.email, SUM(H.num_pet_days) AS num_pet_days, SUM(H.total_cost) AS total_cost, EXTRACT(MONTH FROM H.transaction_date) AS month FROM care_taker C, hire H WHERE C.email = H.ct_email AND H.hire_status = 'completed' GROUP BY C.email, EXTRACT(MONTH FROM H.transaction_date)",
  num_pets_taken_care_of_in_current_month:
    "SELECT COUNT(DISTINCT pet_name) FROM hire WHERE date_part('month', start_date) = date_part('month', CURRENT_DATE) AND date_part('year', start_date) = date_part('year', CURRENT_DATE) AND hire_status = 'completed'",
  num_transactions_in_current_month:
  "SELECT COUNT(*) FROM hire WHERE date_part('month', transaction_date) = date_part('month', CURRENT_DATE) AND date_part('year', transaction_date) = date_part('year', CURRENT_DATE) AND hire_status != 'cancelled' AND hire_status != 'completed' AND hire_status != 'rejected'",
  num_transactions_in_each_month_and_year_PT:
  "SELECT concat(concat(month, '/'), year) as date, count FROM (SELECT date_part('month', transaction_date) AS month, date_part('year', transaction_date) AS year, COUNT(transaction_date) AS count FROM hire WHERE ct_email IN (SELECT PT.email FROM part_timer PT) GROUP BY date_part('month', transaction_date), date_part('year', transaction_date) ORDER BY year ASC, month) as derivedtable",
  num_transactions_in_each_month_and_year_FT:
  "SELECT concat(concat(month, '/'), year) as date, count FROM (SELECT date_part('month', transaction_date) AS month, date_part('year', transaction_date) AS year, COUNT(transaction_date) AS count FROM hire WHERE ct_email IN (SELECT FT.email FROM full_timer FT) GROUP BY date_part('month', transaction_date), date_part('year', transaction_date) ORDER BY year ASC, month) as derivedtable",
  num_transactions_in_each_month_and_year:
  "SELECT * FROM (SELECT concat(concat(month, '/'), year) as date, count_PT FROM (SELECT date_part('month', transaction_date) AS month, date_part('year', transaction_date) AS year, COUNT(transaction_date) AS count_PT FROM hire WHERE ct_email IN (SELECT PT.email FROM part_timer PT) GROUP BY date_part('month', transaction_date), date_part('year', transaction_date) ORDER BY year ASC, month) as derivedtable) as table1 FULL JOIN (SELECT concat(concat(month, '/'), year) as date, count_FT FROM (SELECT date_part('month', transaction_date) AS month, date_part('year', transaction_date) AS year, COUNT(transaction_date) AS count_FT FROM hire WHERE ct_email IN (SELECT FT.email FROM full_timer FT) GROUP BY date_part('month', transaction_date), date_part('year', transaction_date) ORDER BY year ASC, month) as derivedtable2) as table2 on table1.date = table2.date",
  // Insertion
  add_pet_type: 'INSERT INTO pet_type (name, base_daily_price) VALUES($1,$2)',

  // top 4 ratings
  caretaker_top_ratings:
    'SELECT name, location, rating, job, email FROM care_taker WHERE location = $1 ORDER BY rating DESC LIMIT 4',
  // 4 most recent transactions
  recent_trxn_po:
    'SELECT H.hire_status, H.start_date, H.end_date, C.name AS ct_name, C.email AS ct_email, P.name AS po_name, H.pet_name, H.rating, H.review_text FROM hire H INNER JOIN care_taker C ON H.ct_email = C.email INNER JOIN pet_owner P ON H.owner_email = P.email WHERE H.owner_email = $1 ORDER BY H.transaction_date DESC LIMIT 4',
  // 4 of my pets
  my_pets:
    'SELECT * FROM own_pet O INNER JOIN is_of I ON O.pet_name = I.pet_name AND O.email = I.owner_email WHERE O.email = $1 AND deleted = false LIMIT 4',
  all_my_pets:
    'SELECT * FROM own_pet O INNER JOIN is_of I ON O.pet_name = I.pet_name AND O.email = I.owner_email WHERE O.email = $1  AND deleted = false',
  get_pet_info:
    'SELECT * FROM own_pet O INNER JOIN is_of I ON O.pet_name = I.pet_name AND O.email = I.owner_email WHERE O.email = $1 AND O.pet_name = $2',
  get_po_info:
    'SELECT P.email, P.name, P.password, P.location, P.address, C.number, C.expiry FROM pet_owner P LEFT JOIN has_credit_card C ON P.email = C.email WHERE P.email = $1',
  get_ct_info: 'SELECT * FROM care_taker WHERE email = $1',
  get_my_trxn:
    "SELECT C.email AS ct_email, C.name as ct_name, *, CASE WHEN H.hire_status = 'pendingAccept' THEN 1 ELSE 2 END AS button FROM hire H INNER JOIN care_taker C ON H.ct_email = C.email INNER JOIN own_pet O ON H.pet_name = O.pet_name AND H.owner_email = O.email WHERE H.owner_email = $1 ORDER BY transaction_date DESC, start_date DESC, end_date DESC",
  get_ct_trxn:
    'SELECT C.name AS ct_name, C.email AS ct_email, H.hire_status, H.start_date, H.end_date, H.rating, H.review_text, P.name AS po_name, I.pet_type AS type, H.pet_name FROM care_taker C INNER JOIN hire H ON C.email = H.ct_email INNER JOIN pet_owner P ON P.email = H.owner_email INNER JOIN is_of I ON I.owner_email = P.email WHERE C.email = $1 ORDER BY H.transaction_date DESC LIMIT 4',
  get_a_hire:
    'SELECT * FROM hire WHERE owner_email = $1 AND ct_email = $2 AND start_date = $3 AND end_date = $4 AND pet_name = $5',
  get_ct_type: 'SELECT job FROM care_taker WHERE email = $1',
  dates_caring: 'SELECT start_date, end_date FROM hire WHERE ct_email = $1',
  part_timer_availability:
    'SELECT start_date, end_date FROM indicates_availability WHERE email = $1',
  full_timer_leave:
    'SELECT start_date, end_date FROM has_leave WHERE email = $1',
  delete_bid:
    'DELETE FROM hire WHERE owner_email = $1 AND ct_email = $2 AND start_date = $3 AND end_date = $4 AND pet_name = $5',
  petFromType:
    'SELECT pet_name FROM is_of WHERE owner_email = $1 AND pet_type = $2',
  add_bid:
    "INSERT INTO hire(owner_email, pet_name, ct_email, num_pet_days, total_cost, hire_status, method_of_pet_transfer, start_date, end_date, transaction_date) VALUES ($1, $2, $3, $4, $5, 'pendingAccept', $6, $7, $8, $9)",
  dailyPriceGivenTypeAndCT:
    'SELECT daily_price FROM can_take_care_of WHERE email = $1 AND pet_type = $2',
  ownerAddress: 'SELECT address FROM pet_owner WHERE email = $1',
  petTypeFromOwnerAndName:
    'SELECT pet_type FROM is_of WHERE owner_email = $1 AND pet_name = $2',
  payForBid:
    "UPDATE hire SET method_of_payment = $1, hire_status= 'inProgress' WHERE owner_email = $2 AND pet_name = $3 AND ct_email = $4 AND start_date = $5 AND end_date = $6",
  all_pet_types: 'SELECT name FROM pet_type',
  add_pet: 'CALL "add_pet"($1, $2, $3, $4)',
  update_po_info: 'CALL "edit_po_info"($1, $2, $3, $4, $5, $6, $7)',
  update_po_info_no_pw: 'CALL "edit_po_info_no_pw"($1, $2, $3, $4, $5, $6)',
  delete_pet: 'UPDATE own_pet SET deleted = true WHERE pet_name = $1 AND email = $2;',
  recent_trxn_general_completed: "SELECT H.hire_status, H.start_date, H.end_date, C.name AS ct_name, C.email AS ct_email, P.name AS po_name, H.pet_name, H.rating, H.review_text FROM hire H INNER JOIN care_taker C ON H.ct_email = C.email INNER JOIN pet_owner P ON H.owner_email = P.email WHERE H.hire_status = 'completed' AND H.rating IS NOT NULL ORDER BY H.rating DESC, H.transaction_date DESC LIMIT 4",
  best_ct: "SELECT * FROM care_taker ORDER BY rating LIMIT 4"
};

module.exports = sql;