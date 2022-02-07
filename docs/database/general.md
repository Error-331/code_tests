# General

## Terms

- DML - A data manipulation language is a computer programming language used for adding, deleting, and modifying data in a database. 
A DML is often a sublanguage of a broader database language such as SQL, with the DML comprising some of the operators in the language;

- ETL - is short for extract, transform, load, three database functions that are combined into one tool to pull data out of one database and 
place it into another database. Extract is the process of reading data from a database;

- MPP Database - (short for massively parallel processing) is a storage structure designed to handle multiple operations simultaneously by 
several processing units. In this type of data warehouse architecture, each processing unit works independently with its own operating system 
and dedicated memory;

- OLAP (online analytical processing, интерактивная аналитическая обработка) - технология обработки данных, заключающаяся в подготовке суммарной 
(агрегированной) информации на основе больших массивов данных, структурированных по многомерному принципу. Реализации технологии OLAP являются 
компонентами программных решений класса Business Intelligence.

- OLTP (англ. Online Transaction Processing), транзакционная система — обработка транзакций в реальном времени. Способ организации БД, при 
котором система работает с небольшими по размерам транзакциями, но идущими большим потоком, и при этом клиенту требуется от системы минимальное 
время отклика;

- Таблица фактов - низкоуровневые данные с кучей внешних ключей на размерности, первичный ключ сдесь составной (из совокупности внешних ключей),
обычно такая таблица сделана по типу 'снежинки';

- Суррога́тный ключ - грубо говоря ключ не имеющий отношения к данным (пример id c автоинкрементом);

## Locking

### Optimistic concurrency control (OCC) 

- allows multiple transactions to modify data without interfering with each other; 
- while a transaction is running - the data that will be edited isn’t locked;
- before a transaction commits, optimistic concurrency control checks whether a conflicting modification exists;
- if a conflict exists, the committing transaction is rolled back;
- MySQL supports pessimistic locking by default;

### Pessimistic concurrency control

- pessimistic locking applies a lock to the data so other transactions can’t access the same data; 
- after the transaction commits, the lock is released;
