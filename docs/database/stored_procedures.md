# Stored procedures

- Simple example of stored procedures creation and call (example 1):

```sql

DELIMITER //

CREATE PROCEDURE FirstProc()
BEGIN
	SELECT 1 AS OurResult;
END;
//

DELIMITER ;

CALL FirstProc();

```

- Simple example of stored procedures creation and call (example 2):

```sql

DELIMITER //

CREATE OR REPLACE PROCEDURE FirstProc()
BEGIN
	SELECT * FROM actor;
END;
//

DELIMITER ;

CALL FirstProc();

DROP PROCEDURE FirstProc;

```

- Simple example of stored procedures creation and call (example 3):

```sql

USE sakila;

DELIMITER //

CREATE OR REPLACE PROCEDURE GetActorbyID(IN actorid INT)
BEGIN
	SELECT *
	FROM actor
	WHERE actor_id = actorid;
END
//

DELIMITER ;

CALL GetActorbyID(1);
CALL GetActorbyID(5);
CALL GetActorbyID(10);

```

- Example of stored procedure which returns values (example 1):

```sql

USE sakila;

DELIMITER //

CREATE OR REPLACE PROCEDURE GetActorFullNamebyID(IN actorid, OUT FullName VARCHAR(100))
BEGIN
	SELECT CONCAT(first_name, ' ', last_name) INTO FullName
	FORM actor
	WHERE actor_id = actorid;
END
//

DELIMITER ;

CALL GetActorFullNamebyID(1, @FullName);
SELECT @FullName ActorName;

CALL GetActorFullNamebyID(5, @FullName);
SELECT @FullName ActorName;

CALL GetActorFullNamebyID(10, @FullName);
SELECT @FullName ActorName;

CALL GetActorFullNamebyID(10, @FullName);
SELECT LENGTH(@FullName) ActorName;

```

- Example of stored procedure which returns values (example 2):

```sql

USE sakila;

DELIMITER //

CREATE OR REPLACE PROCEDURE UpdateActorName(IN actorid INT, IN FirstName VARCHAR(100), OUT OldFirstName VARCHAR(100))
BEGIN
	SELECT first_name INTO OldFirstName
	FROM actor
	WHERE actor_id = actorid;

	UPDATE actor
	SET first_name = FirstName
	WHERE actor_id = actorid;
END
//

DELIMITER ;


CALL UpdateActorName(1, 'Nice', @OldFistName);
SELECT @OldFistName OldFirstName

```

- Example usage of multiple stored procedures (example 1):

```sql

USE sakila;

DELIMITER //

CREATE OR REPLACE PROCEDURE HighestGrossingMovie()
BEGIN
	SELECT film.film_id, SUM(amount) TotalAmount
	FROM rental
	INNER JOIN payment ON payment.rental_id = rental.rental_id
	INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id
	INNER JOIN film ON film.film_id = inventory.film_id
	GROUP BY film.film_id
	ORDER BY TotalAmount DESC;
END
//

DELIMITER ;

CALL HighestGrossingMovie();

DELIMITER //

CREATE OR REPLACE PROCEDURE MaxRentedMovie()
BEGIN
	SELECT film.film_id, COUNT(rental.rental_id) MaxRented
	FROM rental
	INNER JOIN payment ON payment.rental_id = rental.rental_id
	INNER JOIN inventory ON inventory.inverntory_id = rental.inventory_id
	INNER JOIN film ON film.film_id = inventory.film_id
	GROUP BY film.film_id
	ORDER BY MaxRented DESC;
END
//

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE TopMovies()
BEGIN
	CALL HighestGrossingMovie()
	CALL MaxRentedMovie()
END
//

DELIMITER ;

CALL TopMovies();

```

- Example usage of multiple stored procedures (example 2):

```sql

USE sakila;

DROP TABLE SPLog;
CREATE TABLE SPLog (Connection INT, SysUser VARCHAR(100), RunDT DATETIME);

DELIMITER //

CREATE OR REPLACE PROCEDURE SPLog()
BEGIN
	INSERT INTO SPLog
	SELECT CONNECTION_ID(), USER(), CURRENT_TIMESTAMP();
END
//

DELIMITER ;

CALL SPLog();

SELECT * FROM SPLog;


DELIMITER //

CREATE OR REPLACE PROCEDURE HighestGrossingMovie()
BEGIN
	DROP TEMPORARY TABLE IF EXISTS HighestGrossingMovie;

	CREATE TEMPORARY TABLE HighestGrossingMovie (film_id INT, TotalAmount INT);

	INSERT INTO HighestGrossingMovie
	SELECT film.film_id, SUM(amount) TotalAmount
	FROM rental
	INNER JOIN payment ON payment.rental_id = rental.rental_id
	INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id
	INNER JOIN film ON film.film_id = inventory.film_id
	GROUP BY film.film_id
	ORDER BY TotalAmount DESC;
END
//

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE MaxRentedMovie()
BEGIN
	DROP TEMPORARY TABLE IF EXISTS MaxRentedMovie;

	CREATE TEMPORARY TABLE MaxRentedMovie (film_id INT, MaxRented INT);

	INSERT INTO MaxRentedMovie
	SELECT film.film_id, COUNT(rental.rental_id) MaxRented
	FROM rental
	INNER JOIN payment ON payment.rental_id = rental.rental_id
	INNER JOIN inventory ON inventory.inverntory_id = rental.inventory_id
	INNER JOIN film ON film.film_id = inventory.film_id
	GROUP BY film.film_id
	ORDER BY MaxRented DESC;
END


DELIMITER //

CREATE OR REPLACE PROCEDURE Top5Movie(IN FilmID INT)
BEGIN

	call HighestGrossingMovie();
	call MaxRentedMovie()

	(SELECT film_id, TotalAmount AS Answer, 'Gross Amount'
	FROM HighestGrossingMovie
	WHERE film_id = FilmID OR FilmID = 0
	ORDER BY TotalAmount DESC
	LIMIT 5)
	UNION ALL
	(SELECT film_id, MaxRented AS Answer, 'Total Rents'
	FROM MaxRentedMovie
	WHERE film_id = FilmID OR FilmID = 0
	LIMIT 5);

	CALL SPLOG();
END

```

- Example usage of multiple stored procedures (example 3):


```sql

USE sakila;

DROP TABLE SPLog;
CREATE TABLE SPLog (Connection INT, SysUser VARCHAR(100), RunDT DATETIME);

DELIMITER //

CREATE OR REPLACE PROCEDURE SPLog()
BEGIN
	INSERT INTO SPLog
	SELECT CONNECTION_ID(), USER(), CURRENT_TIMESTAMP();
END
//

DELIMITER ;

CALL SPLog();

SELECT * FROM SPLog;


DELIMITER //

CREATE OR REPLACE PROCEDURE HighestGrossingMovie()
BEGIN
	DROP TEMPORARY TABLE IF EXISTS HighestGrossingMovie;

	CREATE TEMPORARY TABLE HighestGrossingMovie (film_id INT, TotalAmount INT);

	INSERT INTO HighestGrossingMovie
	SELECT film.film_id, SUM(amount) TotalAmount
	FROM rental
	INNER JOIN payment ON payment.rental_id = rental.rental_id
	INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id
	INNER JOIN film ON film.film_id = inventory.film_id
	GROUP BY film.film_id
	ORDER BY TotalAmount DESC;
END
//

DELIMITER ;

DELIMITER //

CREATE OR REPLACE PROCEDURE MaxRentedMovie()
BEGIN
	DROP TEMPORARY TABLE IF EXISTS MaxRentedMovie;

	CREATE TEMPORARY TABLE MaxRentedMovie (film_id INT, MaxRented INT);

	INSERT INTO MaxRentedMovie
	SELECT film.film_id, COUNT(rental.rental_id) MaxRented
	FROM rental
	INNER JOIN payment ON payment.rental_id = rental.rental_id
	INNER JOIN inventory ON inventory.inverntory_id = rental.inventory_id
	INNER JOIN film ON film.film_id = inventory.film_id
	GROUP BY film.film_id
	ORDER BY MaxRented DESC;
END


DELIMITER //

CREATE OR REPLACE PROCEDURE Top5Movie(IN FilmID INT)
BEGIN

	call HighestGrossingMovie();
	call MaxRentedMovie()

	(SELECT film_id, TotalAmount AS Answer, 'Gross Amount'
	FROM HighestGrossingMovie
	WHERE film_id = FilmID OR FilmID = 0
	ORDER BY TotalAmount DESC
	LIMIT 5)
	UNION ALL
	(SELECT film_id, MaxRented AS Answer, 'Total Rents'
	FROM MaxRentedMovie
	WHERE film_id = FilmID OR FilmID = 0
	LIMIT 5);

	CALL SPLOG();
END


```

- Query for stored procedures:


```sql

USE sakila;

SELECT ROUTINE_SCHEMA, ROUTINE_NAME, ROUTINE_DEFINITION
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_TYPE='PROCEDURE';

SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_TYPE='PROCEDURE';

SHOW CREATE PROCEDURE rewards_report;
SHOW CREATE PROCEDURE film_in_stock;

```
