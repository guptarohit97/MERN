import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (data) => set({ products: data }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all fields" };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        return { success: false, message: "Invalid server response" };
      }
      if (res.ok) {
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
      } else {
        return {
          success: false,
          message: data.message || "Failed to create product",
        };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: "Network error" };
    }
  },
  fetchProducts:async()=>{
    const res=await fetch("api/products");
    const data=await res.json();
    set({products:data.data})
  },
  deleteProduct:async(id)=>{
    try{
      const res=await fetch(`/api/products/${id}`,{
        method:"DELETE"
      })
      const data=await res.json();
      if(res.ok){
        set((state)=>({
          products:state.products.filter((product)=>product._id!==id),
        }));
        return {success:true,message:data.message ||"Product deleted"}
      }else{
        return {success:false,message:data.message ||"Failed to delete"}
      }
    } catch(error){
      console.log(error)
      return {success:false,message:"Network error"}
    }
  },
  updateProduct: async (id, updatedProduct) => {
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
      return { success: false, message: "Please fill all fields" };
    }
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    if (res.ok) {
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? data.data : p)),
      }));
      return { success: true, message: "Product updated successfully" };
    } else {
      return { success: false, message: data.message || "Failed to update product" };
    }
  },
}));
