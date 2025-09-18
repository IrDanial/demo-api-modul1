import { supabase } from "../config/supabaseClient.js"; 
 
export const MedicationModel = { 
  async getAll(page = null, limit = null) { 
  
    if (page === null || limit === null) {
      const { data, error } = await supabase 
        .from("medications") 
        .select( 
          "id, sku, name, description, price, quantity, category_id, supplier_id" 
        )
        .order('id');
      if (error) throw error;
      return data;
    }

    
    const offset = (page - 1) * limit;

    
    const { count, error: countError } = await supabase
      .from("medications")
      .select("*", { count: 'exact', head: true });
    
    if (countError) throw countError;

    
    const { data, error } = await supabase 
      .from("medications") 
      .select( 
        "id, sku, name, description, price, quantity, category_id, supplier_id" 
      )
      .range(offset, offset + limit - 1)
      .order('id');

    if (error) throw error; 

    const totalPages = Math.ceil(count / limit);

    return {
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages
      }
    };
  }, 

  async searchByName(name) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id"
      )
      .ilike('name', `%${name}%`)
      .order('id');

    if (error) throw error;
    return data;
  },
 
  async getById(id) { 
    const { data, error } = await supabase 
      .from("medications") 
      .select( 
        ` 
        id, sku, name, description, price, quantity, 
        categories ( id, name ), 
        suppliers ( id, name, email, phone ) 
      ` 
      ) 
      .eq("id", id) 
      .single(); 
    if (error) throw error; 
    return data; 
  }, 
 
  async create(payload) { 
    const { data, error } = await supabase 
      .from("medications") 
      .insert([payload]) 
      .select(); 
    if (error) throw error; 
    return data[0]; 
  }, 
 
  async update(id, payload) { 
    const { data, error } = await supabase 
      .from("medications") 
      .update(payload) 
      .eq("id", id) 
      .select(); 
    if (error) throw error; 
    return data[0]; 
  }, 
 
  async remove(id) { 
    const { error } = await supabase.from("medications").delete().eq("id", id); 
    if (error) throw error; 
    return { success: true }; 
  }, 

  async getTotalCount() {
    const { count, error } = await supabase
      .from("medications")
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count;
  },
};