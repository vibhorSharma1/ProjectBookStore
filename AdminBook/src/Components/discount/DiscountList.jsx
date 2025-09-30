import React from 'react'
import { useNavigate } from 'react-router-dom'
function DiscountList() {
    const navigate=useNavigate();
    function goTOAddDiscount(){
        navigate('/addDiscount');
    }
    return (
        <>
            <div className='flex justify-end mt-5'>
                <button
                onClick={goTOAddDiscount}
                className="px-3 py-2 mr-7.5  rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
                ➕ Add Discount
            </button>
            </div>
        </>
    )
}

export default DiscountList