SELECT * FROM stakloram.user INTO OUTFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\user.csv'
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n';

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\user.csv' 
INTO TABLE stakloram2022.user 
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n';

-- Insert role
insert into stakloram2022.role values (null, 'admin');
insert into stakloram2022.role values (null, 'worker');
insert into stakloram2022.role values (null, 'worker_chief');
insert into stakloram2022.role values (null, 'backoffice');


insert into stakloram2022.user_has_role values (1,1);
insert into stakloram2022.user_has_role values (1,2);
insert into stakloram2022.user_has_role values (1,3);
insert into stakloram2022.user_has_role values (1,4);

insert into stakloram2022.user_has_role values (3,3);
insert into stakloram2022.user_has_role values (4,3);

insert into stakloram2022.user_has_role values (5,1);
insert into stakloram2022.user_has_role values (5,2);
insert into stakloram2022.user_has_role values (5,3);
insert into stakloram2022.user_has_role values (5,4);

insert into stakloram2022.country values (1,'Srbija');
insert into stakloram2022.country values (2,'Italy');
insert into stakloram2022.country values (3,'Hrvatska');

INSERT into stakloram2022.city value(null, 15076, 'Ovada Italy',2);
INSERT into stakloram2022.city value(null, 32236, 'Ilok',1);
INSERT into stakloram2022.city value(null, 31000, 'Osijek',3);
INSERT into stakloram2022.city value(null, 16210, 'Vlasotince',1);
