// src/components/Addresses.jsx
import React from 'react';
import { Plus } from 'lucide-react'; 

const Addresses = () => {
  return (
    <div className="space-y-6">
      
      <div className="text-gray-900 font-thin mt-4">
          <p className="mb-">No addresses added yet.</p>
      </div>

      <button className="px-6 py-3 border border-black text-black font-medium hover:bg-black hover:text-white transition-colors duration-200 flex items-center gap-2">
        <Plus size={18} /> Add New Address
      </button>
    </div>
  );
};

export default Addresses;