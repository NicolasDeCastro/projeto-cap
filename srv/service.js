const cds = require("@sap/cds");


module.exports = async (srv) => {
    const sOrd = await cds.connect.to('API_SALES_ORDER_SRV');
    srv.on('READ','A_SalesOrder', (req) => {
       const data= sOrd.transaction(req).send({
            query: req.query,
            headers: {
                apikey:'SrVbnjeMtX9Zqqj6Gs4lsRxQywSGAoJm'
            }
            
        });
       return data;
    });

    srv.on('GetSalesOrderAmountBySoldToParty', async  (req) => {
        const data =  await sOrd.transaction(req).send({
             query: SELECT.from(sOrd.entities.A_SalesOrder).limit(1000),
             headers: {
                 apikey:'SrVbnjeMtX9Zqqj6Gs4lsRxQywSGAoJm'
             }
             
         });
    
    const  SalesOrderAmountBySoldToParty = data.reduce((acc, curr) => {
        if (acc[curr.SoldToParty]){
            acc[curr.SoldToParty] = Number(Number(acc[curr.SoldToParty]) + curr.TotalNetAmount).toFixed(2);
            return acc;
        }
        acc[curr.SoldToParty] = curr.TotalNetAmount.toFixed(2);

        return acc;

    }, {});


return SalesOrderAmountBySoldToParty;
})
}