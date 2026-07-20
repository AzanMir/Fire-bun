import { supabase } from "@/lib/supabase";
import { generateReceiptNumber } from "@/lib/utils";

export async function getOrders({ status, search, page = 1, limit = 20 } = {}) {
  let query = supabase
    .from("orders")
    .select("*, order_items(id,name,price,quantity,subtotal)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (status && status !== "All") query = query.eq("status", status);
  if (search) {
    query = query.or(`customer_name.ilike.%${search}%,receipt_number.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, count };
}

export async function getOrder(id) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(id,name,price,quantity,subtotal,menu_item_id)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createOrder({ customerName, phone, paymentMethod, items, subtotal, discount, tax, total, notes, servedBy }) {
  const receiptNumber = generateReceiptNumber();

  const { data: order, error: oErr } = await supabase
    .from("orders")
    .insert({
      receipt_number: receiptNumber,
      customer_name: customerName || "Walk-in",
      phone: phone || "",
      payment_method: paymentMethod,
      subtotal,
      discount,
      tax,
      total,
      notes: notes || "",
      served_by: servedBy || null,
      status: "Pending",
    })
    .select()
    .single();

  if (oErr) throw oErr;

  const orderItems = items.map((i) => ({
    order_id: order.id,
    menu_item_id: i.id,
    name: i.name,
    price: i.price,
    quantity: i.quantity,
    subtotal: i.price * i.quantity,
  }));

  const { error: iErr } = await supabase.from("order_items").insert(orderItems);
  if (iErr) throw iErr;

  return order;
}

export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;

  // Auto deduct inventory and record sale on completion
  if (status === "Completed") {
    await supabase.rpc("deduct_inventory_for_order", { p_order_id: id });
    await supabase.rpc("record_sale_for_order", { p_order_id: id });
  }

  return data;
}

export async function deleteOrder(id) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}

export async function getTodayStats() {
  const { data, error } = await supabase.rpc("get_dashboard_stats");
  if (error) throw error;
  return data;
}
