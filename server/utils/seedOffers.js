const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Offer = require('../models/Offer');
const User = require('../models/User');

const categories = [
  'Electronics',
  'Fashion',
  'Food & Dining',
  'Travel & Flights',
  'Gold & Jewellery',
  'Home & Living',
  'Beauty & Wellness',
  'Entertainment & OTT',
  'Gift Cards',
];

// Curated base templates to generate 105+ unique festive offers
const baseOfferTemplates = [
  // Electronics (15)
  {
    title: 'Apple iPhone 16 Pro Max 256GB - Festive Gold Edition',
    brandName: 'Apple India',
    category: 'Electronics',
    discountDetails: 'FLAT ₹15,000 OFF + Instant Bumper Draw Entry',
    originalPrice: 144900,
    offerPrice: 129900,
    brandLogo: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    couponCode: 'DIWALI-IPHONE16',
    isFeatured: true,
    claimsCount: 842,
  },
  {
    title: 'Sony Bravia 65" 4K HDR Google Smart TV (XR Series)',
    brandName: 'Sony',
    category: 'Electronics',
    discountDetails: 'FLAT 45% OFF + Free Soundbar Voucher',
    originalPrice: 139900,
    offerPrice: 76900,
    brandLogo: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    couponCode: 'SONY-DIWALI45',
    isFeatured: true,
    claimsCount: 610,
  },
  {
    title: 'MacBook Air 15" M3 Chip (16GB Unified RAM, 512GB SSD)',
    brandName: 'Apple',
    category: 'Electronics',
    discountDetails: 'FLAT ₹18,500 Festive Discount + AirPods at ₹999',
    originalPrice: 154900,
    offerPrice: 136400,
    brandLogo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    couponCode: 'MAC-FESTIVE-M3',
    isFeatured: true,
    claimsCount: 520,
  },
  {
    title: 'Samsung Galaxy S24 Ultra 5G (Titanium Amber)',
    brandName: 'Samsung',
    category: 'Electronics',
    discountDetails: 'FLAT ₹20,000 Exchange Bonus + Free Galaxy Watch',
    originalPrice: 129999,
    offerPrice: 109999,
    brandLogo: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=300&q=80',
    couponCode: 'SAMSUNG-S24U',
    isFeatured: true,
    claimsCount: 475,
  },
  {
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brandName: 'Sony Audio',
    category: 'Electronics',
    discountDetails: 'FLAT 35% OFF + 1 Year Extended Festive Warranty',
    originalPrice: 34990,
    offerPrice: 22740,
    brandLogo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    couponCode: 'SONY-XM5-FEST',
    isFeatured: false,
    claimsCount: 312,
  },
  {
    title: 'OnePlus 12 5G (Silky Black 16GB / 512GB)',
    brandName: 'OnePlus',
    category: 'Electronics',
    discountDetails: 'FLAT ₹8,000 Instant Bank Discount',
    originalPrice: 69999,
    offerPrice: 61999,
    brandLogo: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=300&q=80',
    couponCode: 'OP12-DHAMAKA',
    claimsCount: 290,
  },
  {
    title: 'Apple Watch Ultra 2 GPS + Cellular Titanium Case',
    brandName: 'Apple',
    category: 'Electronics',
    discountDetails: 'FLAT ₹12,000 OFF on Diwali Mega Sale',
    originalPrice: 89900,
    offerPrice: 77900,
    brandLogo: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=300&q=80',
    couponCode: 'APPLE-ULTRA2',
    claimsCount: 215,
  },
  {
    title: 'Bose Smart Soundbar 900 with Dolby Atmos',
    brandName: 'Bose',
    category: 'Electronics',
    discountDetails: 'FLAT 25% OFF + Free Wireless Bass Module Trial',
    originalPrice: 79900,
    offerPrice: 59925,
    brandLogo: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=300&q=80',
    couponCode: 'BOSE-DIWALI',
    claimsCount: 180,
  },
  {
    title: 'Canon EOS R50 Mirrorless Camera Content Creator Kit',
    brandName: 'Canon',
    category: 'Electronics',
    discountDetails: 'FLAT ₹14,000 Discount + Free Tripod & 128GB Card',
    originalPrice: 75995,
    offerPrice: 61995,
    brandLogo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80',
    couponCode: 'CANON-CREATOR',
    claimsCount: 165,
  },
  {
    title: 'iPad Air 11-inch M2 Liquid Retina Display (128GB)',
    brandName: 'Apple',
    category: 'Electronics',
    discountDetails: 'FLAT ₹7,500 Cash Discount + Apple Pencil Pro at 30% Off',
    originalPrice: 59900,
    offerPrice: 52400,
    brandLogo: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=300&q=80',
    couponCode: 'IPAD-FESTIVE',
    claimsCount: 340,
  },
  {
    title: 'Marshall Stanmore III Bluetooth Home Speaker',
    brandName: 'Marshall',
    category: 'Electronics',
    discountDetails: 'FLAT 30% Festive Discount on Classic Vintage Brown',
    originalPrice: 41999,
    offerPrice: 29399,
    brandLogo: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=300&q=80',
    couponCode: 'MARSHALL-ROCK',
    claimsCount: 220,
  },
  {
    title: 'ASUS ROG Strix G16 Gaming Laptop (RTX 4070, i9-14900HX)',
    brandName: 'ASUS ROG',
    category: 'Electronics',
    discountDetails: 'FLAT ₹28,000 OFF + Free ROG Backpack & Headset',
    originalPrice: 189990,
    offerPrice: 161990,
    brandLogo: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=300&q=80',
    couponCode: 'ROG-DIWALI',
    claimsCount: 195,
  },

  // Gold & Jewellery (15)
  {
    title: 'Tanishq 10 Grams 24K (999.9) Pure Gold Lakshmi Coin',
    brandName: 'Tanishq',
    category: 'Gold & Jewellery',
    discountDetails: '0% Making Charges + ₹4,000 Instant Festive Cashback',
    originalPrice: 82500,
    offerPrice: 78500,
    brandLogo: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    couponCode: 'TANISHQ-GOLD10',
    isFeatured: true,
    claimsCount: 915,
  },
  {
    title: 'Kalyan Jewellers Royal Kundan & Uncut Polki Necklace',
    brandName: 'Kalyan Jewellers',
    category: 'Gold & Jewellery',
    discountDetails: 'FLAT 50% OFF on Making Charges + Gold Coin Free',
    originalPrice: 245000,
    offerPrice: 215000,
    brandLogo: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80',
    couponCode: 'KALYAN-ROYAL',
    isFeatured: true,
    claimsCount: 680,
  },
  {
    title: 'CaratLane 1.0 Carat Solitaire Diamond Ring (VVS-E)',
    brandName: 'CaratLane',
    category: 'Gold & Jewellery',
    discountDetails: 'FLAT 25% OFF on Solitaire Diamonds + Free Hallmark Insurance',
    originalPrice: 175000,
    offerPrice: 131250,
    brandLogo: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80',
    couponCode: 'CARATLANE-SPARKLE',
    isFeatured: true,
    claimsCount: 420,
  },
  {
    title: 'Malabar Gold & Diamonds 22K Royal Temple Bangle Pair',
    brandName: 'Malabar Gold',
    category: 'Gold & Jewellery',
    discountDetails: 'Special Festive Rate: Save ₹350 per gram + ₹2,000 Voucher',
    originalPrice: 195000,
    offerPrice: 182000,
    brandLogo: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80',
    couponCode: 'MALABAR-TEMPLE',
    claimsCount: 390,
  },
  {
    title: 'Mia by Tanishq 14K Yellow Gold Festive Charm Bracelet',
    brandName: 'Mia by Tanishq',
    category: 'Gold & Jewellery',
    discountDetails: 'FLAT 20% OFF on Modern Everyday Gold Jewellery',
    originalPrice: 28999,
    offerPrice: 23199,
    brandLogo: 'https://images.unsplash.com/photo-1611591475874-9ef0f845a70d?auto=format&fit=crop&w=300&q=80',
    couponCode: 'MIA-DIWALI20',
    claimsCount: 260,
  },
  {
    title: 'BlueStone 18K Rose Gold Floral Diamond Earrings',
    brandName: 'BlueStone',
    category: 'Gold & Jewellery',
    discountDetails: 'FLAT 100% OFF on Making Charges on Diamond Jewellery',
    originalPrice: 54000,
    offerPrice: 43200,
    brandLogo: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=300&q=80',
    couponCode: 'BLUESTONE-ZERO',
    claimsCount: 310,
  },

  // Fashion & Apparel (15)
  {
    title: 'Manyavar Festive Royal Embroidered Velvet Sherwani Set',
    brandName: 'Manyavar',
    category: 'Fashion',
    discountDetails: 'FLAT 30% OFF + Complimentary Silk Dupatta & Mojari',
    originalPrice: 24999,
    offerPrice: 17499,
    brandLogo: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    couponCode: 'MANYAVAR-SHERWANI',
    isFeatured: true,
    claimsCount: 540,
  },
  {
    title: 'Fabindia Pure Katan Banarasi Handwoven Silk Saree',
    brandName: 'Fabindia',
    category: 'Fashion',
    discountDetails: 'FLAT 40% OFF + Pure Silk Zari Unstitched Blouse Piece',
    originalPrice: 32000,
    offerPrice: 19200,
    brandLogo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
    couponCode: 'FAB-BANARASI',
    isFeatured: true,
    claimsCount: 490,
  },
  {
    title: 'Raymond Royal Festive Merino Wool 3-Piece Suit Length',
    brandName: 'Raymond',
    category: 'Fashion',
    discountDetails: 'Buy 1 Get 1 Free on Luxury Suiting Fabrics + Tailoring Voucher',
    originalPrice: 22000,
    offerPrice: 11000,
    brandLogo: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80',
    couponCode: 'RAYMOND-ROYAL',
    claimsCount: 330,
  },
  {
    title: 'Zara Festive Luxe Evening Velvet Blazer & Trousers',
    brandName: 'Zara',
    category: 'Fashion',
    discountDetails: 'FLAT 35% OFF on Autumn/Winter Festive Edit',
    originalPrice: 14990,
    offerPrice: 9743,
    brandLogo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80',
    couponCode: 'ZARA-FESTIVE35',
    claimsCount: 295,
  },
  {
    title: 'Biba Heavy Gota Patti Anarkali Suit with Organza Dupatta',
    brandName: 'Biba',
    category: 'Fashion',
    discountDetails: 'FLAT 50% Festive Dhamaka Discount',
    originalPrice: 12999,
    offerPrice: 6499,
    brandLogo: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80',
    couponCode: 'BIBA-GOTA50',
    claimsCount: 380,
  },
  {
    title: 'Titan Nebula 18K Solid Gold Automatic Luxury Watch',
    brandName: 'Titan Nebula',
    category: 'Fashion',
    discountDetails: 'FLAT ₹25,000 OFF + 5-Year International Guarantee',
    originalPrice: 165000,
    offerPrice: 140000,
    brandLogo: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80',
    couponCode: 'NEBULA-GOLD',
    claimsCount: 210,
  },

  // Food & Dining (15)
  {
    title: "Haldiram's Grand Shahi Kaju Katli & Royal Dry Fruit Box (2kg)",
    brandName: "Haldiram's",
    category: 'Food & Dining',
    discountDetails: 'FLAT 50% OFF + 1kg Besan Ladoo Free on Diwali Pre-Orders',
    originalPrice: 2800,
    offerPrice: 1400,
    brandLogo: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80',
    couponCode: 'HALDIRAM-SHAHI',
    isFeatured: true,
    claimsCount: 790,
  },
  {
    title: 'Bikanervala Imperial Diwali Mithai & Pure Ghee Hamper',
    brandName: 'Bikanervala',
    category: 'Food & Dining',
    discountDetails: 'Buy 2 Get 1 Free on Luxury Gift Hampers',
    originalPrice: 3600,
    offerPrice: 2400,
    brandLogo: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=300&q=80',
    couponCode: 'BIKANER-FEST',
    claimsCount: 520,
  },
  {
    title: 'Barbeque Nation Unlimited Festive Buffet for 4 Guests',
    brandName: 'Barbeque Nation',
    category: 'Food & Dining',
    discountDetails: 'FLAT 40% OFF + Unlimited Mocktails & Diwali Dessert Platter',
    originalPrice: 4800,
    offerPrice: 2880,
    brandLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80',
    couponCode: 'BBQ-DIWALI40',
    claimsCount: 640,
  },
  {
    title: 'ITC Grand Hotels Royal Diwali Banquet Experience Voucher',
    brandName: 'ITC Hotels',
    category: 'Food & Dining',
    discountDetails: 'FLAT ₹3,000 Dining Credit on Bukhara & Dum Pukht Tables',
    originalPrice: 10000,
    offerPrice: 7000,
    brandLogo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80',
    couponCode: 'ITC-ROYALFEAST',
    claimsCount: 310,
  },
  {
    title: 'Theobroma Festive Assorted Brownies & Cookie Box (16 Pcs)',
    brandName: 'Theobroma',
    category: 'Food & Dining',
    discountDetails: 'FLAT 35% OFF on Diwali Patisserie Boxes',
    originalPrice: 1850,
    offerPrice: 1200,
    brandLogo: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80',
    couponCode: 'THEOBROMA-BROWNIE',
    claimsCount: 420,
  },
  {
    title: 'Swiggy Gourmet 1-Year Pass + ₹1,000 Festive Food Credits',
    brandName: 'Swiggy',
    category: 'Food & Dining',
    discountDetails: 'Free Delivery on Top Restaurants + Flat ₹250 Off on Every Order',
    originalPrice: 2499,
    offerPrice: 499,
    brandLogo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=300&q=80',
    couponCode: 'SWIGGY-GOURMET11',
    claimsCount: 880,
  },

  // Travel & Flights (12)
  {
    title: 'MakeMyTrip Diwali Holiday Flight Pass - Any Sector Domestic',
    brandName: 'MakeMyTrip',
    category: 'Travel & Flights',
    discountDetails: 'FLAT ₹5,000 Instant Discount on Round Trips',
    originalPrice: 12000,
    offerPrice: 7000,
    brandLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    couponCode: 'MMT-FESTIVE5000',
    isFeatured: true,
    claimsCount: 670,
  },
  {
    title: 'Taj Hotels 2-Nights Luxury Heritage Palace Stay Package',
    brandName: 'Taj Hotels & Palaces',
    category: 'Travel & Flights',
    discountDetails: 'Complimentary High Tea, Royal Dinner & Room Upgrade',
    originalPrice: 65000,
    offerPrice: 42000,
    brandLogo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80',
    couponCode: 'TAJ-ROYALSTAY',
    isFeatured: true,
    claimsCount: 410,
  },
  {
    title: 'EaseMyTrip Golden Wings Pass (Zero Convenience Fee for 1 Year)',
    brandName: 'EaseMyTrip',
    category: 'Travel & Flights',
    discountDetails: 'Save ₹800/flight + Free Seat Selection & Meal on IndiGo',
    originalPrice: 3999,
    offerPrice: 999,
    brandLogo: 'https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=300&q=80',
    couponCode: 'EMT-GOLDWINGS',
    claimsCount: 390,
  },
  {
    title: 'Yatra Kashmir Snow & Shikara Winter Festival Getaway',
    brandName: 'Yatra',
    category: 'Travel & Flights',
    discountDetails: 'FLAT 45% OFF on 5D/4N Package for Couples',
    originalPrice: 45000,
    offerPrice: 24750,
    brandLogo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    couponCode: 'YATRA-KASHMIR',
    claimsCount: 280,
  },

  // Home & Living (12)
  {
    title: 'Dyson V12 Detect Slim Cordless Vacuum Cleaner',
    brandName: 'Dyson',
    category: 'Home & Living',
    discountDetails: 'FLAT ₹12,000 OFF + Free Floor Dok & Extra Battery Kit',
    originalPrice: 55900,
    offerPrice: 43900,
    brandLogo: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=300&q=80',
    couponCode: 'DYSON-DIWALI',
    isFeatured: true,
    claimsCount: 430,
  },
  {
    title: 'Philips Hue Smart Ambient Festive LED Lights & Bridge Kit',
    brandName: 'Philips',
    category: 'Home & Living',
    discountDetails: 'FLAT 40% OFF - 16 Million Festive Diwali Lighting Colors',
    originalPrice: 18999,
    offerPrice: 11399,
    brandLogo: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=300&q=80',
    couponCode: 'PHILIPS-HUE40',
    claimsCount: 510,
  },
  {
    title: 'Havells Imperial 12-Light Royal Brass Diya Chandelier',
    brandName: 'Havells',
    category: 'Home & Living',
    discountDetails: 'FLAT 50% OFF + Free Professional Installation',
    originalPrice: 28000,
    offerPrice: 14000,
    brandLogo: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80',
    couponCode: 'HAVELLS-CHANDELIER',
    claimsCount: 275,
  },
  {
    title: 'Urban Ladder Solid Sheesham 6-Seater Royal Dining Table',
    brandName: 'Urban Ladder',
    category: 'Home & Living',
    discountDetails: 'FLAT 45% OFF + Free Velvet Chair Cushions',
    originalPrice: 62000,
    offerPrice: 34100,
    brandLogo: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=300&q=80',
    couponCode: 'URBAN-DINING45',
    claimsCount: 215,
  },

  // Beauty & Wellness (12)
  {
    title: 'Forest Essentials Soundarya 24K Gold Royal Facial Hamper',
    brandName: 'Forest Essentials',
    category: 'Beauty & Wellness',
    discountDetails: 'FLAT 35% OFF + Pure 24K Gold Radiance Mist Free',
    originalPrice: 14500,
    offerPrice: 9425,
    brandLogo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    couponCode: 'FOREST-SOUNDARYA',
    isFeatured: true,
    claimsCount: 560,
  },
  {
    title: 'Nykaa Luxe Festive Golden Glow Beauty Box (Curated by Manish Malhotra)',
    brandName: 'Nykaa Luxe',
    category: 'Beauty & Wellness',
    discountDetails: 'FLAT 50% OFF on 12 Full-Sized Luxury Beauty Bestsellers',
    originalPrice: 12000,
    offerPrice: 5999,
    brandLogo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80',
    couponCode: 'NYKAA-LUXE50',
    claimsCount: 710,
  },
  {
    title: 'Kama Ayurveda Pure Kumkumadi Miraculous Beauty Ayurvedic Night Fluid',
    brandName: 'Kama Ayurveda',
    category: 'Beauty & Wellness',
    discountDetails: 'FLAT 30% OFF + Pure Rose Water 200ml Bottle Free',
    originalPrice: 5995,
    offerPrice: 4196,
    brandLogo: 'https://images.unsplash.com/photo-1608248597359-29173f27a6c9?auto=format&fit=crop&w=300&q=80',
    couponCode: 'KAMA-KUMKUMADI',
    claimsCount: 390,
  },
  {
    title: 'Sephora Golden Radiance Festive Makeup & Fragrance Hamper',
    brandName: 'Sephora',
    category: 'Beauty & Wellness',
    discountDetails: 'FLAT 40% OFF + Yves Saint Laurent Libre Deluxe Miniature',
    originalPrice: 16500,
    offerPrice: 9900,
    brandLogo: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=300&q=80',
    couponCode: 'SEPHORA-RADIANCE',
    claimsCount: 340,
  },

  // Entertainment & OTT (12)
  {
    title: 'Amazon Prime 1-Year All-In-One Annual Membership',
    brandName: 'Amazon India',
    category: 'Entertainment & OTT',
    discountDetails: 'FLAT 60% OFF - Video, Music, Next-Day Free Deliveries',
    originalPrice: 1499,
    offerPrice: 599,
    brandLogo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=300&q=80',
    couponCode: 'AMZ-PRIME60',
    isFeatured: true,
    claimsCount: 1040,
  },
  {
    title: 'Disney+ Hotstar Premium 1-Year 4K UHD 4 Screens Subscription',
    brandName: 'Disney+ Hotstar',
    category: 'Entertainment & OTT',
    discountDetails: 'FLAT 50% OFF on Bumper Festive Diwali Plan',
    originalPrice: 1499,
    offerPrice: 749,
    brandLogo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=300&q=80',
    couponCode: 'HOTSTAR-FEST50',
    claimsCount: 920,
  },
  {
    title: 'PVR INOX Gold Passport - 10 Blockbuster Movies + Gourmet Popcorn',
    brandName: 'PVR INOX',
    category: 'Entertainment & OTT',
    discountDetails: 'Watch 10 Movies for Just ₹99 Each on Recliners & IMAX',
    originalPrice: 4500,
    offerPrice: 999,
    brandLogo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80',
    couponCode: 'PVR-GOLD999',
    claimsCount: 860,
  },
  {
    title: 'SonyLIV Premium 1-Year Live Sports & Cinema Stream Pass',
    brandName: 'SonyLIV',
    category: 'Entertainment & OTT',
    discountDetails: 'FLAT 45% OFF + UEFA Champions League & Sony Originals',
    originalPrice: 999,
    offerPrice: 549,
    brandLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80',
    couponCode: 'SONYLIV-DIWALI',
    claimsCount: 450,
  },

  // Gift Cards (12)
  {
    title: 'Amazon Pay ₹2,500 Festive Shopping E-Gift Card',
    brandName: 'Amazon Pay',
    category: 'Gift Cards',
    discountDetails: 'Instant 15% Cash Discount + No Expiry Date',
    originalPrice: 2500,
    offerPrice: 2125,
    brandLogo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=300&q=80',
    couponCode: 'AMZPAY-FESTIVE',
    isFeatured: true,
    claimsCount: 980,
  },
  {
    title: 'Flipkart Super Festive ₹3,000 Shopping Gift Voucher',
    brandName: 'Flipkart',
    category: 'Gift Cards',
    discountDetails: 'Get ₹500 Bonus Credits on Diwali Big Billion Days',
    originalPrice: 3000,
    offerPrice: 2500,
    brandLogo: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=300&q=80',
    couponCode: 'FLIPKART-SUPER500',
    claimsCount: 810,
  },
  {
    title: 'Tanishq Jewellery E-Gift Card ₹10,000',
    brandName: 'Tanishq',
    category: 'Gift Cards',
    discountDetails: 'Pay ₹9,000 and get ₹10,000 Gold Value Card',
    originalPrice: 10000,
    offerPrice: 9000,
    brandLogo: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=300&q=80',
    couponCode: 'TANISHQ-VOUCH10K',
    claimsCount: 530,
  },
  {
    title: 'Croma ₹5,000 Electronics Mega Festive Gift Card',
    brandName: 'Croma',
    category: 'Gift Cards',
    discountDetails: 'FLAT ₹800 OFF on any Laptop, TV or Smartphone purchase',
    originalPrice: 5000,
    offerPrice: 4200,
    brandLogo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=300&q=80',
    couponCode: 'CROMA-FEST800',
    claimsCount: 460,
  },
];

// Function to generate 108 rich, realistic festive offers
const generate108Offers = () => {
  const generated = [...baseOfferTemplates];

  // Helper arrays to synthesise additional realistic Diwali deals up to 108
  const extraDeals = [
    { brand: 'Apple', item: 'AirPods Pro 2 USB-C with Active Noise Cancellation', cat: 'Electronics', orig: 24900, off: 18900, disc: 'FLAT ₹6,000 OFF', code: 'AIRPODS-PRO2' },
    { brand: 'OnePlus', item: 'OnePlus Watch 2 Smartwatch with Dual-Engine Architecture', cat: 'Electronics', orig: 24999, off: 19999, disc: 'FLAT ₹5,000 OFF', code: 'OP-WATCH2' },
    { brand: 'Dell', item: 'Dell XPS 13 InfinityEdge Laptop (Intel Core Ultra 7)', cat: 'Electronics', orig: 145000, off: 122000, disc: 'FLAT ₹23,000 OFF', code: 'DELL-XPS13' },
    { brand: 'LG', item: 'LG 55" OLED evo 4K Cinema TV with Dolby Vision', cat: 'Electronics', orig: 119990, off: 79990, disc: 'FLAT 33% OFF', code: 'LG-OLED55' },
    { brand: 'GoPro', item: 'GoPro HERO 12 Black Action Camera Festive Creator Kit', cat: 'Electronics', orig: 45000, off: 34990, disc: 'FLAT ₹10,000 OFF', code: 'GOPRO-HERO12' },
    { brand: 'Sony', item: 'PlayStation 5 Slim Console Disc Edition Festive Bundle', cat: 'Electronics', orig: 54990, off: 47990, disc: 'FLAT ₹7,000 OFF + Free Spider-Man 2 Game', code: 'PS5-DIWALI' },
    { brand: 'Kindle', item: 'Amazon Kindle Paperwhite Signature Edition 32GB', cat: 'Electronics', orig: 17999, off: 13499, disc: 'FLAT 25% OFF + Free 6-Month Kindle Unlimited', code: 'KINDLE-FEST' },
    { brand: 'Nothing', item: 'Nothing Phone (2a) Plus (Glow Grey 256GB)', cat: 'Electronics', orig: 29999, off: 23999, disc: 'FLAT ₹6,000 Instant Discount', code: 'NOTHING-2A' },

    { brand: 'Joyalukkas', item: 'Joyalukkas 22K Hallmarked Gold Necklace & Jhumka Set', cat: 'Gold & Jewellery', orig: 280000, off: 252000, disc: 'FLAT 10% Gold Discount + Free Silver Coin', code: 'JOY-GOLD22K' },
    { brand: 'PC Chandra', item: 'PC Chandra 5 Grams 24K Gold Bar with Shubh Diwali Engraving', cat: 'Gold & Jewellery', orig: 41500, off: 39500, disc: 'Zero Making Charges + ₹2,000 Festive Cashback', code: 'PCC-GOLD5G' },
    { brand: 'Tanishq Mia', item: 'Mia 14K Diamond Studded Festive Cocktails Pendant', cat: 'Gold & Jewellery', orig: 22000, off: 17600, disc: 'FLAT 20% OFF on Diamonds', code: 'MIA-PENDANT' },
    { brand: 'CaratLane', item: 'CaratLane Shaya 925 Sterling Silver Royal Oxidized Choker', cat: 'Gold & Jewellery', orig: 8500, off: 5950, disc: 'FLAT 30% OFF', code: 'CARAT-SILVER' },
    { brand: 'Kalyan', item: 'Kalyan Jewellers Antique Gold Temple Waistbelt (Kamarbandh)', cat: 'Gold & Jewellery', orig: 320000, off: 290000, disc: 'Save ₹30,000 on Making Charges', code: 'KALYAN-KAMAR' },
    { brand: 'Giva', item: 'GIVA 925 Pure Silver Anushka Sharma Festive Collection', cat: 'Gold & Jewellery', orig: 4999, off: 2999, disc: 'FLAT 40% OFF + Free Pearl Earrings', code: 'GIVA-SPARKLE' },

    { brand: 'W for Woman', item: 'W Geometric Embroidered Festive Kurta Palazzo Suit', cat: 'Fashion', orig: 7999, off: 4399, disc: 'FLAT 45% OFF', code: 'W-FESTIVE45' },
    { brand: 'Aurelia', item: 'Aurelia Festive Metallic Printed Anarkali with Net Dupatta', cat: 'Fashion', orig: 6499, off: 3249, disc: 'FLAT 50% OFF', code: 'AURELIA-50' },
    { brand: 'Levi’s', item: 'Levi’s Premium Festive Denim Jacket & 511 Slim Jeans Pack', cat: 'Fashion', orig: 9999, off: 5999, disc: 'FLAT 40% OFF', code: 'LEVIS-FEST40' },
    { brand: 'Mufti', item: 'Mufti Authentic Festive Urban Casuals Combo (3 Shirts)', cat: 'Fashion', orig: 7499, off: 3749, disc: 'Buy 1 Get 2 Free Diwali Blast', code: 'MUFTI-BLAST' },
    { brand: 'H&M', item: 'H&M Festive Autumn Edition Silk Blend Party Shirts', cat: 'Fashion', orig: 3999, off: 2399, disc: 'FLAT 40% OFF', code: 'HM-FESTIVE' },
    { brand: 'Puma', item: 'Puma Palermo & Suede Classic Gold Foil Festive Sneakers', cat: 'Fashion', orig: 8999, off: 4999, disc: 'FLAT ₹4,000 OFF', code: 'PUMA-GOLD' },
    { brand: 'Bata', item: 'Hush Puppies Handcrafted Royal Leather Festive Loafers', cat: 'Fashion', orig: 6999, off: 4199, disc: 'FLAT 40% OFF', code: 'HUSH-LEATHER' },

    { brand: 'Zomato Gold', item: 'Zomato Gold 1-Year VIP Membership + ₹500 Dining Cash', cat: 'Food & Dining', orig: 1999, off: 499, disc: '75% OFF Diwali Dhamaka Offer', code: 'ZOMATO-VIP75' },
    { brand: 'Baskin Robbins', item: 'Baskin Robbins Festive Ice Cream Cake & Sundae Hamper', cat: 'Food & Dining', orig: 1800, off: 1080, disc: 'FLAT 40% OFF', code: 'BR-DIWALI' },
    { brand: 'Chaayos', item: 'Chaayos Premium Chai Hamper with Kulhad Mug & Dry Snacks', cat: 'Food & Dining', orig: 1499, off: 899, disc: 'FLAT 40% OFF', code: 'CHAAYOS-CHAI' },
    { brand: 'Nando’s', item: 'Nando’s Flame-Grilled Peri-Peri Full Platter Feast for 4', cat: 'Food & Dining', orig: 3400, off: 2210, disc: 'FLAT 35% OFF', code: 'NANDOS-PERI' },
    { brand: 'Chai Point', item: 'Chai Point Assam Golden Tips Loose Leaf Tea Festive Tin', cat: 'Food & Dining', orig: 999, off: 599, disc: 'FLAT 40% OFF', code: 'CHAI-TIN' },
    { brand: 'Keventers', item: 'Keventers Classic Thick Milkshakes Festive Box (Pack of 6)', cat: 'Food & Dining', orig: 1200, off: 720, disc: 'FLAT 40% OFF', code: 'KEVENTERS-BOX' },

    { brand: 'Cleartrip', item: 'Cleartrip Domestic Flights Mega Festive Pass', cat: 'Travel & Flights', orig: 8000, off: 4800, disc: 'FLAT 40% OFF on Weekend Flights', code: 'CLEAR-FEST40' },
    { brand: 'Airbnb', item: 'Airbnb Heritage Haveli Villa Stay Voucher in Jaipur & Udaipur', cat: 'Travel & Flights', orig: 20000, off: 14000, disc: 'FLAT ₹6,000 OFF', code: 'AIRBNB-HAVELI' },
    { brand: 'Uber', item: 'Uber Premier & Intercity Diwali Travel Pass (10 Rides)', cat: 'Travel & Flights', orig: 3000, off: 1500, disc: 'FLAT 50% OFF', code: 'UBER-DIWALI50' },
    { brand: 'Radisson', item: 'Radisson Blu Festive Weekend Brunch & Spa Suite Package', cat: 'Travel & Flights', orig: 18000, off: 11700, disc: 'FLAT 35% OFF', code: 'RADISSON-BLU' },
    { brand: 'Goibibo', item: 'Goibibo 5-Star Hotel Staycation Voucher', cat: 'Travel & Flights', orig: 15000, off: 8250, disc: 'FLAT 45% OFF', code: 'GOIBIBO-STAY' },

    { brand: 'Wakefit', item: 'Wakefit Orthopedic Memory Foam King Mattress with 2 Pillows', cat: 'Home & Living', orig: 22000, off: 12100, disc: 'FLAT 45% OFF', code: 'WAKEFIT-KING' },
    { brand: 'D’Decor', item: 'D’Decor Pure Velvet Royal Floral Curtains & Cushion Set', cat: 'Home & Living', orig: 14000, off: 7700, disc: 'FLAT 45% OFF', code: 'DDECOR-VELVET' },
    { brand: 'Prestige', item: 'Prestige Svachh Triply Stainless Steel 5-Piece Cookware Set', cat: 'Home & Living', orig: 9995, off: 5495, disc: 'FLAT 45% OFF', code: 'PRESTIGE-TRIPLY' },
    { brand: 'Pureit', item: 'Pureit Copper+ Mineral RO+UV Water Purifier with Diya Glow', cat: 'Home & Living', orig: 24990, off: 17490, disc: 'FLAT ₹7,500 OFF', code: 'PUREIT-COPPER' },
    { brand: 'Milton', item: 'Milton Thermosteel Imperial Festive Casserole & Flask Gift Set', cat: 'Home & Living', orig: 4500, off: 2475, disc: 'FLAT 45% OFF', code: 'MILTON-GIFT' },
    { brand: 'Bajaj', item: 'Bajaj Majesty Royal Food Processor & Mixer Grinder 1000W', cat: 'Home & Living', orig: 11999, off: 6999, disc: 'FLAT ₹5,000 OFF', code: 'BAJAJ-ROYAL' },

    { brand: 'Bath & Body Works', item: 'Bath & Body Works Festive Amber Glow 3-Wick Candles (Pack of 3)', cat: 'Beauty & Wellness', orig: 6599, off: 3299, disc: 'Buy 1 Get 1 Free Diwali Dhamaka', code: 'BBW-CANDLES' },
    { brand: 'The Body Shop', item: 'The Body Shop British Rose Festive Bath & Body Pampering Box', cat: 'Beauty & Wellness', orig: 4995, off: 2995, disc: 'FLAT 40% OFF', code: 'BODYSHOP-ROSE' },
    { brand: 'MAC Cosmetics', item: 'MAC Viva Glam Festive Ruby Woo & 24H Eyeliner Kit', cat: 'Beauty & Wellness', orig: 5500, off: 3575, disc: 'FLAT 35% OFF', code: 'MAC-VIVAGLAM' },
    { brand: 'L’Occitane', item: 'L’Occitane en Provence Shea Butter Luxury Festive Hamper', cat: 'Beauty & Wellness', orig: 8900, off: 5785, disc: 'FLAT 35% OFF', code: 'LOCCITANE-SHEA' },
    { brand: 'Plum Goodness', item: 'Plum 100% Vegan Festive Skin Radiance Kit with Vitamin C', cat: 'Beauty & Wellness', orig: 3200, off: 1600, disc: 'FLAT 50% OFF', code: 'PLUM-VEGAN50' },

    { brand: 'BookMyShow', item: 'BookMyShow VIP Movie Pass (₹2,000 Wallet Credits)', cat: 'Entertainment & OTT', orig: 2000, off: 1400, disc: 'FLAT 30% OFF on All Cinema Tickets', code: 'BMS-VIP2000' },
    { brand: 'Spotify', item: 'Spotify Premium 12-Month Ad-Free Music Pass', cat: 'Entertainment & OTT', orig: 1189, off: 599, disc: 'FLAT 50% OFF Festive Discount', code: 'SPOTIFY-ANNUAL' },
    { brand: 'Zee5', item: 'Zee5 All-Access 1-Year Premium Entertainment Pass', cat: 'Entertainment & OTT', orig: 999, off: 499, disc: 'FLAT 50% OFF', code: 'ZEE5-DIWALI' },
    { brand: 'JioCinema', item: 'JioCinema Premium 12 Months Family Pass (4 Screens 4K)', cat: 'Entertainment & OTT', orig: 1499, off: 699, disc: 'FLAT ₹800 OFF', code: 'JIOCINEMA-PREM' },

    { brand: 'Myntra', item: 'Myntra ₹2,000 Festive Wardrobe Gift Voucher', cat: 'Gift Cards', orig: 2000, off: 1600, disc: 'FLAT 20% OFF', code: 'MYNTRA-GIFT2K' },
    { brand: 'Lifestyle', item: 'Lifestyle ₹3,000 Fashion Gift Card', cat: 'Gift Cards', orig: 3000, off: 2400, disc: 'FLAT 20% OFF', code: 'LIFESTYLE-GIFT' },
    { brand: 'Shoppers Stop', item: 'Shoppers Stop Golden Privilege ₹5,000 Voucher', cat: 'Gift Cards', orig: 5000, off: 4100, disc: 'FLAT 18% OFF', code: 'SHOPPERS-5000' },
    { brand: 'Nykaa', item: 'Nykaa Beauty ₹1,500 Gift Card', cat: 'Gift Cards', orig: 1500, off: 1200, disc: 'FLAT 20% OFF', code: 'NYKAA-GIFT15' },
    { brand: 'MakeMyTrip', item: 'MakeMyTrip Travel Gift Card ₹10,000', cat: 'Gift Cards', orig: 10000, off: 8500, disc: 'FLAT 15% OFF', code: 'MMT-TRAVEL10K' },
  ];

  extraDeals.forEach((d, i) => {
    generated.push({
      title: `${d.brand} ${d.item}`,
      brandName: d.brand,
      category: d.cat,
      discountDetails: d.disc,
      originalPrice: d.orig,
      offerPrice: d.off,
      brandLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=300&q=80',
      couponCode: d.code,
      isFeatured: i % 7 === 0,
      claimsCount: 100 + Math.floor(Math.random() * 800),
      description: `Experience unforgettable Diwali festivities with ${d.brand}'s signature ${d.item}. Unlocked with ₹11 coupon!`,
    });
  });

  // Now duplicate / multiply with distinct city & festive edition variations to guarantee >= 105 total offers!
  const cities = ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Kolkata', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Pune'];
  let counter = 1;

  while (generated.length < 108) {
    const city = cities[counter % cities.length];
    const cat = categories[counter % categories.length];
    const orig = 2000 + counter * 350;
    const off = Math.round(orig * 0.55);

    generated.push({
      title: `Diwali Exclusive ${cat} Hamper & Voucher - ${city} Edition`,
      brandName: `Festive ${city} Partner`,
      category: cat,
      discountDetails: `FLAT 45% OFF + ₹11 Bumper Entry`,
      originalPrice: orig,
      offerPrice: off,
      brandLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=300&q=80',
      couponCode: `DIWALI-${city.substring(0, 3).toUpperCase()}-${100 + counter}`,
      isFeatured: counter % 9 === 0,
      claimsCount: 80 + counter * 5,
      description: `Celebrate Diwali 2026 with handcrafted festive perks in ${city}. Buy for ₹11 to unlock instant discount & lottery entry!`,
    });
    counter++;
  }

  return generated;
};

// Seed function called during server boot or via admin endpoint
const seedOffersData = async () => {
  try {
    const count = await Offer.countDocuments();
    if (count >= 100) {
      console.log(`🪔 [Offers] Database already contains ${count} festive offers.`);
      return { count, message: 'Already seeded' };
    }

    console.log(`🧨 [Offers Seeder] Clearing existing offers and populating 100+ offers...`);
    await Offer.deleteMany({});

    const offersToInsert = generate108Offers().map((o) => ({
      ...o,
      description:
        o.description ||
        `Celebrate Diwali with this exclusive ${o.title}! Unlock instant discount code for ₹11 and enter the Diwali Bumper Lucky Draw to win iPhone 16 Pro, Gold Coins, and grand festive prizes!`,
    }));
    const inserted = await Offer.insertMany(offersToInsert);
    console.log(`✨ [Offers Seeder] Successfully seeded ${inserted.length} festive offers!`);

    // Ensure default admin and user accounts exist
    await seedUsers();

    return { count: inserted.length };
  } catch (error) {
    console.error(`❌ [Offers Seeder Error]: ${error.message}`);
    throw error;
  }
};

const seedUsers = async () => {
  try {
    // Check or create Admin
    let admin = await User.findOne({ email: 'admin@diwali11.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Diwali Dhamaka Admin',
        email: 'admin@diwali11.com',
        phone: '9876543210',
        password: 'DiwaliAdmin@2026',
        role: 'admin',
        isEmailVerified: true,
      });
      console.log('👑 [Seeder] Admin user created: admin@diwali11.com / DiwaliAdmin@2026');
    } else if (!admin.isEmailVerified) {
      admin.isEmailVerified = true;
      await admin.save();
    }

    // Check or create Demo User
    let demoUser = await User.findOne({ email: 'user@diwali11.com' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Arjun Sharma',
        email: 'user@diwali11.com',
        phone: '9812345678',
        password: 'FestiveUser@2026',
        role: 'user',
        isEmailVerified: true,
      });
      console.log('🪔 [Seeder] Demo test user created: user@diwali11.com / FestiveUser@2026');
    } else if (!demoUser.isEmailVerified) {
      demoUser.isEmailVerified = true;
      await demoUser.save();
    }
  } catch (error) {
    console.error('Error seeding default users:', error.message);
  }
};

// Run standalone if executed directly via node utils/seedOffers.js
if (require.main === module) {
  const run = async () => {
    try {
      const conn = await mongoose.connect(
        process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/diwalidhamaka11'
      );
      console.log(`Connected to MongoDB: ${conn.connection.host}`);
      await seedOffersData();
      await mongoose.disconnect();
      console.log('Seeding finished successfully. Exiting.');
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  };
  run();
}

module.exports = {
  seedOffersData,
  seedUsers,
  generate108Offers,
};
