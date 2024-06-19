const { vendorService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const { objectId } = require("../utils/queryPHandler");

const createVendor = catchAsync(async (req, res) => {
    // const {} = req.body;
    console.log(req.body)
    const newVendor = await vendorService.createVendor(req.body);
    return res.json(newVendor)
})

const updateVendor = catchAsync(async (req, res) => {
    const {vendorId} = req.params;
    const data = req.body;

    const updateVen = await vendorService.updateVendor(vendorId, data);
    
    res.json(updateVen)
})

const getAllVendors = catchAsync(async (req, res) => {
    const { vendorName, email, businessName, contactNumber } = req.query;

    const vendors = await vendorService.getVendors({vendorName, email, businessName, contactNumber});

    res.json(vendors)
})
const getVendorById = catchAsync(async (req, res) => {
    const {vendorId} = req.params;

    const vendor =await  vendorService.getVendorById(objectId(vendorId));

    res.json(vendor)
})

// add vendor services
const addVendorServices = catchAsync(async (req, res) => {
    const {vendorId, userId, services} = req.body;

    const newVendorServices = await vendorService.addOrEditServices({vendorId, userId, services});

    res.json(newVendorServices)
})
const getvendorServices = catchAsync(async (req, res) => {
    const {vendorId} = req.params;

    const getVendorService = await vendorService.getVendorServices(vendorId);
    res.json(getVendorService)
})

module.exports = {
    createVendor,
    getAllVendors,
    getVendorById,
    updateVendor,
    addVendorServices,
    getvendorServices
}