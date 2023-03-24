const xmlPaymentType1 = 
`<?xml version="1.0" encoding="UTF-8"?>
<request>
<reqtype>1</reqtype>
<mode> CHK</mode>
	<date>20070323</date>
<tranid>0001234567</tranid>
<fromacctinfo>
<bank/>
<branch>328</branch>
<account>8811016933</account>
<currency>USD</currency>
<name>JMCAUTOSUPPLIES LTD</name>
</fromacctinfo>
<traninfo>
<amount>135000000</amount>
<currency>JPY</currency>
</traninfo>
<beneinfo>
<account>3288811600265TTD</account>
<name>DON JOSEPH RAMGOOLAM</name>
<address>LAST LAP ROAD</address>
<city>GREEN STREET</city>
<country>UPSTAIRS THE BAKERY 54</country>
</beneinfo>
<benebankinfo>
<biccode/>
<abanumber/>
<abanetwork/>
<name>RESONABANK</name>
<address>KOMYOIKE BRANCH</address>
<city>OSAKA</city>
<country>JAPAN</country>
</benebankinfo>
<interbankinfo>
<biccode/>
<abanumber/>
<abanetwork/>
<name>RESONABANK</name>
<address>KOMYOIKE BRANCH</address>
<city>OSAKA</city>
<country>JAPAN</country>
</interbankinfo>
<swiftinfo>
<charges>SHA</charges>
<priority>N</priority>
</swiftinfo>
<charge1>
 	<name>SERVICE FEE</name>
 	<amount>1500</amount>
 	<currency>USD</currency>
 </charge1>
<rate1></rate1>                                      
<rate2></rate2>                                         
<insrate></insrate>                                     
<origid></origid>
<cbcode>01</cbcode>
<memo>SPRWIRE001</memo>
</request>
`

module.exports = xmlPaymentType1;