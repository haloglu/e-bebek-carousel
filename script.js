const ebInitCarousel = async () => {
  if (!window.location.href.includes("e-bebek.com")) {
    console.log(
      "Yanlış sayfadasınız. Bu kod yalnızca e-bebek ana sayfasında çalışır."
    );
    return;
  }

  const localData = localStorage.getItem("ebProducts");
  let data = [];

  if (localData) {
    data = JSON.parse(localData);
  } else {
    const response = await fetch(
      "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
    );
    data = await response.json();
    localStorage.setItem("ebProducts", JSON.stringify(data));
  }

  const favoriteIds = JSON.parse(localStorage.getItem("ebFavorites") || "[]");

  const heroBanner = document.querySelector(".hero.banner");
  if (!heroBanner) return;

  const ebWrapper = Object.assign(document.createElement("div"), {
    className: "eb-custom-wrapper",
  });
  Object.assign(ebWrapper.style, {
    padding: "32px 0",
    marginTop: "32px",
  });

  const ebSliderWrapper = Object.assign(document.createElement("div"), {
    className: "slider-wrapper",
  });

  Object.assign(ebSliderWrapper.style, {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "1320px",
    margin: "0 auto",
    position: "relative",
    backgroundColor: "#fff",
    boxShadow: "15px 15px 30px 0 #ebebeb80",
    borderBottomLeftRadius: "35px",
    borderBottomRightRadius: "35px",
    paddingBottom: "32px",
  });

  const ebTitleBox = Object.assign(document.createElement("div"), {
    className: "banner__titles",
  });

  Object.assign(ebTitleBox.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fef6eb",
    padding: "25px 67px",
    borderTopLeftRadius: "35px",
    borderTopRightRadius: "35px",
    fontFamily: "Quicksand-Bold",
    fontWeight: "700",
  });

  const ebCarouselTitle = Object.assign(document.createElement("h2"), {
    className: "custom-carousel-title",
    textContent: "Beğenebileceğinizi düşündüklerimiz",
  });

  Object.assign(ebCarouselTitle.style, {
    fontFamily: "Quicksand-Bold",
    fontSize: "3rem",
    color: "#f28e00",
    fontWeight: "700",
    textAlign: "left",
    lineHeight: "1.11",
    margin: 0,
  });

  ebTitleBox.appendChild(ebCarouselTitle);

  const ebCarouselContainer = Object.assign(document.createElement("div"), {
    className: "product-carousel",
  });

  Object.assign(ebCarouselContainer.style, {
    display: "flex",
    gap: "12px",
    overflowX: "hidden",
    padding: "8px",
    scrollBehavior: "smooth",
    cursor: "grab",
  });

  const dragStyle = Object.assign(document.createElement("style"), {
    innerHTML: `
      .product-carousel.dragging {
        cursor: grabbing !important;
        user-select: none;
      }
    `,
  });
  document.head.appendChild(dragStyle);

  let isDragging = false;
  let startX;
  let scrollLeft;

  ebCarouselContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - ebCarouselContainer.offsetLeft;
    scrollLeft = ebCarouselContainer.scrollLeft;
    ebCarouselContainer.classList.add("dragging");
  });

  ["mouseleave", "mouseup"].forEach((type) => {
    ebCarouselContainer.addEventListener(type, () => {
      isDragging = false;
      ebCarouselContainer.classList.remove("dragging");
    });
  });

  ebCarouselContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - ebCarouselContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    ebCarouselContainer.scrollLeft = scrollLeft - walk;
  });

  const ebNextBtn = Object.assign(document.createElement("button"), {
    className: "swiper-next",
  });
  Object.assign(ebNextBtn.style, {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    bottom: "50%",
    right: "-65px",
    background: "#fef6eb url(/assets/svg/next.svg) no-repeat center center",
    backgroundSize: "18px 18px",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });
  ebNextBtn.addEventListener("mouseenter", () => {
    ebNextBtn.style.backgroundColor = "#fff";
    ebNextBtn.style.borderColor = "#f28e00";
  });
  ebNextBtn.addEventListener("mouseleave", () => {
    ebNextBtn.style.backgroundColor = "#fef6eb";
    ebNextBtn.style.borderColor = "transparent";
  });

  const ebPrevBtn = Object.assign(document.createElement("button"), {
    className: "swiper-prev",
  });
  Object.assign(ebPrevBtn.style, {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    bottom: "50%",
    left: "-65px",
    background: "#fef6eb url(/assets/svg/prev.svg) no-repeat center center",
    backgroundSize: "18px 18px",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });
  ebPrevBtn.addEventListener("mouseenter", () => {
    ebPrevBtn.style.backgroundColor = "#fff";
    ebPrevBtn.style.borderColor = "#f28e00";
  });
  ebPrevBtn.addEventListener("mouseleave", () => {
    ebPrevBtn.style.backgroundColor = "#fef6eb";
    ebPrevBtn.style.borderColor = "transparent";
  });

  ebNextBtn.addEventListener("click", () => {
    ebCarouselContainer.scrollLeft += ebCarouselContainer.offsetWidth;
  });

  ebPrevBtn.addEventListener("click", () => {
    ebCarouselContainer.scrollLeft -= ebCarouselContainer.offsetWidth;
  });

  const sliderControls = Object.assign(document.createElement("div"), {
    className: "slider-controls",
  });

  Object.assign(sliderControls.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  });

  sliderControls.append(ebPrevBtn, ebCarouselContainer, ebNextBtn);
  ebSliderWrapper.append(ebTitleBox, sliderControls);
  ebWrapper.append(ebSliderWrapper);
  heroBanner.insertAdjacentElement("afterend", ebWrapper);

  data.forEach((product) => {
    const card = ebCreateProductCard(product, favoriteIds);
    ebCarouselContainer.appendChild(card);
  });

  const updateCardWidths = () => {
    const cards = document.querySelectorAll(".product-cart");
    let cardCount = 5;

    if (window.innerWidth <= 480) {
      cardCount = 1;
    } else if (window.innerWidth <= 768) {
      cardCount = 2;
    } else if (window.innerWidth <= 1024) {
      cardCount = 3;
    } else if (window.innerWidth <= 1280) {
      cardCount = 4;
    }

    const gap = 12;
    const totalGap = (cardCount - 1) * gap;
    const containerWidth = ebCarouselContainer.offsetWidth;
    const cardWidth = (containerWidth - totalGap) / cardCount;

    cards.forEach((card) => {
      card.style.flex = `0 0 ${cardWidth}px`;
    });
  };

  window.addEventListener("resize", updateCardWidths);
  updateCardWidths();
};

const ebCreateProductCard = (product, favoriteIds) => {
  const el = Object.assign(document.createElement("div"), {
    className: "product-cart",
  });

  Object.assign(el.style, {
    flex: "0 0 calc((100% - 48px) / 5)",
    boxSizing: "border-box",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "12px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "8px",
    minHeight: "420px",
    position: "relative",
    transition: "border-color 0.3s ease",
  });

  el.addEventListener("mouseenter", () => {
    el.style.border = "1px solid #ff6600";
    el.style.cursor = "pointer";
  });
  el.addEventListener("mouseleave", () => {
    el.style.border = "1px solid #eee";
  });

  const favoriteProducts = JSON.parse(
    localStorage.getItem("ebFavorites") || "[]"
  );
  let isLiked = favoriteProducts.some((item) => item.id === product.id);

  const addToLikes = Object.assign(document.createElement("div"), {
    className: "fav-icon",
    innerHTML: `
      <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke="#ff6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"
          fill="none"
          class="heart-path"
          style="transition: fill 0.3s ease;" />
      </svg>`,
  });

  Object.assign(addToLikes.style, {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: "3",
  });

  const path = addToLikes.querySelector(".heart-path");
  path.setAttribute("fill", isLiked ? "#ff6600" : "none");

  addToLikes.addEventListener("click", (e) => {
    e.stopPropagation();
    isLiked = !isLiked;
    path.setAttribute("fill", isLiked ? "#ff6600" : "none");

    let stored = JSON.parse(localStorage.getItem("ebFavorites") || "[]");

    if (isLiked) {
      const alreadyExists = stored.find((item) => item.id === product.id);
      if (!alreadyExists) {
        stored.push({
          id: product.id,
          name: product.name,
          img: product.img,
          url: product.url,
        });
      }
    } else {
      stored = stored.filter((item) => item.id !== product.id);
    }

    localStorage.setItem("ebFavorites", JSON.stringify(stored));
  });

  addToLikes.addEventListener("mouseenter", () => {
    if (!isLiked) {
      path.setAttribute("fill", "#ff6600");
    }
  });

  addToLikes.addEventListener("mouseleave", () => {
    if (!isLiked) {
      path.setAttribute("fill", "none");
    }
  });

  const img = Object.assign(document.createElement("img"), {
    src: product.img,
  });
  Object.assign(img.style, {
    display: "inline-block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "203px",
    objectFit: "contain",
    transform: "scale(1)",
    opacity: 1,
    transition: "all .6s",
  });

  const productName = Object.assign(document.createElement("h3"), {
    textContent: product.name || product.short_name,
  });
  Object.assign(productName.style, {
    fontFamily: '"Poppins", cursive',
    fontSize: "11.52px",
    color: "#7d7d7d",
    textAlign: "left",
    minHeight: "44px",
    overflow: "hidden",
  });

  const priceWrapper = Object.assign(document.createElement("div"), {
    className: "price-wrapper",
  });
  Object.assign(priceWrapper.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
  });

  const price = Object.assign(document.createElement("span"), {
    className: "price",
  });
  Object.assign(price.style, {
    fontFamily: '"Poppins", cursive',
    color: "#7d7d7d",
    fontWeight: "600",
    fontSize: "21.12px",
  });

  const originalPriceLine = Object.assign(document.createElement("div"), {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "6px",
    },
  });

  const originalPrice = Object.assign(document.createElement("span"), {
    className: "original-price",
  });
  Object.assign(originalPrice.style, {
    fontFamily: '"Poppins", cursive',
    textDecoration: "line-through",
    color: "#7d7d7d",
    fontSize: "1.4rem",
    fontWeight: "500",
  });

  const discount = Object.assign(document.createElement("span"), {
    className: "discount",
  });
  Object.assign(discount.style, {
    fontFamily: '"Poppins", cursive',
    color: "#00a365",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "1",
  });

  const priceNum = parseFloat(product.price);
  const originalNum = parseFloat(product.original_price);
  const hasDiscount = originalNum > priceNum;

  price.textContent = `${priceNum.toFixed(2)}₺`;

  if (hasDiscount) {
    originalPrice.textContent = `${originalNum.toFixed(2)}₺`;
    const discountRate = Math.round(
      ((originalNum - priceNum) / originalNum) * 100
    );

    const iconSVG = Object.assign(document.createElement("i"), {
      className: "icon icon-decrease",
    });

    Object.assign(iconSVG.style, {
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: "4px",
      fontSize: "22px",
      lineHeight: "1",
      height: "1em",
      overflow: "hidden",
      paddingTop: "4px",
    });

    discount.textContent = ` -%${discountRate}`;
    discount.appendChild(iconSVG);

    price.style.color = "#00a365";
    price.style.fontSize = "2.2rem";
    price.style.fontWeight = "600";
  } else {
    originalPrice.style.display = "none";
    discount.style.display = "none";
  }

  const addToCard = Object.assign(document.createElement("button"), {
    className: "add-to-card",
    textContent: "Sepete Ekle",
  });
  Object.assign(addToCard.style, {
    fontFamily: '"Poppins", cursive',
    width: "100%",
    padding: "15px 20px",
    borderRadius: "37.5px",
    backgroundColor: "#fff7ec",
    color: "#f28e00",
    fontFamily: "Poppins, cursive",
    fontSize: "1.4rem",
    fontWeight: "700",
    marginTop: "25px",
    position: "relative",
    zIndex: "2",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  addToCard.addEventListener("mouseenter", () => {
    addToCard.style.backgroundColor = "#f28e00";
    addToCard.style.color = "#fff";
  });
  addToCard.addEventListener("mouseleave", () => {
    addToCard.style.backgroundColor = "#fff7ec";
    addToCard.style.color = "#f28e00";
  });

  originalPriceLine.append(originalPrice, discount);
  priceWrapper.append(originalPriceLine, price);
  el.append(addToLikes, img, productName, priceWrapper, addToCard);
  el.onclick = () => window.open(product.url, "_blank");
  return el;
};

ebInitCarousel();
