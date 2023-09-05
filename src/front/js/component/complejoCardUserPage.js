import { Button } from "primereact/button";
import { MdLocationOn } from "react-icons/md";
import { Rating } from "primereact/rating";
import { DataScroller } from "primereact/datascroller";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Context } from "../store/appContext"; 

// export const SportCenterUser = () => {
//   const { store, actions } = useContext(Context);
//   console.log("store", store.allSportCenter);
//   const [products, setProducts] = useState([]);
//   const ds = useRef(null);
//   useEffect(() => {
//         setProducts(store.allSportCenter);
//       }, []);

//   function primeraLetraMayuscula(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   }
//   return (
//     <div className=" bg-black-alpha-10 w-100">
//       <div className="container py-8">
//         <h3 className="text-700 text-center mb-5">Sport Centers</h3>
//         <div className="grid">
//           {map((data, index) => {
//               return (
//                 <div className="col-12 lg:col-6 xl:col-4" key={index}>
//                   <div className="card mb-0 border-0 cardAPPS">
//                     <span className="cardImagenAdorno position-relative">
//                       <div
//                         className="card-img-top  d-flex flex-column justify-content-end p-2 align-items-start"
//                         src={data.url_img}
//                         style={{
//                           height: "200px",
//                           backgroundSize: "cover",
//                         }}
//                       >
//                         <h1 className=" position-relative"> {data.name}</h1>
//                       </div>
//                     </span>
//                     <div className="card-body ">
//                       <div className="flex justify-content-between mb-3">
//                         <div>
//                           <div className="text-700 font-medium text-xl ">
//                             {/* <Rating
//                               value={numAleatorio}
//                               readOnly
//                               cancel={false}
//                               style={{ color: "#ffc107" }}
//                             ></Rating> */}
//                             <MdLocationOn className="text-green-400" />
//                             {primeraLetraMayuscula(data.address)}
//                           </div>
//                         </div>

//                         <div
//                           className="flex align-items-center justify-content-center bg-blue-100 border-round"
//                           style={{ width: "2.5rem", height: "2.5rem" }}
//                         >
//                           <i className="pi pi-shopping-cart text-blue-500 text-xl" />
//                         </div>
//                       </div>
//                       <div>
//                         {/* <div className="text-600   font-weight-light text-xl d-flex flex-wrap">
//                           {data.sport.map((sport, index) => {
//                             return (
//                               <span className="px-1" key={index}>
//                                 {index !== 0 && "| "}
//                                 {primeraLetraMayuscula(sport)}
//                               </span>
//                             );
//                           })}
//                         </div> */}
//                       </div>
//                     </div>
//                     <div className="card-footer bg-transparent border-0">
//                     <Link to="/court">
//                 <Button
//                  icon="pi pi-shopping-cart"
//                  label="Book"
//                 severity="info"
//                 raised
//                 rounded
//                 style={{ width: "75%" }}
//                  ><span className="p-ml-2"></span></Button>
//                 </Link>
//                     </div>
//                   </div>
//                 </div>
//               );
//             }
//           )}
//         </div>
//       </div>
//       {/* <Button
//         label="All Sport Centers"
//         severity="info"
//         // text
//         raised
//         rounded
//         style={{ width: "75%" }}
//       /> */}
//     </div>
//   );
// };












































//////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function SportCenterUser() {
  const { store, actions } = useContext(Context);
  console.log("store", store.allSportCenter);
  const [products, setProducts] = useState([]);
  const ds = useRef(null);

  useEffect(() => {
    const data = [
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
    ];
    setProducts(store.allSportCenter);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const itemTemplate = (data) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={data.url_img}
            alt={data.name}
          />
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
                <div className="text-2xl font-bold text-900">{data.name}</div>
                <div className="text-700">{data.address}</div>
              </div>
              <div className="flex flex-column gap-2">
                {/* <Rating value={data.rating} readOnly cancel={false}></Rating> */}
                <span className="flex align-items-center gap-2">
                  {/* <i className="pi pi-tag product-category-icon"></i> */}
                  {/* <span className="font-semibold">{data.category}</span> */}
                </span>
              </div>
            </div>
            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
              <span className="text-2xl font-semibold FaWhatsapp">{data.phone_number}</span>
              {/* <Button
                icon="pi pi-shopping-cart"
                label="Add to Cart"
                disabled={data.inventoryStatus === "OUTOFSTOCK"}
              ></Button>
              <Tag
              <span className="text-2xl font-semibold">{data.phone_number}</span>
              <Link to="/court">
               <Button
                // icon="pi pi-shopping-cart"
                // label="Book"
                ><span className="p-ml-2">Book</span></Button>
               </Link>
              {/* <Tag
                value={data.inventoryStatus}
                severity={getSeverity(data)}
              ></Tag>  */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const footer = (
  //   <Button
  //     type="text"
  //     onClick={() => ds.current.load()}
  //   ><FaAccessibleIcon/></Button>
  // );

  return (
    <div className="card">
      <DataScroller
        ref={ds}
        value={products}
        itemTemplate={itemTemplate}
        rows={5}
        loader
        // footer={footer}
        // header="Click Load Button at Footer to Load More"
      />
    </div>
  );
}