import React from 'react'
import { useNavigate } from 'react-router-dom'

function CouponsList() {
    const navigate=useNavigate();
    function goTOAddCoupons(){
        navigate("/addCoupon");
    }
    return (
        <>
            <button
                onClick={goTOAddCoupons}
                className="px-3 py-2 mr-7.5 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
                ➕ Add Coupons
            </button>
        </>
    )
}

export default CouponsList