import bookingService from '../service/bookingService'

let getAllBookings = async (req, res) => {
    try {
        let infor = await bookingService.getAllBookings()
       
        return res.status(200).json(
            infor
        )
    }catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the sever '
        })
    }
}
module.exports = {
    getAllBookings: getAllBookings,
}