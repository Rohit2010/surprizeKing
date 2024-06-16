const { vendorService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { objectId } = require("../utils/queryPHandler");

const createVendor = catchAsync(async (req, res) => {
    // const {} = req.body;
    console.log(req.body)
    const newVendor = await vendorService.createVendor(req.body);
    return res.json(newVendor)
})

const getAllVendors = catchAsync(async (req, res) => {
    const {search} = req.query;

    const vendors = await vendorService.getVendors(search);

    res.json(vendors)
})
const getVendorById = catchAsync(async (req, res) => {
    const {vendorId} = req.params;

    const vendor =await  vendorService.getVendorById(objectId(vendorId));

    res.json(vendor)
})

module.exports = {
    createVendor,
    getAllVendors,
    getVendorById
}