ALTER TABLE `stakloram2022`.`buyer` 
ADD COLUMN `buyer_account` VARCHAR(245) NULL AFTER `buyer_jbkjs`;
UPDATE stakloram2022.buyer SET buyer.buyer_account='' WHERE buyer.buyer_id>0;