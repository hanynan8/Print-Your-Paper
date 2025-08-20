import React, { useState, useEffect } from "react";

const printersData = [
  {
    id: 1,
    name: "مطبعة جنوب الوادى",
    description: "متخصصون في الطباعة التجارية والمنتجات الترويجية",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800",
    owner: {
      name: "حمادة سعيد",
      bio: "مؤسس مطبعة جنوب الوادى بخبرة أكثر من 20 سنة في مجال الطباعة، حاصل على جائزة التميز في الطباعة عام 2020",
      image: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
    },
    products: [
      { id: 1, name: "بيزنس كارد", price: 1 },
      { id: 2, name: "بروشورات", price: 3 },
      { id: 3, name: "ستيكرز", price: 5 },
    ],
    contact: { phone: "0551234567", email: "riyadh@print.com" },
  },
  {
    id: 2,
    name: "مطبعة العقاد",
    description: "نقدم خدمات الطباعة الرقمية السريعة عالية الجودة",
    image: "one.jpg", // رابط الصورة الأولى (طابعة أوفست صناعية)
    owner: {
      name: "محسن السمان",
      bio: "خبير في الطباعة الرقمية وتقنياتها الحديثة، يمتلك خبرة 25 عاماً في مجال تصميم وإنتاج المواد المطبوعة",
      image: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
    },
    products: [
      { id: 4, name: "كتب وكتالوجات", price: 200 },
      { id: 5, name: " بيزنس كارد", price: 3 },
      { id: 6, name: "نوت بوك", price: 70 },
    ],
    contact: { phone: "0557654321", email: "jeddah@print.com" },
  },
  {
    id: 3,
    name: "مطبعة التقدم",
    description: "حلول السبلميشن وال DTF ",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800",
    owner: {
      name: "جرجس رؤوف",
      bio: "رائد أعمال في مجال طباعة الملابس والمنتجات الترويجية، متخصصة في تقنيات الطباعة المتقدمة مثل السبلميشن والDTF",
      image: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
    },
    products: [
      { id: 7, name: "طباعة تيشرتات", price: 450 },
      { id: 8, name: "طباعة مجات", price: 150 },
      { id: 9, name: "شنط قماش ", price: 100 },
    ],
    contact: { phone: "0559876543", email: "dammam@print.com" },
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [cart, setCart] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [ownerMessages, setOwnerMessages] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // إظهار Toast
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const navigateTo = (page, printer = null) => {
    setCurrentPage(page);
    setSelectedPrinter(printer);
  };

  const addToCart = (product, printer) => {
    setCart([...cart, { ...product, printer: printer.name, cartId: Date.now() }]);
    showToast(`تم إضافة ${product.name} إلى طلباتك`);
  };

  const removeFromCart = (cartId) => {
    const newCart = cart.filter((item) => item.cartId !== cartId);
    setCart(newCart);
    showToast("تم حذف المنتج من طلباتك", "error");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    showToast("شكراً لتواصلكم معنا! سنرد عليكم في أقرب وقت.");
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleOwnerMessageChange = (printerId, message) => {
    setOwnerMessages({
      ...ownerMessages,
      [printerId]: message
    });
  };

  const sendMessageToOwner = (printerId) => {
    if (!ownerMessages[printerId] || ownerMessages[printerId].trim() === "") {
      showToast("يرجى كتابة رسالة قبل الإرسال", "error");
      return;
    }
    
    showToast("تم إرسال رسالتك إلى صاحب المطبعة بنجاح!");
    setOwnerMessages({
      ...ownerMessages,
      [printerId]: ""
    });
  };

  const confirmOrder = () => {
    if (cart.length === 0) {
      showToast("سلة التسوق فارغة. أضف منتجات أولاً", "error");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    showToast(
      `تم تأكيد طلبك بنجاح! المجموع: ${total} جنية. سيتم التواصل معك قريباً.`
    );
    setCart([]);
    navigateTo("home");
  };

  return (
    <div className="font-[Tajawal] bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="bg-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m4 4h4a2 2 0 002-2v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold"> حبارة برنت</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => navigateTo("home")}
              className="hover:text-yellow-300 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-blue-500"
            >
              الرئيسية
            </button>
            <button
              onClick={() => navigateTo("printers")}
              className="hover:text-yellow-300 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-blue-500"
            >
              المطابع
            </button>
            <button
              onClick={() => navigateTo("contact")}
              className="hover:text-yellow-300 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-blue-500"
            >
              اتصل بنا
            </button>
            <button
              onClick={() => navigateTo("cart")}
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors duration-200 flex items-center gap-2 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>طلباتي ({cart.length})</span>
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden bg-yellow-400 text-gray-900 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className={`${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 rtl:space-x-reverse max-w-md`}>
            {toast.type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:p-6">
        {currentPage === "home" && (
          <div className="text-center space-y-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                مرحباً بكم في موقع المطابع
              </h2>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                هنا يمكنكم التواصل مباشرة مع أصحاب المطابع وطلب منتجاتكم بسهولة وأمان
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white shadow-lg rounded-2xl p-6 transition-transform duration-300 hover:scale-105">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-6 0H5m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">تصفح المطابع</h3>
                <p className="text-gray-600">
                  اكتشف مجموعة من أفضل المطابع في منطقتك واختر ما يناسب احتياجاتك
                </p>
              </div>
              
              <div className="bg-white shadow-lg rounded-2xl p-6 transition-transform duration-300 hover:scale-105">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">اطلب منتجاتك</h3>
                <p className="text-gray-600">
                  اختر من بين مجموعة متنوعة من خدمات الطباعة وأضفها إلى سلة طلباتك
                </p>
              </div>
              
              <div className="bg-white shadow-lg rounded-2xl p-6 transition-transform duration-300 hover:scale-105">
                <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">تواصل مباشر</h3>
                <p className="text-gray-600">
                  تواصل مباشرة مع صاحب المطبعة لمناقشة تفاصيل طلبك واستفساراتك
                </p>
              </div>
            </div>
            
            <button
              className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              onClick={() => navigateTo("printers")}
            >
              <span>ابدأ الآن</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}

        {currentPage === "printers" && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">المطابع المتاحة</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {printersData.map((printer) => (
                <div
                  key={printer.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={printer.image}
                      alt={printer.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-xl font-semibold text-white p-4">{printer.name}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 mb-4 line-clamp-2">{printer.description}</p>
                    <button
                      onClick={() => navigateTo("printer-details", printer)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <span>عرض التفاصيل</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === "printer-details" && selectedPrinter && (
          <div className="max-w-4xl mx-auto">
            <button
              className="mb-6 text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-2"
              onClick={() => navigateTo("printers")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>عودة إلى المطابع</span>
            </button>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={selectedPrinter.image}
                  alt={selectedPrinter.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedPrinter.name}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6 text-lg">{selectedPrinter.description}</p>

                {/* Owner Information */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 border-b pb-2">صاحب المطبعة</h3>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <img
                      src={selectedPrinter.owner.image}
                      alt={selectedPrinter.owner.name}
                      className="w-24 h-24 rounded-full object-cover shadow-md flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{selectedPrinter.owner.name}</h4>
                      <p className="text-gray-600 mt-2 leading-relaxed">{selectedPrinter.owner.bio}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 border-b pb-2">المنتجات المتاحة</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {selectedPrinter.products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <h4 className="font-semibold text-gray-800">{product.name}</h4>
                      <p className="text-gray-600 mt-1">السعر: {product.price} جنية</p>
                      <button
                        onClick={() => addToCart(product, selectedPrinter)}
                        className="mt-3 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>إضافة إلى الطلبات</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Contact Owner */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4 border-b pb-2">تواصل مع صاحب المطبعة</h3>
                  <div className="space-y-4">
                    <textarea
                      value={ownerMessages[selectedPrinter.id] || ""}
                      onChange={(e) => handleOwnerMessageChange(selectedPrinter.id, e.target.value)}
                      placeholder="اكتب رسالتك لصاحب المطبعة هنا..."
                      className="w-full border border-gray-300 rounded-lg p-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    ></textarea>
                    <button
                      onClick={() => sendMessageToOwner(selectedPrinter.id)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>إرسال الرسالة</span>
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                      </div>
            </div>
          </div>
        )}

        {currentPage === "contact" && (
          <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">اتصل بنا</h2>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">الاسم:</label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">البريد الإلكتروني:</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">الرسالة:</label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>إرسال</span>
              </button>
            </form>
          </div>
        )}

        {currentPage === "cart" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">طلباتي</h2>
            {cart.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-6">لا توجد طلبات حتى الآن</p>
                <button
                  onClick={() => navigateTo("printers")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span>استمرار التسوق</span>
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-lg rounded-2xl p-6">
                <ul className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <li
                      key={item.cartId}
                      className="border-b border-gray-200 pb-4 flex justify-between items-start last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-gray-600 text-sm mt-1">
                          من <span className="font-medium">{item.printer}</span>
                        </p>
                        <p className="text-blue-600 font-medium mt-1">{item.price} جنية</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
                        aria-label="حذف"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-lg mb-4 flex justify-between">
                    <span>مجموع الطلبات:</span>
                    <span className="text-blue-600">{cart.reduce((total, item) => total + item.price, 0)} جنية</span>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={confirmOrder}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>تأكيد الطلب</span>
                    </button>
                    
                    <button
                      onClick={() => navigateTo("printers")}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>إضافة المزيد</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-6 text-center">
                  ملاحظة: بعد تأكيد الطلب، سيتم التواصل معك من قبل المطبعة خلال 24 ساعة
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center p-6 mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">عن حبارة برنت</h3>
              <p className="text-sm">منصة تواصل بين العملاء وأصحاب المطابع لطلب المنتجات الطباعية بسهولة وأمان</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigateTo("home")} className="hover:text-white transition-colors duration-200">الرئيسية</button></li>
                <li><button onClick={() => navigateTo("printers")} className="hover:text-white transition-colors duration-200">المطابع</button></li>
                <li><button onClick={() => navigateTo("contact")} className="hover:text-white transition-colors duration-200">اتصل بنا</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">التواصل الاجتماعي</h3>
              <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-400 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-red-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p>© 2025 حبارة برنت - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
}