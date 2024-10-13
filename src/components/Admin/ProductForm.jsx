import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const ProductForm = ({ onClose }) => {
const [productName, setProductName] = useState('');
const [productPrice, setProductPrice] = useState('');
const [excerpt, setExcerpt] = useState('');
const [description, setDescription] = useState('');
const [shippingType, setShippingType] = useState('physical');
const [shippingWeightWithUnit, setShippingWeightWithUnit] = useState('');
const [hasOptions, setHasOptions] = useState(false);
const [optionName, setOptionName] = useState('');
const [displayAs, setDisplayAs] = useState('text'); // Default option
const [optionValues, setOptionValues] = useState([{ value: '', label: '' }]);
const [pageTitle, setPageTitle] = useState('');
const [pageDescription, setPageDescription] = useState('');
const [urlHandle, setUrlHandle] = useState('');
const [inventoryStock, setInventoryStock] = useState('');
const [inventoryWeight, setInventoryWeight] = useState('');
const [inventoryWeightUnit, setInventoryWeightUnit] = useState('kg');
const [sku, setSku] = useState('');
const [barcode, setBarcode] = useState('');

const handleSubmit = (e) => {
e.preventDefault();
const weight = shippingWeightWithUnit.replace(/[^\d.]/g, ''); // Extract number
const unit = shippingWeightWithUnit.replace(/[\d.]/g, '').trim(); // Extract unit

console.log({
    productName,
    productPrice,
    excerpt,
    description,
    shippingType,
    weight,
    unit,
    hasOptions,
    optionName,
    displayAs,
    optionValues,
    pageTitle,
    pageDescription,
    urlHandle,
    inventoryStock,
    inventoryWeight,
    inventoryWeightUnit,
    sku,
    barcode
});

onClose();
};

const handleOptionValueChange = (index, field, value) => {
const newOptionValues = [...optionValues];
newOptionValues[index][field] = value;
setOptionValues(newOptionValues);
};

const addOptionValue = () => {
setOptionValues([...optionValues, { value: '', label: '' }]);
};

const deleteOptionValue = (index) => {
const newOptionValues = optionValues.filter((_, i) => i !== index);
setOptionValues(newOptionValues);
};

const handleSaveSearchEngine = () => {
// Action to save search engine state
console.log('Search engine listing saved:', {
    pageTitle,
    pageDescription,
    urlHandle,
});
};

return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
    <form onSubmit={handleSubmit}>

        {/* Product Information Section */}
        <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Product Information</h3>

        {/* Product Name */}
        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Product Name</label>
            <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            />
        </div>

        {/* Product Price */}
        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Product Price</label>
            <input
            type="number"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            />
        </div>

        {/* Excerpt */}
        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Excerpt</label>
            <ReactQuill
            value={excerpt}
            onChange={setExcerpt}
            className="mt-1 border border-gray-300 rounded-md shadow-sm"
            />
        </div>

        {/* Description */}
        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Description</label>
            <ReactQuill
            value={description}
            onChange={setDescription}
            className="mt-1 border border-gray-300 rounded-md shadow-sm"
            />
        </div>
        </div>

        {/* Specifications Section */}
        <div className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Specifications</h3>
        <input
            type="text"
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
            placeholder="Add Specification"
        />
        </div>

        {/* Gallery Section */}
        <div className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Gallery</h3>
        <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded-md"
            multiple
        />
        </div>

        {/* Pricing Section */}
        <div className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Pricing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1">
            <label className="block text-gray-700 font-medium">Price</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                type="text"
                className="pl-7 mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
                placeholder="0"
                />
            </div>
            </div>

            <div className="col-span-1">
            <label className="block text-gray-700 font-medium">Compare at Price</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                type="text"
                className="pl-7 mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
                placeholder="0"
                />
            </div>
            <p className="mt-1 text-sm text-gray-500">Customers won’t see this</p>
            </div>

            <div className="col-span-1">
            <label className="block text-gray-700 font-medium">Cost per item</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                type="text"
                className="pl-7 mt-1 p-2 border border-gray-300 rounded-md shadow-sm w-full"
                placeholder="0"
                />
            </div>
            </div>
        </div>
        </div>

        {/* Inventory Section */}
        <div className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Inventory</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1">
            <label className="block text-gray-700 font-medium">Stock</label>
            <input
                type="number"
                value={inventoryStock}
                onChange={(e) => setInventoryStock(e.target.value)}
                className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
            />
            </div>

            <div className="col-span-1">
            <label className="block text-gray-700 font-medium">Weight</label>
            <input
                type="text"
                value={inventoryWeight}
                onChange={(e) => setInventoryWeight(e.target.value)}
                className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
                placeholder="Enter weight"
            />
            <select
                value={inventoryWeightUnit}
                onChange={(e) => setInventoryWeightUnit(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm w-full"
            >
                <option value="kg">Kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
                <option value="oz">oz</option>
            </select>
            </div>

            <div className="col-span-1">
            <label className="block text-gray-700 font-medium">SKU (Stock Keeping Unit)</label>
            <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
            />
            </div>

            <div className="col-span-1">
            <label className="block text-gray-700 font-medium">Barcode (ISBN, UPC, GTIN, etc.)</label>
            <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
            />
            </div>
        </div>
        </div>

        {/* Shipping Section */}
        <div className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Shipping</h3>
        <div className="mb-4">
            <label className="inline-flex items-center">
            <input
                type="radio"
                name="shippingType"
                value="physical"
                checked={shippingType === 'physical'}
                onChange={() => setShippingType('physical')}
                className="form-radio"
            />
            <span className="ml-2">Physical product</span>
            </label>
            {shippingType === 'physical' && (
            <div className="mt-4">
                <label className="block text-gray-700 font-medium">Shipping Weight</label>
                <div className="flex items-center">
                <input
                    type="text"
                    value={shippingWeightWithUnit}
                    onChange={(e) => setShippingWeightWithUnit(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
                    placeholder="Enter weight and unit (e.g., 1 kg)"
                />
                </div>
            </div>
            )}
        </div>
        <div className="mb-4">
            <label className="inline-flex items-center">
            <input
                type="radio"
                name="shippingType"
                value="digital"
                checked={shippingType === 'digital'}
                onChange={() => setShippingType('digital')}
                className="form-radio"
            />
            <span className="ml-2">Digital product or service</span>
            </label>
            {shippingType === 'digital' && (
            <div className="mt-4">
                <label className="block text-gray-700 font-medium">Upload a file</label>
                <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-md"
                multiple
                />
                <p className="text-sm text-gray-500 mt-2">Drag and drop files here or click to upload.</p>
            </div>
            )}
        </div>
        </div>

        {/* Options Section */}
        <div className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Options</h3>
        <label className="inline-flex items-center mb-4">
            <input
            type="checkbox"
            checked={hasOptions}
            onChange={(e) => setHasOptions(e.target.checked)}
            className="form-checkbox"
            />
            <span className="ml-2">This product has options like size or color</span>
        </label>
        {hasOptions && (
            <div className="p-4 border border-gray-300 rounded-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Option Name</label>
                <input
                type="text"
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Display as</label>
                <select
                value={displayAs}
                onChange={(e) => setDisplayAs(e.target.value)}
                className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
                >
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="color">Color</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Option Values</label>
                {optionValues.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                    type="text"
                    placeholder="Value"
                    value={option.value}
                    onChange={(e) => handleOptionValueChange(index, 'value', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm w-1/2 mr-2"
                    />
                    <input
                    type="text"
                    placeholder="Label"
                    value={option.label}
                    onChange={(e) => handleOptionValueChange(index, 'label', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm w-1/2 mr-2"
                    />
                    <button
                    type="button"
                    onClick={() => deleteOptionValue(index)}
                    className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                    >
                    Delete
                    </button>
                </div>
                ))}

                <button
                type="button"
                onClick={addOptionValue}
                className="bg-[#52a2c9] text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                Add More
                </button>

                <div className="flex justify-end space-x-4 mt-4">
                <button
                    type="button"
                    className="bg-[#52a2c9] text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Save Options
                </button>
                </div>
            </div>
            </div>
        )}
        </div>

        {/* Page Section */}
        <div className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Search Engine Listing Preview</h3>
        <div className="flex justify-between items-center mb-4">
            <button
            type="button"
            onClick={handleSaveSearchEngine}
            className="text-[#52a2c9] hover:underline"
            >
            Save
            </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
            Add a description to see how this collection might appear in a search engine listing.
        </p>

        {/* Page Title */}
        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Page Title</label>
            <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
            />
            <p className="text-sm text-gray-500">{pageTitle.length} of 70 characters used</p>
        </div>

        {/* Description */}
        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
            value={pageDescription}
            onChange={(e) => setPageDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
            rows="3"
            ></textarea>
            <p className="text-sm text-gray-500">{pageDescription.length} of 320 characters used</p>
        </div>

        {/* URL Handle */}
        <div className="mb-4">
            <label className="block text-gray-700 font-medium">URL Handle</label>
            <input
            type="text"
            value={urlHandle}
            onChange={(e) => setUrlHandle(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
            />
            <p className="text-sm text-gray-500">URL: {urlHandle || 'new-product'}</p>
        </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end space-x-4">
        <button
            type="button"
            onClick={onClose}
            className="bg-white text-[#52a2c9] border border-[#52a2c9] py-2 px-4 rounded hover:bg-gray-100"
        >
            Cancel
        </button>
        <button
            type="submit"
            className="bg-[#52a2c9] text-white py-2 px-4 rounded hover:bg-blue-600"
        >
            Add Product
        </button>
        </div>
    </form>
    </div>
</div>
);
};

export default ProductForm;
