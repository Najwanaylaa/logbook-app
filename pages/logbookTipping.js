import { useState } from 'react';

export default function LogbookTippingForm() {
  const [logbook, setLogbook] = useState({
    date: '',
    productCode: 'XEBJ3',  // Default
    quantityTarget: 540.45, // Default for XEBJ3
    rawMaterialName: 'Minor',
    batchNumber: '',
    ibcNumber: 'IBC1', // Default
    quantity: 0,
    yield: 0,
    operator: ''
  });

  const handleProductCodeChange = (e) => {
    const selectedCode = e.target.value;
    setLogbook({
      ...logbook,
      productCode: selectedCode,
      quantityTarget: selectedCode === 'XEBJ3' ? 540.45 : 630.62, // Update target based on product
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogbook({ ...logbook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/logbookTipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logbook)
      });
      const result = await response.json();
      alert('Logbook entry added successfully!');
    } catch (error) {
      console.error('Error adding logbook entry', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date: 
        <input type="datetime-local" name="date" value={logbook.date} onChange={handleChange} />
      </label>
      
      <label>Product Code: 
        <select name="productCode" value={logbook.productCode} onChange={handleProductCodeChange}>
          <option value="XEBJ3">XEBJ3</option>
          <option value="XEGM1">XEGM1</option>
        </select>
      </label>

      <label>Quantity Target (Kg): 
        <input type="number" name="quantityTarget" value={logbook.quantityTarget} readOnly />
      </label>

      <label>Raw Material Name: 
        <input type="text" name="rawMaterialName" value={logbook.rawMaterialName} readOnly />
      </label>

      <label>Batch Number: 
        <input type="text" name="batchNumber" value={logbook.batchNumber} onChange={handleChange} />
      </label>

      <label>IBC Number: 
        <select name="ibcNumber" value={logbook.ibcNumber} onChange={handleChange}>
          {[...Array(55)].map((_, i) => (
            <option key={i} value={`IBC${i + 1}`}>IBC {i + 1}</option>
          ))}
        </select>
      </label>

      <label>Quantity (Kg): 
        <input type="number" name="quantity" value={logbook.quantity} onChange={handleChange} />
      </label>

      <label>Yield (%): 
        <input type="number" name="yield" step="0.01" value={logbook.yield} onChange={handleChange} />
      </label>

      <label>Operator: 
        <input type="text" name="operator" value={logbook.operator} onChange={handleChange} />
      </label>

      <button type="submit">Submit Logbook</button>
    </form>
  );
}
