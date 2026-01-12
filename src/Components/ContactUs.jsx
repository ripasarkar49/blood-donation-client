import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import Reveal from "./Reveal";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: `Thank you, ${formData.name}!`,
      text: "Your message has been sent successfully.",
      confirmButtonColor: "#D32F2F",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-gray-50 py-20 mb-10 rounded-3xl mx-4 lg:mx-10 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -ml-16 -mb-16"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold tracking-wider text-sm uppercase">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
            We'd Love to Hear <span className="text-red-600">From You</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Have questions or want to help save lives? Reach out to us anytime.
          </p>
        </div>

        <Reveal width="100%">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch opacity-90 hover:opacity-100 transition-opacity duration-300">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 h-full">
              <h3 className="text-2xl font-bold mb-8 text-gray-800">Send a Message</h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label text-sm font-medium text-gray-600 mb-1">Your Name</label>
                        <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="input bg-gray-50 border-gray-200 focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 w-full transition-all duration-300"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label text-sm font-medium text-gray-600 mb-1">Your Email</label>
                        <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className="input bg-gray-50 border-gray-200 focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 w-full transition-all duration-300"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label text-sm font-medium text-gray-600 mb-1">Message</label>
                    <textarea
                    name="message"
                    placeholder="How can we help you?"
                    rows="4"
                    className="textarea textarea-bordered bg-gray-50 border-gray-200 focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 w-full h-32 transition-all duration-300"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-custom w-full text-lg normal-case font-medium rounded-xl h-12 shadow-red-200 shadow-xl border-none"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center space-y-8">
               <div className="bg-red-600 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <h3 className="text-2xl font-bold mb-6 relative z-10">Contact Information</h3>
                    <div className="space-y-6 relative z-10">
                        <ContactItem icon={<FaPhoneAlt />} text="+880 1315-562442" />
                        <ContactItem icon={<FaEnvelope />} text="support@bloodcare.com" />
                        <ContactItem icon={<FaMapMarkerAlt />} text="Dhaka, Bangladesh" />
                    </div>
               </div>

               <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex-grow flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 text-2xl mb-4">
                        <FaEnvelope />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Need Urgent Help?</h4>
                    <p className="text-gray-500 mb-6">
                        If you need blood urgently, please contact our emergency hotline immediately.
                    </p>
                    <a href="tel:+8801315562442" className="text-red-600 font-bold hover:underline">
                        Call Emergency: +880 1315-562442
                    </a>
               </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, text }) => (
    <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
            {icon}
        </div>
        <p className="font-medium text-lg">{text}</p>
    </div>
);

export default ContactUs;
