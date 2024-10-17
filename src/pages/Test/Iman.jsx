



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import ReviewForm from '../../components/Client/ReviewForm/ReviewForm'; // استيراد مكون الفورم

// const Iman = () => {
//   const [isFormVisible, setFormVisible] = useState(false); // حالة للتحكم في عرض الفورم
//   const productId = "670c69c30cb1e8caab9d8489"; // استبدل هذا بالمعرف الحقيقي للمنتج

//   const handleLinkClick = (e) => {
//     e.preventDefault(); // منع الانتقال الفعلي عند الضغط على الرابط
//     setFormVisible(true); // عرض الفورم
//   };

//   const handleCloseForm = () => {
//     setFormVisible(false); // إغلاق الفورم عند الانتهاء
//   };

//   return (
//     <div>
//       <Link to="/" onClick={handleLinkClick}>
//         اكتب مراجعة
//       </Link> {/* الرابط لفتح الفورم */}

//       {isFormVisible && (
//         <ReviewForm 
//           productId={productId} // تمرير معرف المنتج هنا
//           onClose={handleCloseForm} 
//         />
//       )}
//     </div>
//   );
// };

// export default Iman;




















// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom'; 
// import ReviewForm from '../../components/Client/ReviewForm/ReviewForm'; 
// const Iman = () => {
//   const [isFormVisible, setFormVisible] = useState(false); 
//   const { productId } = useParams(); 

//   const handleLinkClick = (e) => {
//     e.preventDefault(); 
//     setFormVisible(true); 
//   };

//   const handleCloseForm = () => {
//     setFormVisible(false); 
//   };

//   return (
//     <div>
//       <Link to="/" onClick={handleLinkClick}>
//         اكتب مراجعة
//       </Link> 

//       {isFormVisible && (
//         <ReviewForm 
//           productId={productId} // تمرير معرف المنتج إلى ReviewForm
//           onClose={handleCloseForm} 
//         />
//       )}
//     </div>
//   );
// };

// export default Iman;
