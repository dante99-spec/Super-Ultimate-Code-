import db from "../models/index";
let getAllBookings = () => {
    return new Promise(async (resolve, reject) => {
        try{
             let data = await db.bookings.findAll({
                attributes:{
                    exclude: ['token', 'createdAt', 'updatedAt']
                },
        
             })
             resolve({
                 errCode: 0,
                 errMessage: 'ok',
                 data
             })
        }catch(e){
            reject(e)
        }
  
    })
  }

  module.exports = {
    getAllBookings: getAllBookings
}