const Hospital = require("../models/hospital.model");

const hospitalsData = [
  {
    name: "CityCare Hospital",
    location: "Mumbai",
    address: "123, MG Road",
    contact: "+91-22-12345678",
    description: "Providing comprehensive healthcare services in the bustling city of Mumbai.",
  },
  {
    name: "MediWell Hospital",
    location: "Delhi",
    address: "456, Connaught Place",
    contact: "+91-11-87654321",
    description:
      "Offering a wide range of medical services to meet the healthcare needs of Delhiites.",
  },
  {
    name: "CarePoint Hospital",
    location: "Bangalore",
    address: "789, Koramangala",
    contact: "+91-80-23456789",
    description: "Your trusted partner for quality healthcare services in the IT capital of India.",
  },
  {
    name: "AyurVeda Healing Hospital",
    location: "Kerala",
    address: "12, Ayurveda Lane, Trivandrum",
    contact: "+91-471-9876543",
    description: "Specializing in traditional Ayurvedic treatments for holistic healing.",
  },
  {
    name: "OrthoRelief Hospital",
    location: "Hyderabad",
    address: "567, Jubilee Hills",
    contact: "+91-40-34567890",
    description: "Experts in orthopedic care and pain management.",
  },
  {
    name: "Dermacare Hospital",
    location: "Chennai",
    address: "34, Nungambakkam High Road",
    contact: "+91-44-65432109",
    description: "Your destination for advanced dermatology and skincare solutions.",
  },
  {
    name: "PuneCare Hospital",
    location: "Pune",
    address: "246, Deccan Gymkhana",
    contact: "+91-20-13579246",
    description: "Delivering personalized healthcare services to the vibrant city of Pune.",
  },
  {
    name: "Ayushman Hospital",
    location: "Ahmedabad",
    address: "789, SG Highway",
    contact: "+91-79-98765432",
    description: "Promoting wellness and preventive care through holistic healthcare approaches.",
  },
  {
    name: "HealthyLife Hospital",
    location: "Jaipur",
    address: "321, Tonk Road",
    contact: "+91-141-24681357",
    description: "Caring for your health with compassion and expertise in the Pink City.",
  },
  {
    name: "Sparsh Physiotherapy Hospital",
    location: "Kolkata",
    address: "23, Park Street",
    contact: "+91-33-57904613",
    description: "Specializing in physiotherapy treatments to restore movement and function.",
  },
  {
    name: "AyurSutra Hospital",
    location: "Varanasi",
    address: "56, Assi Ghat Road",
    contact: "+91-542-6543210",
    description: "Bringing the ancient wisdom of Ayurveda to the spiritual city of Varanasi.",
  },
  {
    name: "Nature's Cure Hospital",
    location: "Goa",
    address: "12, Calangute Beach Road",
    contact: "+91-832-1234567",
    description: "Embracing the healing powers of nature in the laid-back atmosphere of Goa.",
  },
  {
    name: "SmileCare Dental Hospital",
    location: "Chandigarh",
    address: "567, Sector 17",
    contact: "+91-172-9876543",
    description: "Creating healthy smiles with personalized dental care in Chandigarh.",
  },
  {
    name: "Women's Wellness Hospital",
    location: "Lucknow",
    address: "34, Gomti Nagar",
    contact: "+91-522-2468025",
    description: "Empowering women to prioritize their health and well-being in Lucknow.",
  },
  {
    name: "Revive Physiotherapy Hospital",
    location: "Nagpur",
    address: "78, Ramdaspeth",
    contact: "+91-712-3456789",
    description: "Helping patients recover and regain strength through effective physiotherapy.",
  },
  {
    name: "SoulSpace Hospital",
    location: "Rishikesh",
    address: "90, Tapovan",
    contact: "+91-135-6789012",
    description: "Nurturing mind, body, and soul amidst the serene vibes of Rishikesh.",
  },
  // Add more hospital entries here...
];

(async () => {
  try {
    const res = Hospital.bulkCreate(hospitalsData);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
})()
