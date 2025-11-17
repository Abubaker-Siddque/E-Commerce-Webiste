const productGrid = document.getElementById("productGrid");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const categoryCards = document.querySelectorAll(".category-card");
let currentSlide = 0;
const perPage = 9;
const defaultProducts = [
    {img:"https://m.media-amazon.com/images/I/71W3sbCbttL._AC_SL1500_.jpg", name:"Wireless Earbuds Bluetooth 5.3 Headphones 40Hrs", price:"$29", category:"EarBuds"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGoz1bExe_c6yz0Xub_QyaRv2OFu0YSMtL-g&s", name:"HyperX Cloud Stinger 2 Core Gaming Headset", price:"$49", category:"Headphones"},
    {img:"https://www.sony-asia.com/image/313a76e600244e9a22ca07a90437e673?fmt=png-alpha&wid=720", name:"Sony INZONE H3 MDR-G300 Wired Gaming Headset", price:"$19", category:"Headphones"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZIdMMSzv4frs3r0MLzUYoTxhCvqCDKOp7kQ&s", name:"JBL Tune 510BT Wireless On-Ear Headphones", price:"$39", category:"Headphones"},
    {img:"https://discountstore.pk/cdn/shop/files/1752074053_IMG_2527737.webp?v=1754982464", name:"Logitech G305 Lightspeed Wireless Gaming Mouse", price:"$25", category:"Mouse"},
    {img:"https://m.media-amazon.com/images/I/71+p3Hx03dL._AC_SL1500_.jpg", name:"Wired Gaming Keyboard, RGB Backlit, Waterproof, Mechanical Feel, for Gamers", price:"$55", category:"Keyboard"},
    {img:"https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg", name:"Amazfit Bip 3 Smartwatch 14-Day Battery", price:"$75", category:"Laptops"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiDHJyqT5zjB-wQ1gyoCeopkmCc8g4aAlJPw&s", name:"Samsung 15W Fast Charging USB-C Adapter", price:"$18", category:"charger"},
    {img:"https://m.media-amazon.com/images/I/611XqKZsLML._AC_SL1500_.jpg", name:"Baseus Power Bank 20000mAh Fast Charge", price:"$22", category:"charger"},
    {img:"https://alhamdtech.pk/cdn/shop/files/razer-blackshark-v2-x-wired-gaming-headset-818578.jpg?v=1722252695", name:"Razer BlackShark V2 X Gaming Headset", price:"$80", category:"Headphones"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ8Xp54PfOuLodYExQMNPDYFzr4oUn7_D3ZQ&s", name:"TP-Link Archer C6 MU-MIMO WiFi Router", price:"$45", category:"Other Accessories"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXso1L2wdkayiiBmfa81rCi05a-ZhqI3O91g&s", name:"Redgear Pro Series Wireless Gamepad", price:"$33", category:"Other Accessories"},
    {img:"https://m.media-amazon.com/images/I/61WdT+si7LL._AC_UF1000,1000_QL80_.jpg", name:"Logitech K480 Multi-Device Bluetooth Keyboard", price:"$12", category:"Keyboard"},
    {img:"https://asset.msi.com/resize/image/global/product/product_1607322183b9402419793d7dc6d2ee8e58bba77938.png62405b38c58fe0f07fcef2367d8a9ba1/600.png", name:"MSI G241 24” IPS Gaming Monitor 144Hz", price:"$99", category:"Monitors"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-hgYEIhCbh71tzLQj4NGmk0ohsXYltUQHNA&s", name:"Anker Soundcore Mini Bluetooth Speaker", price:"$65", category:"speaker"},
    {img:"https://hyte.com/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-k28u1tc9ki%2Fproduct_images%2Fattribute_rule_images%2F54_source_1672927218.jpg&w=3840&q=75", name:"ATX-Case", price:"$450", category:"Other Accessories"},
    {img:"https://www.lightsupplier.co.uk/cdn/shop/files/RGBStripKit.gif?v=1717160968g", name:"Led Lights for Room RGB 5050 Led Strip with Remote Control ", price:"$49", category:"Other Accessories"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSenJngkwYuT3y80_E28noFPiGkbwdW0YMgUw&s", name:"Xiaomi Mi Portable Bluetooth Speaker", price:"$20", category:"speaker"}
];
let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
let products = [...defaultProducts, ...storedProducts];
let filteredProducts = [...products];
function renderProducts() {
    const start = currentSlide * perPage;
    const end = start + perPage;
    const pageItems = filteredProducts.slice(start, end);
    productGrid.style.opacity = 0;
    setTimeout(() => {
        productGrid.innerHTML = pageItems.map((p) => `
            <div class="product-card">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">${p.price}</p>
                ${localStorage.getItem("isAdmin") === "true" ? `<button class="deleteBtn" data-index="${products.indexOf(p)}">Delete</button>` : ""}
            </div>`).join("");
        document.querySelectorAll(".deleteBtn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const prodIndex = e.target.getAttribute("data-index");
                deleteProduct(prodIndex);
            });});
        productGrid.style.opacity = 1;
    }, 100);}
nextBtn.addEventListener('click', () => {
    const maxSlide = Math.ceil(filteredProducts.length / perPage) - 1;
    if(currentSlide < maxSlide){
        currentSlide++;
        renderProducts();
    }});
prevBtn.addEventListener('click', () => {
    if(currentSlide > 0){
        currentSlide--;
        renderProducts();
}});
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.textContent.trim();
        currentSlide = 0;

        if(category === "All Products"){
            filteredProducts = [...products];
        } 
        else {
            filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        renderProducts();
    });});
renderProducts();
const adminBtn = document.getElementById("adminBtn");
const adminLogin = document.getElementById("adminLogin");
const heroSection = document.querySelector(".hero");
const productsSection = document.querySelector(".products");
const adminPanel = document.getElementById("adminPanel");
adminBtn.addEventListener("click", () => {
    heroSection.style.display = "none";
    productsSection.style.display = "none";
    adminLogin.style.display = "block";
});
const adminCredentials = { username: "admin", password: "12345" };
document.getElementById("adminLoginBtn").addEventListener("click", () => {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;
    if(username === adminCredentials.username && password === adminCredentials.password){
        localStorage.setItem("isAdmin", "true");
        showAdminPanel();
    } 
    else {
        alert("Invalid username or password!");
        window.location.reload();
    }
});
function showAdminPanel() {
    adminLogin.style.display = "none";
    adminPanel.style.display = "block";
}
const addProductBtn = document.getElementById("addProductBtn");
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productImageInput = document.getElementById("productImage");
const productCategoryInput = document.getElementById("productCategory");
const refreshBtn = document.getElementById("refreshbtn");
addProductBtn.addEventListener("click", () => {
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const img = productImageInput.value.trim();
    const category = productCategoryInput.value;
    if(!name || !price || !img){
        alert("Please fill all fields!");
        refreshBtn.style.display = "none"
        return;
    } 
    else {
        refreshBtn.style.display = "block";
    }
    const newProduct = { name, price, img, category };
    let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(storedProducts));
    products.push(newProduct);
    filteredProducts.push(newProduct);
    renderProducts();
    productNameInput.value = "";
    productPriceInput.value = "";
    productImageInput.value = "";
    alert("Product added successfully!");
});
function deleteProduct(index) {
    index = parseInt(index);
    products.splice(index, 1);
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const newStored = storedProducts.filter(p => p.name !== products[index]?.name);
    localStorage.setItem("products", JSON.stringify(newStored));
    filteredProducts = [...products];
    renderProducts();
    alert("Product deleted successfully!");
}
