export class APiUtils{

apiContext:any;
loginpayload:string;

constructor(apiContext:any,loginpayload:string){
    this.apiContext = apiContext;
    this.loginpayload = loginpayload; // This is generic request for Login so adding it under constructor so based on input given it will map

}

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
               {
                 data:this.loginpayload
               });
            const loginresponsejson = await loginResponse.json();//fetching and storing resoponse in JSON
            const token = loginresponsejson.token; //fetching token from JSON
            console.log(token);
            return token;
    }
    

    async createOrder(orderpayload:string){
        let response = {token:String, OrderId:String}; //we are using response.token / resposne.orderid - in type script that need to be defined in object as what type it is 
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderpayload,
        //Header will be passes in Key value pair 
        headers:{
            'Authorization': response.token,
            'Content-Type' : 'application/json'
        }
    });
    const Orderresponsejson = await orderResponse.json();
    console.log(Orderresponsejson);
          const OrderId = Orderresponsejson.orders[0];
          response.OrderId = OrderId
          return response; //Return Response Object which has Token and Orderid - That will be accessed in test class 
    }
}
module.exports = {APiUtils};

