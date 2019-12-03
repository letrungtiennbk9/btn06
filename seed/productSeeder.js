// Create an instance of model Product
let Product = require('../models/product');

let mongoose = require('mongoose');
let baseUrl = "mongodb+srv://letrungtiennbk9:Trungtienle9@cluster0-hjpbg.mongodb.net/shopping?retryWrites=true&w=majority"
let mongoDB = baseUrl;
let done = 0;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});

let aokhoac = [
    new Product ({
        id: 1,
        title: 'Áo khoác nam cách nhiệt GOKING (Màu đen)',
        price: 193000,
        typeProduct: "Áo khoác",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/ao-khoac/ao-khoac-nam-1.png"
    }),
   
    new Product ({
        id: 2,
        title: 'Áo Khoác Kaki Nam Hai Lớp Simple Cao Cấp ShopN6-KK35',
        price: 198000,
        typeProduct: "Áo khoác",
        brand: "Pull&Bear",
        color: "Vàng gold",
        imagePath: "/img/product/ao-khoac/ao-khoac-nam-2.png"
    }),
   
    new Product ({
        id: 3,
        title: 'Áo Khoác Free Fire Hoodie Có Mũ Dài Tay',
        price: 199000,
        typeProduct: "Áo khoác",
        brand: "H&M",
        color: "Trắng",
        imagePath: "/img/product/ao-khoac/ao-khoac-nam-3.png"
    }),
   
    new Product ({
        id: 4,
        title: "Hoodie PlayerUnknown's Battlegrounds",
        price: 159000,
        typeProduct: "Áo khoác",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/ao-khoac/ao-khoac-nam-4.png"
    })
   
];  

for(let i = 0; i < aokhoac.length; i++){
    // Save the new model instance, passing a callback
    aokhoac[i].save(function (err,result) {
        done++;
        if(done===aokhoac.length)
          exit();
     });
}
done = 0;

let quantay = [
    new Product ({
        id: 1,
        title: 'Quần Tây Nam Vải Tuyết Mưa',
        price: 135000,
        typeProduct: "Quần tây",
        brand: "Routine",
        color: "Đen",
        imagePath: "/img/product/quan/quan-tay-1.jpg"
    }),
    new Product ({
        id: 2,
        title: 'Quần Tây Âu Nam Titishop QTN64 - Đen',
        price: 95000,
        typeProduct: "Quần tây",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/quan-tay-2.jpg"
    }),
    new Product ({
        id: 3,
        title: 'Quần tây nam ống suông công sở',
        price: 165000,
        typeProduct: "Quần tây",
        brand: "Pull&Bear",
        color: "Xanh da trời",
        imagePath: "/img/product/quan/quan-tay-3.jpg"
    }),
    new Product ({
        id: 4,
        title: 'Quần Tây Âu Màu Trơn Cho Nam',
        price: 135000,
        typeProduct: "Quần tây",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/quan/quan-tay-4.jpg"
    })
    
];  

for(let i = 0; i < quantay.length; i++){
    // Save the new model instance, passing a callback
    quantay[i].save(function (err,result) {
        done++;
        if(done===quantay.length)
          exit();
     });
}
done = 0;

let quanthethao = [
    new Product ({
        id: 1,
        title: 'Quần thể thao nữ tập gym yoga lưng cao',
        price: 139000,
        typeProduct: "Quần thể thao",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/quan/quan-the-thao-1.jpg"
    }),
    new Product ({
        id: 2,
        title: 'Quần short thể thao nam Gymlink G505',
        price: 89000,
        typeProduct: "Quần thể thao",
        brand: "H&M",
        color: "Đen",
        imagePath: "/img/product/quan/quan-the-thao-2.jpg"
    }),
    new Product ({
        id: 3,
        title: 'Quần Short thể thao nữ 2 lớp viền màu',
        price: 69000,
        typeProduct: "Quần thể thao",
        brand: "Gucci",
        color: "Hồng mạnh mẽ",
        imagePath: "/img/product/quan/quan-the-thao-3.jpg"
    }),
    new Product ({
        id: 4,
        title: 'Quần short thể thao nữ Now Day QN99 Sportslink',
        price: 98000,
        typeProduct: "Quần thể thao",
        brand: "Routine",
        color: "Trắng",
        imagePath: "/img/product/quan/quan-the-thao-4.jpg"
    })
    
];  

for(let i = 0; i < quanthethao.length; i++){
    // Save the new model instance, passing a callback
    quanthethao[i].save(function (err,result) {
        done++;
        if(done===quanthethao.length)
          exit();
     });
}
done = 0;

let quanjogger = [
    new Product ({
        id: 1,
        title: 'Quần jogger kaki túi hộp JG5',
        price: 117000,
        typeProduct: "Quần jogger",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/quan-jogger-1.jpg"
    }),
    new Product ({
        id: 2,
        title: 'Quần Jogger Kaki Nam Dáng Thể Thao Chất Lượng Cao',
        price: 82000,
        typeProduct: "Quần jogger",
        brand: "H&M",
        color: "Đen",
        imagePath: "/img/product/quan/quan-jogger-2.jpg"
    }),
    new Product ({
        id: 3,
        title: 'Quần jogger kaki nam túi hộp New arrival 04',
        price: 105000,
        typeProduct: "Quần jogger",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/quan/quan-jogger-3.jpg"
    }),
    new Product ({
        id: 4,
        title: 'Quần Jogger Nam Nữ Chất Nỉ Cao Cấp',
        price: 59000,
        typeProduct: "Quần jogger",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/quan-jogger-4.jpg"
    })
];  

for(let i = 0; i < quanjogger.length; i++){
    // Save the new model instance, passing a callback
    quanjogger[i].save(function (err,result) {
        done++;
        if(done===quanjogger.length)
          exit();
     });
}
done = 0;


let vay = [
    new Product ({
        id: 1,
        title: 'Chân Váy Tennis',
        price: 59000,
        typeProduct: "Váy",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/vay-1.jpg"
    }),
    
    new Product ({
        id: 2,
        title: 'Chân váy xòe 2 túi sành điệu - màu đen',
        price: 69000,
        typeProduct: "Váy",
        brand: "Mango",
        color: "Đen",
        imagePath: "/img/product/quan/vay-2.jpg"
    }),
    
    new Product ({
        id: 3,
        title: 'Chân váy jeans chữ A',
        price: 91000,
        typeProduct: "Váy",
        brand: "Routine",
        color: "Đen",
        imagePath: "/img/product/quan/vay-3.jpg"
    }),

    new Product ({
        id: 4,
        title: 'Chân Váy Xòe Ren Chân - Đen',
        price: 54000,
        typeProduct: "Váy",
        brand: "Gucci",
        color: "Đen",
        imagePath: "/img/product/quan/vay-4.jpg"
    }),

];  

for(let i = 0; i < vay.length; i++){
    // Save the new model instance, passing a callback
    vay[i].save(function (err,result) {
        done++;
        if(done===vay.length)
          exit();
     });
}
done = 0;

let dam = [
    new Product ({
        id: 1,
        title: 'Đầm Hoa Xinh Dễ Thương Thời Trang Kiểu Hàn Quốc DN015 MayHomes',
        price: 149000,
        typeProduct: "Đầm",
        brand: "Gucci",
        color: "Vàng gold",
        imagePath: "/img/product/quan/dam-1.png"
    }),
    
    new Product ({
        id: 2,
        title: 'Đầm hồng form ngắn thắt eo',
        price: 139000,
        typeProduct: "Đầm",
        brand: "Pull&Bear",
        color: "Hồng mạnh mẽ",
        imagePath: "/img/product/quan/dam-2.jpg"
    }),
    
    new Product ({
        id: 3,
        title: 'Đầm mila xanh form dài thắt eo',
        price: 119000,
        typeProduct: "Đầm",
        brand: "Mango",
        color: "Xanh da trời",
        imagePath: "/img/product/quan/dam-3.jpg"
    }),
   
    new Product ({
        id: 4,
        title: 'Đầm Tay Xếp Ly Kiểu Gumac MS09958',
        price: 220000,
        typeProduct: "Đầm",
        brand: "Gucci",
        color: "Xanh da trời",
        imagePath: "/img/product/quan/dam-4.jpg"
    }),
    
];  


for(let i = 0; i < dam.length; i++){
    // Save the new model instance, passing a callback
    dam[i].save(function (err,result) {
        done++;
        if(done===dam.length)
          exit();
     });
}
done = 0;
//=====================Ao=============================
let aoLen = [
    new Product ({
        id: 1,
        title: 'Áo len thêu hoa',
        price: 150000,
        typeProduct: 'Áo len',
        brand: "Gucci",
        color: "Hồng mạnh mẽ",
        imagePath: '/img/product/ao/ao_len/aolen1.jpeg'
    }),

    new Product ({
        id: 2,
        title: 'Áo len trắng',
        price: 159000,
        typeProduct: 'Áo len',
        brand: "Pull&Bear",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_len/aolen2.jpeg'
    }),

    new Product ({
        id: 3,
        title: 'Áo len đỏ',
        price: 219000,
        typeProduct: 'Áo len',
        brand: "Routine",
        color: "Hồng mạnh mẽ",
        imagePath: '/img/product/ao/ao_len/aolen3.jpeg'
    }),
   
    new Product ({
        id: 4,
        title: 'Áo len dài tay',
        price: 319000,
        typeProduct: 'Áo len',
        brand: "H&M",
        color: "Vàng gold",
        imagePath: '/img/product/ao/ao_len/aolen4.jpeg'
    }),
];  


for(let i = 0; i < aoLen.length; i++){
    // Save the new model instance, passing a callback
    aoLen[i].save(function (err,result) {
        done++;
        if(done===aoLen.length)
          exit();
     });
}
done = 0;


let aoThun = [
    new Product ({
        id: 1,
        title: 'Áo thun Raglan',
        price: 150000,
        typeProduct: 'Áo thun',
        brand: "Mango",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_thun/aothun1.jpeg'
    }),

    new Product ({
        id: 2,
        title: 'Áo thun polo trắng',
        price: 159000,
        brand: "Pull&Bear",
        color: "Trắng",
        typeProduct: 'Áo thun',
        imagePath: '/img/product/ao/ao_thun/aothun2.jpeg'
    }),

    new Product ({
        id: 3,
        title: 'Áo thun xanh trơn',
        price: 219000,
        typeProduct: 'Áo thun',
        brand: "Mango",
        color: "Xanh da trời",
        imagePath: '/img/product/ao/ao_thun/aothun3.jpeg'
    }),
   
    new Product ({
        id: 4,
        title: 'Áo thun vàng trơn',
        price: 319000,
        typeProduct: 'Áo thun',
        brand: "Gucci",
        color: "Vàng gold",
        imagePath: '/img/product/ao/ao_thun/aothun4.jpeg'
    }),
];  


for(let i = 0; i < aoThun.length; i++){
    // Save the new model instance, passing a callback
    aoThun[i].save(function (err,result) {
        done++;
        if(done===aoThun.length)
          exit();
     });
}
done = 0;


let aoLot = [
    new Product ({
        id: 1,
        title: 'Áo lót trắng',
        price: 150000,
        typeProduct: 'Áo lót',
        brand: "Gucci",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_lot/aolot1.jpeg'
    }),

    new Product ({
        id: 2,
        title: 'Áo lót đỏ',
        price: 159000,
        typeProduct: 'Áo lót',
        brand: "Routine",
        color: "Hồng mạnh mẽ",
        imagePath: '/img/product/ao/ao_lot/aolot2.jpeg'
    }),

    new Product ({
        id: 3,
        title: 'Áo lót đen',
        price: 219000,
        typeProduct: 'Áo lót',
        brand: "Routine",
        color: "đen",
        imagePath: '/img/product/ao/ao_lot/aolot3.jpeg'
    }),
   
    new Product ({
        id: 4,
        title: 'Áo lót thêu hoa',
        price: 319000,
        typeProduct: 'Áo lót',
        brand: "Routine",
        color: "Xanh da trời",
        imagePath: '/img/product/ao/ao_lot/aolot4.jpeg'
    }),
];  


for(let i = 0; i < aoLot.length; i++){
    // Save the new model instance, passing a callback
    aoLot[i].save(function (err,result) {
        done++;
        if(done===aoLot.length)
          exit();
     });
}
done = 0;


let aoSoMi = [
    new Product ({
        id: 1,
        title: 'Áo sơ mi nữ',
        price: 150000,
        typeProduct: 'Áo sơ mi',
        brand: "Pull&Bear",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_so_mi/aosomi1.jpeg'
    }),

    new Product ({
        id: 2,
        title: 'Áo sơ mi nam',
        price: 159000,
        typeProduct: 'Áo sơ mi',
        brand: "Gucci",
        color: "Trắng",
        imagePath: '/img/product/ao/ao_so_mi/aosomi2.jpeg'
    }),

    new Product ({
        id: 3,
        title: 'Áo sơ mi cánh dơi',
        price: 219000,
        typeProduct: 'Áo sơ mi',
        brand: "H&M",
        color: "Xanh da trời",
        imagePath: '/img/product/ao/ao_so_mi/aosomi3.jpeg'
    }),
   
    new Product ({
        id: 4,
        title: 'Áo sơ mi tay dài thêu hoa',
        price: 319000,
        brand: "Routine",
        color: "Trắng",
        typeProduct: 'Áo sơ mi',
        imagePath: '/img/product/ao/ao_so_mi/aosomi4.jpeg'
    }),
];  


for(let i = 0; i < aoSoMi.length; i++){
    // Save the new model instance, passing a callback
    aoSoMi[i].save(function (err,result) {
        done++;
        if(done===aoSoMi.length)
          exit();
     });
}
done = 0;

//===================================End area Ao============================

//===================================Giay area==============================
let giaySneaker = [
    new Product ({
        id: 1,
        title: 'Sneaker Passo kem',
        price: 150000,
        typeProduct: 'Sneaker',
        brand: "Pull&Bear",
        color: "Vàng gold",
        imagePath: '/img/product/giay/sneaker/sneaker1.jpeg'
    }),

    new Product ({
        id: 2,
        title: 'Sneaker nam cao cấp',
        price: 159000,
        typeProduct: 'Sneaker',
        brand: "Gucci",
        color: "Trắng",
        imagePath: '/img/product/giay/sneaker/sneaker2.jpeg'
    }),

    new Product ({
        id: 3,
        title: 'Chunky sneaker',
        price: 219000,
        typeProduct: 'Sneaker',
        brand: "H&M",
        color: "Vàng gold",
        imagePath: '/img/product/giay/sneaker/sneaker3.jpeg'
    }),
   
    new Product ({
        id: 4,
        title: 'Sneaker cao cấp đỏ',
        price: 319000,
        typeProduct: 'Sneaker',
        brand: "Gucci",
        color: "Hồng mạnh mẽ",
        imagePath: '/img/product/giay/sneaker/sneaker4.jpeg'
    }),
];  


for(let i = 0; i < giaySneaker.length; i++){
    // Save the new model instance, passing a callback
    giaySneaker[i].save(function (err,result) {
        done++;
        if(done===giaySneaker.length)
          exit();
     });
}
done = 0;

let giayCaoCo = [
    new Product ({
        id: 1,
        title: 'Giày cao cổ đen nam',
        price: 150000,
        typeProduct: 'Giày cao cổ',
        brand: "H&M",
        color: "Đen",
        imagePath: '/img/product/giay/cao_co/caoco1.jpeg'
    }),

    new Product ({
        id: 2,
        title: 'Giày cao cổ trắng',
        price: 159000,
        typeProduct: 'Giày cao cổ',
        brand: "H&M",
        color: "Trắng",
        imagePath: '/img/product/giay/cao_co/caoco2.jpeg'
    }),

    new Product ({
        id: 3,
        title: 'Giày cao cổ vanz',
        price: 219000,
        typeProduct: 'Giày cao cổ',
        brand: "Mango",
        color: "Đen",
        imagePath: '/img/product/giay/cao_co/caoco3.jpeg'
    }),
   
    new Product ({
        id: 4,
        title: 'Giày cao cổ da độn',
        price: 319000,
        typeProduct: 'Giày cao cổ',
        brand: "Mango",
        color: "Vàng gold",
        imagePath: '/img/product/giay/cao_co/caoco4.jpeg'
    }),
];  


for(let i = 0; i < giayCaoCo.length; i++){
    // Save the new model instance, passing a callback
    giayCaoCo[i].save(function (err,result) {
        done++;
        if(done===giayCaoCo.length)
          exit();
     });
}
done = 0;

let giayCaoGot = [
    new Product ({
        id: 1,
        title: 'Giày cao gót đen',
        price: 150000,
        typeProduct: 'Giày cao gót',
        brand: "H&M",
        color: "Đen",
        imagePath: '/img/product/giay/cao_got/caogot1.jpeg'
    }),

    new Product ({
        id: 2,
        title: 'Giày cao cổ trơn mũi nhọn',
        price: 159000,
        typeProduct: 'Giày cao gót',
        brand: "Pull&Bear",
        color: "Đen",
        imagePath: '/img/product/giay/cao_got/caogot2.jpeg'
    }),

    new Product ({
        id: 3,
        title: 'Giày cao gót sandal',
        price: 219000,
        typeProduct: 'Giày cao gót',
        brand: "Routine",
        color: "Trắng",
        imagePath: '/img/product/giay/cao_got/caogot3.jpeg'
    }),
   
    new Product ({
        id: 4,
        title: 'Giày cao gót crazy',
        price: 319000,
        typeProduct: 'Giày cao gót',
        brand: "Mango",
        color: "Hồng mạnh mẽ",
        imagePath: '/img/product/giay/cao_got/caogot4.jpeg'
    }),
];      


for(let i = 0; i < giayCaoGot.length; i++){
    // Save the new model instance, passing a callback
    giayCaoGot[i].save(function (err,result) {
        done++;
        if(done===giayCaoGot.length)
          exit();
     });
}
done = 0;

//=============================End giay area============================

function exit()
{
    mongoose.disconnect(); // saved!
}

