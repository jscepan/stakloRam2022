ALTER TABLE `stakloram2022`.`country` 
ADD COLUMN `country_identification_code` VARCHAR(145) NULL AFTER `country_description`;
UPDATE stakloram2022.country SET country.country_identification_code='RS' WHERE country.country_id=1;
UPDATE stakloram2022.country SET country.country_identification_code='ITA' WHERE country.country_id=2;
UPDATE stakloram2022.country SET country.country_identification_code='CRO' WHERE country.country_id=3;